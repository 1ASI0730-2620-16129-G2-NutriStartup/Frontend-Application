<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { useAppointmentStore } from '@/appointment-management/application/appointment.store.js';
import { useCurrentUserStore } from '@/shared/application/current-user.store.js';

const { t } = useI18n();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const store = useAppointmentStore();
const currentUserStore = useCurrentUserStore();
const userId = computed(() => currentUserStore.user?.id);
const isNutritionist = computed(() => currentUserStore.user?.role === 'nutritionist');

function loadAppointments() {
  if (userId.value) store.getAppointmentsByUser(userId.value, currentUserStore.user?.role);
}

function newAppointment() {
  router.push({ name: 'appointment-new' });
}

function cancelAppointment(id) {
  confirm.require({
    message: t('appointments.list.confirmCancel'),
    header: t('appointments.common.cancel'),
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await store.cancelAppointment(id);
        toast.add({ severity: 'success', summary: t('appointments.list.cancelled'), life: 3000 });
      } catch {
        toast.add({ severity: 'error', summary: t('appointments.common.error'), life: 4000 });
      }
    },
  });
}

function deleteAppointment(id) {
  confirm.require({
    message: t('appointments.list.confirmDelete'),
    header: t('appointments.common.delete'),
    icon: 'pi pi-trash',
    accept: async () => {
      try {
        await store.deleteAppointment(id);
        toast.add({ severity: 'success', summary: t('appointments.list.deleted'), life: 3000 });
      } catch {
        toast.add({ severity: 'error', summary: t('appointments.common.error'), life: 4000 });
      }
    },
  });
}

function registerConsultation(id) {
  router.push({ name: 'consultation-new', query: { appointmentId: id } });
}

onMounted(loadAppointments);
</script>

<template>
  <section class="p-4">
    <div class="header">
      <h2>{{ t('appointments.list.title') }} ({{ store.appointmentsCount }})</h2>
      <pv-button v-if="!isNutritionist" :label="t('appointments.list.new')" @click="newAppointment" />
    </div>

    <pv-data-table :value="store.appointments" data-key="id" :empty-message="t('appointments.common.empty')">
      <pv-column field="date" :header="t('appointments.date')" />
      <pv-column field="startTime" :header="t('appointments.start')" />
      <pv-column field="endTime" :header="t('appointments.end')" />
      <pv-column field="reason" :header="t('appointments.reason')" />
      <pv-column field="status" :header="t('appointments.status')" />
      <pv-column :header="t('appointments.common.actions')">
        <template #body="{ data }">
          <div class="row-actions">
            <pv-button
                v-if="isNutritionist"
                :label="t('appointments.list.consultation')"
                size="small"
                severity="secondary"
                :disabled="!data.isAvailable()"
                @click="registerConsultation(data.id)"
            />
            <pv-button
                :label="t('appointments.common.cancel')"
                size="small"
                severity="warn"
                :disabled="!data.isAvailable()"
                @click="cancelAppointment(data.id)"
            />
            <pv-button
                :label="t('appointments.common.delete')"
                icon="pi pi-trash"
                size="small"
                severity="danger"
                @click="deleteAppointment(data.id)"
            />
          </div>
        </template>
      </pv-column>
    </pv-data-table>
  </section>
</template>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
.row-actions { display: flex; gap: .5rem; flex-wrap: wrap; }
</style>
