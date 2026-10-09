import { defineStore } from 'pinia';
import {
  goalsApi,
  nutritionistProfilesApi,
  preferencesApi,
  restrictionsApi,
  userProfilesApi,
} from '../infrastructure/user-profile.api.js';

async function firstFor(api, field, value) {
  const { data } = await api.findBy(field, value);
  return data[0] ?? null;
}

export const useUserProfileStore = defineStore('user-profile-management', {
  state: () => ({
    patientProfile: null,
    goals: [],
    preferences: [],
    restrictions: [],
    nutritionistProfile: null,
    loading: false,
    saving: false,
    error: null,
  }),
  actions: {
    async loadPatient(userId) {
      this.loading = true;
      this.error = null;
      this.patientProfile = null;
      this.goals = [];
      this.preferences = [];
      this.restrictions = [];
      try {
        const patientProfile = await firstFor(userProfilesApi, 'user_id', userId);
        this.patientProfile = patientProfile;
        if (!patientProfile) {
          this.goals = [];
          this.preferences = [];
          this.restrictions = [];
          return;
        }
        const [goals, preferences, restrictions] = await Promise.all([
          goalsApi.findBy('user_profile_id', patientProfile.id),
          preferencesApi.findBy('user_id', userId),
          restrictionsApi.findBy('user_id', userId),
        ]);
        this.goals = goals.data;
        this.preferences = preferences.data;
        this.restrictions = restrictions.data;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async savePatientProfile(userId, values) {
      this.saving = true;
      this.error = null;
      try {
        const payload = { ...values, user_id: userId };
        const response = this.patientProfile
          ? await userProfilesApi.update(this.patientProfile.id, { ...this.patientProfile, ...payload })
          : await userProfilesApi.create(payload);
        this.patientProfile = response.data;
        return response.data;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.saving = false;
      }
    },
    async saveGoal(values) {
      const payload = { ...values, user_profile_id: this.patientProfile.id };
      const response = values.id
        ? await goalsApi.update(values.id, payload)
        : await goalsApi.create(payload);
      this.upsert('goals', response.data);
      return response.data;
    },
    async removeGoal(id) {
      await goalsApi.delete(id);
      this.goals = this.goals.filter((item) => item.id !== id);
    },
    async savePreference(userId, values) {
      const payload = { ...values, user_id: userId };
      const response = values.id
        ? await preferencesApi.update(values.id, payload)
        : await preferencesApi.create(payload);
      this.upsert('preferences', response.data);
      return response.data;
    },
    async removePreference(id) {
      await preferencesApi.delete(id);
      this.preferences = this.preferences.filter((item) => item.id !== id);
    },
    async saveRestriction(userId, values) {
      const payload = { ...values, user_id: userId };
      const response = values.id
        ? await restrictionsApi.update(values.id, payload)
        : await restrictionsApi.create(payload);
      this.upsert('restrictions', response.data);
      return response.data;
    },
    async removeRestriction(id) {
      await restrictionsApi.delete(id);
      this.restrictions = this.restrictions.filter((item) => item.id !== id);
    },
    async loadNutritionist(userId) {
      this.loading = true;
      this.error = null;
      this.nutritionistProfile = null;
      try {
        this.nutritionistProfile = await firstFor(nutritionistProfilesApi, 'user_id', userId);
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async saveNutritionist(userId, values) {
      this.saving = true;
      this.error = null;
      try {
        const payload = { ...values, user_id: userId };
        const response = this.nutritionistProfile
          ? await nutritionistProfilesApi.update(this.nutritionistProfile.id, { ...this.nutritionistProfile, ...payload })
          : await nutritionistProfilesApi.create(payload);
        this.nutritionistProfile = response.data;
        return response.data;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.saving = false;
      }
    },
    upsert(collection, value) {
      const index = this[collection].findIndex((item) => item.id === value.id);
      if (index === -1) this[collection].push(value);
      else this[collection].splice(index, 1, value);
    },
    reset() {
      this.patientProfile = null;
      this.goals = [];
      this.preferences = [];
      this.restrictions = [];
      this.nutritionistProfile = null;
      this.error = null;
    },
  },
});
