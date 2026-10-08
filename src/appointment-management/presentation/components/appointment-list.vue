<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppointmentStore } from '../../application/appointment.store.js';

const USER_ID = 1; // TODO: usuario autenticado

const { t } = useI18n();
const router = useRouter();
const store = useAppointmentStore();

function loadAppointments() {
  store.getAppointmentsByUser(USER_ID);
}

function cancelAppointment(id) {
  store.cancelAppointment(id);
}

function registerConsultation(id) {
  router.push({ name: 'consultation-new', query: { appointmentId: id } });
}

onMounted(loadAppointments);
</script>

<template>
  <section>
    <div class="header">
      <h2>{{ t('appointments.list.title') }} ({{ store.appointmentsCount }})</h2>
      <pv-button :label="t('appointments.list.new')" @click="router.push({ name: 'availability' })" />
    </div>

    <pv-data-table :value="store.appointments" data-key="id" :empty-message="t('common.empty')">
      <pv-column field="date" :header="t('appointments.date')" />
      <pv-column field="startTime" :header="t('appointments.start')" />
      <pv-column field="endTime" :header="t('appointments.end')" />
      <pv-column field="reason" :header="t('appointments.reason')" />
      <pv-column field="status" :header="t('appointments.status')" />
      <pv-column :header="t('common.actions')">
        <template #body="{ data }">
          <div class="row-actions">
            <pv-button
                :label="t('appointments.list.consultation')"
                size="small"
                severity="secondary"
                :disabled="!data.isAvailable()"
                @click="registerConsultation(data.id)"
            />
            <pv-button
                :label="t('common.cancel')"
                size="small"
                severity="danger"
                :disabled="!data.isAvailable()"
                @click="cancelAppointment(data.id)"
            />
          </div>
        </template>
      </pv-column>
    </pv-data-table>
  </section>
</template>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
.row-actions { display: flex; gap: .5rem; }
</style>