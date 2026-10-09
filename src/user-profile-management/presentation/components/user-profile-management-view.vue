<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCurrentUserStore } from '@/shared/application/current-user.store.js';
import { useUserProfileStore } from '../../application/user-profile.store.js';
import {
  validateGoal,
  validateNutritionistProfile,
  validatePatientProfile,
  validatePreference,
  validateRestriction,
} from '../../domain/user-profile.validation.js';

const props = defineProps({
  role: { type: String, required: true, validator: (value) => ['patient', 'nutritionist'].includes(value) },
});

const { t } = useI18n();
const currentUserStore = useCurrentUserStore();
const profileStore = useUserProfileStore();
const userId = computed(() => currentUserStore.user?.id);
const activeSection = ref('personal');
const notice = ref('');
const formError = ref('');

const patientForm = reactive(emptyPatientProfile());
const goalForm = reactive(emptyGoal());
const preferenceForm = reactive(emptyPreference());
const restrictionForm = reactive(emptyRestriction());
const nutritionistForm = reactive(emptyNutritionistProfile());

const sections = computed(() => props.role === 'patient'
  ? [
      { id: 'personal', label: t('profile.sections.personal'), icon: 'pi pi-user' },
      { id: 'goals', label: t('profile.sections.goals'), icon: 'pi pi-flag' },
      { id: 'preferences', label: t('profile.sections.preferences'), icon: 'pi pi-heart' },
      { id: 'restrictions', label: t('profile.sections.restrictions'), icon: 'pi pi-ban' },
    ]
  : [{ id: 'professional', label: t('profile.sections.professional'), icon: 'pi pi-briefcase' }]);

onMounted(load);
watch(userId, (id) => {
  if (!id) {
    profileStore.reset();
    return;
  }
  load();
});

async function load() {
  notice.value = '';
  formError.value = '';
  Object.assign(patientForm, emptyPatientProfile());
  Object.assign(goalForm, emptyGoal());
  Object.assign(preferenceForm, emptyPreference());
  Object.assign(restrictionForm, emptyRestriction());
  Object.assign(nutritionistForm, emptyNutritionistProfile());
  if (!userId.value) {
    profileStore.reset();
    return;
  }

  try {
    if (props.role === 'patient') {
      await profileStore.loadPatient(userId.value);
      Object.assign(patientForm, emptyPatientProfile(), profileStore.patientProfile ?? {});
    } else {
      await profileStore.loadNutritionist(userId.value);
      Object.assign(nutritionistForm, emptyNutritionistProfile(), profileStore.nutritionistProfile ?? {});
    }
  } catch {
    formError.value = t('profile.messages.loadError');
  }
}

async function saveProfile() {
  const errors = validatePatientProfile(patientForm);
  if (Object.keys(errors).length) {
    formError.value = t('profile.messages.correctFields');
    return;
  }
  await runSave(() => profileStore.savePatientProfile(userId.value, patientForm));
}

async function saveProfessionalProfile() {
  const errors = validateNutritionistProfile(nutritionistForm);
  if (Object.keys(errors).length) {
    formError.value = t('profile.messages.correctFields');
    return;
  }
  await runSave(() => profileStore.saveNutritionist(userId.value, nutritionistForm));
}

async function saveGoal() {
  if (!profileStore.patientProfile) {
    formError.value = t('profile.messages.savePersonalFirst');
    activeSection.value = 'personal';
    return;
  }
  if (Object.keys(validateGoal(goalForm)).length) {
    formError.value = t('profile.messages.correctFields');
    return;
  }
  await runSave(async () => {
    await profileStore.saveGoal({ ...goalForm });
    Object.assign(goalForm, emptyGoal());
  });
}

async function savePreference() {
  if (Object.keys(validatePreference(preferenceForm)).length) {
    formError.value = t('profile.messages.correctFields');
    return;
  }
  await runSave(async () => {
    await profileStore.savePreference(userId.value, { ...preferenceForm });
    Object.assign(preferenceForm, emptyPreference());
  });
}

async function saveRestriction() {
  if (Object.keys(validateRestriction(restrictionForm)).length) {
    formError.value = t('profile.messages.correctFields');
    return;
  }
  await runSave(async () => {
    await profileStore.saveRestriction(userId.value, { ...restrictionForm });
    Object.assign(restrictionForm, emptyRestriction());
  });
}

function editGoal(goal) { Object.assign(goalForm, goal); activeSection.value = 'goals'; }
function editPreference(preference) { Object.assign(preferenceForm, preference); activeSection.value = 'preferences'; }
function editRestriction(restriction) { Object.assign(restrictionForm, restriction); activeSection.value = 'restrictions'; }
function cancelEdit(form, emptyFactory) { Object.assign(form, emptyFactory()); }
async function removeGoal(id) { await runSave(() => profileStore.removeGoal(id)); }
async function removePreference(id) { await runSave(() => profileStore.removePreference(id)); }
async function removeRestriction(id) { await runSave(() => profileStore.removeRestriction(id)); }

