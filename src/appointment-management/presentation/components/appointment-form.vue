<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentStore } from '../../application/appointment.store.js';

const USER_ID = 1; // TODO: reemplazar por el usuario autenticado (IAM BC)

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useAppointmentStore();
const errors = reactive([]);

const form = reactive({
  nutritionistId: null,
  date: '',
  startTime: '',
  endTime: '',
  reason: '',
});

const availabilityId = computed(() => Number(route.query.availabilityId) || null);

onMounted(async () => {
  if (!store.availabilityLoaded) await store.getAvailability();
  const slot = store.availabilities.find((a) => a.id === availabilityId.value);
  if (slot) {
    form.nutritionistId = slot.nutritionistId;
    form.date = slot.date;
    form.startTime = slot.startTime;
    form.endTime = slot.endTime;
  }
});

function validate() {
  errors.length = 0;
  if (!form.nutritionistId || !form.date || !form.startTime || !form.endTime) {
    errors.push(t('appointments.form.selectSlot'));
  }
  if (!form.reason.trim()) errors.push(t('appointments.form.reasonRequired'));
  return errors.length === 0;
}

async function createAppointment() {
  if (!validate()) return;
  try {
    await store.createAppointment({
      userId: USER_ID,
      nutritionistId: form.nutritionistId,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      status: 'PENDING',
      reason: form.reason,
    });
    navigateToAppointments();
  } catch {
    errors.push(t('common.error'));
  }
}

function navigateToAppointments() {
  router.push({ name: 'appointments' });
}
</script>

<template>
  <section class="form">
    <h2>{{ t('appointments.form.title') }}</h2>

    <ul v-if="errors.length" class="errors">
      <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
    </ul>

    <div class="field">
      <label>{{ t('appointments.date') }}</label>
      <pv-input-text v-model="form.date" readonly />
    </div>
    <div class="field">
      <label>{{ t('appointments.start') }} - {{ t('appointments.end') }}</label>
      <pv-input-text :model-value="`${form.startTime} - ${form.endTime}`" readonly />
    </div>
    <div class="field">
      <label>{{ t('appointments.nutritionist') }}</label>
      <pv-input-text :model-value="form.nutritionistId" readonly />
    </div>
    <div class="field">
      <label>{{ t('appointments.reason') }}</label>
      <pv-textarea v-model="form.reason" rows="4" />
    </div>

    <div class="actions">
      <pv-button :label="t('common.cancel')" severity="secondary" @click="navigateToAppointments" />
      <pv-button :label="t('appointments.form.submit')" @click="createAppointment" />
    </div>
  </section>
</template>

<style scoped>
.form { max-width: 480px; display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: .25rem; }
.actions { display: flex; gap: .5rem; justify-content: flex-end; }
.errors { color: #c0392b; padding-left: 1rem; }
</style>