<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentStore } from '../../application/appointment.store.js';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useAppointmentStore();
const errors = reactive([]);

const form = reactive({
  appointmentId: Number(route.query.appointmentId) || null,
  notes: '',
  recommendations: '',
});

async function registerConsultation() {
  errors.length = 0;
  if (!form.appointmentId) errors.push(t('consultations.noAppointment'));
  if (!form.notes.trim()) errors.push(t('consultations.notesRequired'));
  if (errors.length) return;

  try {
    await store.registerConsultation({
      appointmentId: form.appointmentId,
      notes: form.notes,
      recommendations: form.recommendations,
      date: new Date().toISOString().slice(0, 10),
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
    <h2>{{ t('consultations.title') }}</h2>

    <ul v-if="errors.length" class="errors">
      <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
    </ul>

    <div class="field">
      <label>{{ t('consultations.notes') }}</label>
      <pv-textarea v-model="form.notes" rows="4" />
    </div>
    <div class="field">
      <label>{{ t('consultations.recommendations') }}</label>
      <pv-textarea v-model="form.recommendations" rows="4" />
    </div>

    <div class="actions">
      <pv-button :label="t('common.cancel')" severity="secondary" @click="navigateToAppointments" />
      <pv-button :label="t('consultations.submit')" @click="registerConsultation" />
    </div>
  </section>
</template>

<style scoped>
.form { max-width: 480px; display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: .25rem; }
.actions { display: flex; gap: .5rem; justify-content: flex-end; }
.errors { color: #c0392b; padding-left: 1rem; }
</style>