async function runSave(action) {
  formError.value = '';
  notice.value = '';
  try {
    await action();
    notice.value = t('profile.messages.saved');
  } catch {
    formError.value = t('profile.messages.saveError');
  }
}

function emptyPatientProfile() {
  return { first_name: '', last_name: '', age: '', gender: '', weight: '', height: '' };
}
function emptyGoal() { return { type: '', target_weight: '', target_date: '', status: '' }; }
function emptyPreference() { return { dietary_preferences: '', favorite_foods: '' }; }
function emptyRestriction() { return { type: '', description: '' }; }
function emptyNutritionistProfile() { return { specialty: '', experience_years: '' }; }
</script>

<template>
  <section class="profile-page">
    <header class="page-heading">
      <div>
        <p class="eyebrow">{{ t('profile.eyebrow') }}</p>
        <h1>{{ props.role === 'patient' ? t('profile.patientTitle') : t('profile.nutritionistTitle') }}</h1>
        <p class="subtitle">{{ props.role === 'patient' ? t('profile.patientDescription') : t('profile.nutritionistDescription') }}</p>
      </div>
      <span class="heading-icon"><i :class="props.role === 'patient' ? 'pi pi-user' : 'pi pi-briefcase'" /></span>
    </header>

    <div v-if="!userId" class="message-card info-message" role="status">
      <i class="pi pi-info-circle" aria-hidden="true" />
      <div><b>{{ t('profile.messages.sessionRequiredTitle') }}</b><p>{{ t('profile.messages.sessionRequired') }}</p></div>
    </div>

    <template v-else>
      <p v-if="notice" class="message-card success-message" role="status"><i class="pi pi-check-circle" />{{ notice }}</p>
      <p v-if="formError" class="message-card error-message" role="alert"><i class="pi pi-exclamation-circle" />{{ formError }}</p>
      <p v-if="profileStore.loading" class="message-card info-message" role="status">{{ t('profile.messages.loading') }}</p>

      <div v-if="props.role === 'patient'" class="profile-layout">
        <nav class="section-tabs" :aria-label="t('profile.sectionsNavigation')">
          <button v-for="section in sections" :key="section.id" type="button" :class="{ active: activeSection === section.id }" @click="activeSection = section.id">
            <i :class="section.icon" aria-hidden="true" />{{ section.label }}<i class="pi pi-angle-right tab-arrow" aria-hidden="true" />
          </button>
        </nav>

        <div class="section-content">
          <form v-if="activeSection === 'personal'" class="content-card" @submit.prevent="saveProfile">
            <div class="card-heading"><div><h2>{{ t('profile.sections.personal') }}</h2><p>{{ t('profile.personalHint') }}</p></div></div>
            <div class="form-grid">
              <label>{{ t('profile.fields.firstName') }}<input v-model="patientForm.first_name" required autocomplete="given-name" /></label>
              <label>{{ t('profile.fields.lastName') }}<input v-model="patientForm.last_name" required autocomplete="family-name" /></label>
              <label>{{ t('profile.fields.age') }}<input v-model.number="patientForm.age" type="number" min="1" required /></label>
              <label>{{ t('profile.fields.gender') }}<input v-model="patientForm.gender" required /></label>
              <label>{{ t('profile.fields.weight') }}<input v-model.number="patientForm.weight" type="number" min="0.1" step="0.1" required /></label>
              <label>{{ t('profile.fields.height') }}<input v-model.number="patientForm.height" type="number" min="0.1" step="0.01" required /></label>
            </div>
            <div class="form-actions"><button class="primary-button" type="submit" :disabled="profileStore.saving">{{ t('profile.actions.save') }}</button></div>
          </form>

          <section v-else-if="activeSection === 'goals'" class="content-card">
            <div class="card-heading"><div><h2>{{ t('profile.sections.goals') }}</h2><p>{{ t('profile.goalsHint') }}</p></div></div>
            <form class="form-grid" @submit.prevent="saveGoal">
              <label>{{ t('profile.fields.goalType') }}<input v-model="goalForm.type" required /></label>
              <label>{{ t('profile.fields.targetWeight') }}<input v-model.number="goalForm.target_weight" type="number" min="0.1" step="0.1" required /></label>
              <label>{{ t('profile.fields.targetDate') }}<input v-model="goalForm.target_date" type="date" required /></label>
              <label>{{ t('profile.fields.status') }}<input v-model="goalForm.status" required /></label>
              <div class="form-actions full-width"><button class="primary-button" type="submit">{{ goalForm.id ? t('profile.actions.update') : t('profile.actions.addGoal') }}</button><button v-if="goalForm.id" class="text-button" type="button" @click="cancelEdit(goalForm, emptyGoal)">{{ t('profile.actions.cancel') }}</button></div>
            </form>
            <div class="records-list">
              <article v-for="goal in profileStore.goals" :key="goal.id" class="record-row"><span class="record-icon"><i class="pi pi-flag" /></span><div class="record-copy"><b>{{ goal.type }}</b><span>{{ goal.target_weight }} · {{ goal.target_date }} · {{ goal.status }}</span></div><button class="text-button" type="button" @click="editGoal(goal)">{{ t('profile.actions.edit') }}</button><button class="icon-action" type="button" :aria-label="t('profile.actions.delete')" @click="removeGoal(goal.id)"><i class="pi pi-trash" /></button></article>
              <p v-if="!profileStore.goals.length" class="empty-state">{{ t('profile.messages.noGoals') }}</p>
            </div>
          </section>

          <section v-else-if="activeSection === 'preferences'" class="content-card">
            <div class="card-heading"><div><h2>{{ t('profile.sections.preferences') }}</h2><p>{{ t('profile.preferencesHint') }}</p></div></div>
            <form class="form-grid" @submit.prevent="savePreference">
              <label>{{ t('profile.fields.dietaryPreferences') }}<textarea v-model="preferenceForm.dietary_preferences" rows="3" /></label>
              <label>{{ t('profile.fields.favoriteFoods') }}<textarea v-model="preferenceForm.favorite_foods" rows="3" /></label>
              <div class="form-actions full-width"><button class="primary-button" type="submit">{{ preferenceForm.id ? t('profile.actions.update') : t('profile.actions.addPreference') }}</button><button v-if="preferenceForm.id" class="text-button" type="button" @click="cancelEdit(preferenceForm, emptyPreference)">{{ t('profile.actions.cancel') }}</button></div>
            </form>
            <div class="records-list">
              <article v-for="preference in profileStore.preferences" :key="preference.id" class="record-row"><span class="record-icon"><i class="pi pi-heart" /></span><div class="record-copy"><b>{{ preference.dietary_preferences || t('profile.fields.favoriteFoods') }}</b><span>{{ preference.favorite_foods || preference.dietary_preferences }}</span></div><button class="text-button" type="button" @click="editPreference(preference)">{{ t('profile.actions.edit') }}</button><button class="icon-action" type="button" :aria-label="t('profile.actions.delete')" @click="removePreference(preference.id)"><i class="pi pi-trash" /></button></article>
              <p v-if="!profileStore.preferences.length" class="empty-state">{{ t('profile.messages.noPreferences') }}</p>
            </div>
          </section>

          <section v-else class="content-card">
            <div class="card-heading"><div><h2>{{ t('profile.sections.restrictions') }}</h2><p>{{ t('profile.restrictionsHint') }}</p></div></div>
            <form class="form-grid" @submit.prevent="saveRestriction">
              <label>{{ t('profile.fields.restrictionType') }}<input v-model="restrictionForm.type" required /></label>
              <label>{{ t('profile.fields.description') }}<textarea v-model="restrictionForm.description" rows="3" required /></label>
              <div class="form-actions full-width"><button class="primary-button" type="submit">{{ restrictionForm.id ? t('profile.actions.update') : t('profile.actions.addRestriction') }}</button><button v-if="restrictionForm.id" class="text-button" type="button" @click="cancelEdit(restrictionForm, emptyRestriction)">{{ t('profile.actions.cancel') }}</button></div>
            </form>
            <div class="records-list">
              <article v-for="restriction in profileStore.restrictions" :key="restriction.id" class="record-row"><span class="record-icon"><i class="pi pi-ban" /></span><div class="record-copy"><b>{{ restriction.type }}</b><span>{{ restriction.description }}</span></div><button class="text-button" type="button" @click="editRestriction(restriction)">{{ t('profile.actions.edit') }}</button><button class="icon-action" type="button" :aria-label="t('profile.actions.delete')" @click="removeRestriction(restriction.id)"><i class="pi pi-trash" /></button></article>
              <p v-if="!profileStore.restrictions.length" class="empty-state">{{ t('profile.messages.noRestrictions') }}</p>
            </div>
          </section>
        </div>
      </div>

      <form v-else class="content-card professional-card" @submit.prevent="saveProfessionalProfile">
        <div class="card-heading"><div><h2>{{ t('profile.sections.professional') }}</h2><p>{{ t('profile.professionalHint') }}</p></div></div>
        <div class="form-grid">
          <label>{{ t('profile.fields.specialty') }}<input v-model="nutritionistForm.specialty" required autocomplete="organization-title" /></label>
          <label>{{ t('profile.fields.experienceYears') }}<span class="input-suffix"><input v-model.number="nutritionistForm.experience_years" type="number" min="0" step="1" required /><small>{{ t('profile.fields.years') }}</small></span></label>
        </div>
        <div class="form-actions"><button class="primary-button" type="submit" :disabled="profileStore.saving">{{ t('profile.actions.save') }}</button></div>
      </form>
    </template>
  </section>
