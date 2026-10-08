<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentStore } from '@/appointment-management/application/appointment.store.js';

const USER_ID = 1; // TODO: reemplazar por el usuario autenticado

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useAppointmentStore();
const errors = reactive([]);

const selectedId = ref(route.query.availabilityId ? String(route.query.availabilityId) : null);
const reason = ref('');

const slotOptions = computed(() =>
    store.availabilities
        .filter((a) => a.isAvailable())
        .map((a) => ({
          id: String(a.id),
          label: `${a.date} | ${a.startTime} - ${a.endTime} | ${t('appointments.nutritionist')} ${a.nutritionistId}`,
        }))
);

const selectedSlot = computed(
    () => store.availabilities.find((a) => String(a.id) === selectedId.value) ?? null
);

onMounted(() => {
  store.getAvailability();
});

function validate() {
  errors.length = 0;
  if (!selectedSlot.value) errors.push(t('appointments.form.selectSlot'));
  if (!reason.value.trim()) errors.push(t('appointments.form.reasonRequired'));
  return errors.length === 0;
}

async function createAppointment() {
  if (!validate()) return;
  const slot = selectedSlot.value;
  try {
    await store.createAppointment({
      userId: USER_ID,
      nutritionistId: slot.nutritionistId,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: 'PENDING',
      reason: reason.value,
    });
    navigateToAppointments();
  } catch {
    errors.push(t('appointments.common.error'));
  }
}

function navigateToAppointments() {
  router.push({ name: 'appointments' });
}
</script>

<template>
  <section class="form p-4">
    <h2>{{ t('appointments.form.title') }}</h2>

    <ul v-if="errors.length" class="errors">
      <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
    </ul>

    <div class="field">
      <label>{{ t('appointments.form.slot') }}</label>
      <pv-select
          v-model="selectedId"
          :options="slotOptions"
          option-label="label"
          option-value="id"
          :placeholder="t('appointments.form.choose')"
          class="w-full"
      />
    </div>
    <div class="field">
      <label>{{ t('appointments.reason') }}</label>
      <pv-textarea v-model="reason" rows="4" />
    </div>

    <div class="actions">
      <pv-button :label="t('appointments.common.cancel')" severity="secondary" @click="navigateToAppointments" />
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