</template>

<style scoped>
.profile-page { max-width: 1120px; margin: 0 auto; padding: 34px 38px 48px; color: #294237; }
.page-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; }
.eyebrow { margin: 0 0 7px; color: #658174; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
h1 { margin: 0; color: #173f30; font-size: clamp(25px, 3vw, 34px); }
.subtitle { margin: 9px 0 0; color: #708077; font-size: 14px; }
.heading-icon { display: grid; width: 52px; height: 52px; place-items: center; border-radius: 16px; color: #1e6045; background: #e5f0e5; font-size: 21px; }
.profile-layout { display: grid; grid-template-columns: 230px minmax(0, 1fr); gap: 20px; align-items: start; }
.section-tabs, .content-card { border: 1px solid #e6ece5; border-radius: 15px; background: #fff; box-shadow: 0 5px 20px rgb(30 67 48 / 4%); }
.section-tabs { display: grid; gap: 5px; padding: 10px; }
.section-tabs button { display: flex; align-items: center; gap: 10px; min-height: 43px; padding: 0 11px; border: 0; border-radius: 9px; color: #5f7167; background: transparent; font: inherit; font-size: 13px; text-align: left; cursor: pointer; }
.section-tabs button.active { color: #174b37; background: #eaf3e8; font-weight: 700; }
.tab-arrow { margin-left: auto; font-size: 11px; }
.content-card { padding: 25px; }
.card-heading { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 23px; }
h2 { margin: 0; color: #234a37; font-size: 19px; }
.card-heading p { margin: 7px 0 0; color: #78877e; font-size: 13px; line-height: 1.5; }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 16px; }
.form-grid label { display: grid; gap: 7px; color: #52695c; font-size: 12px; font-weight: 600; }
input, textarea { box-sizing: border-box; width: 100%; min-height: 41px; padding: 10px 12px; border: 1px solid #dce5dc; border-radius: 8px; outline: none; color: #30483b; background: #fff; font: inherit; font-size: 13px; }
textarea { min-height: 80px; resize: vertical; }
input:focus, textarea:focus { border-color: #498565; box-shadow: 0 0 0 3px rgb(73 133 101 / 12%); }
.input-suffix { position: relative; display: flex; align-items: center; }
.input-suffix input { padding-right: 48px; }
.input-suffix small { position: absolute; right: 12px; color: #829087; font-size: 11px; font-weight: 400; }
.form-actions { display: flex; align-items: center; gap: 12px; margin-top: 22px; }
.full-width { grid-column: 1 / -1; margin-top: 0; }
.primary-button { min-height: 40px; padding: 0 18px; border: 0; border-radius: 8px; color: #fff; background: #1b6246; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.primary-button:hover { background: #154d37; }
.primary-button:disabled { opacity: .6; cursor: wait; }
.text-button, .icon-action { border: 0; color: #26704e; background: transparent; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
.icon-action { color: #8c625c; font-size: 13px; }
.records-list { display: grid; gap: 9px; margin-top: 24px; }
.record-row { display: flex; align-items: center; gap: 11px; padding: 12px; border: 1px solid #edf1ec; border-radius: 10px; }
.record-icon { display: grid; flex: 0 0 32px; width: 32px; height: 32px; place-items: center; border-radius: 50%; color: #397857; background: #edf5ec; font-size: 13px; }
.record-copy { display: grid; flex: 1; gap: 4px; min-width: 0; }
.record-copy b { color: #344f40; font-size: 12px; }
.record-copy span { overflow: hidden; color: #7a8980; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
.empty-state { margin: 8px 0 0; padding: 17px; border-radius: 9px; color: #75847a; background: #f7f9f6; font-size: 12px; text-align: center; }
.message-card { display: flex; align-items: flex-start; gap: 10px; margin: 0 0 16px; padding: 14px 16px; border-radius: 10px; font-size: 13px; }
.message-card p { margin: 5px 0 0; line-height: 1.5; }
.info-message { color: #3f6650; background: #edf5ed; }
.success-message { color: #286443; background: #e6f4e9; }
.error-message { color: #8a453e; background: #fff0ed; }
.professional-card { max-width: 760px; }
@media (max-width: 760px) { .profile-page { padding: 25px 16px 36px; } .profile-layout { grid-template-columns: 1fr; } .section-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); } .section-tabs button { font-size: 11px; } .tab-arrow { display: none; } }
@media (max-width: 480px) { .form-grid { grid-template-columns: 1fr; } .content-card { padding: 18px; } .record-row { flex-wrap: wrap; } .record-copy { flex-basis: calc(100% - 48px); } }
</style>
