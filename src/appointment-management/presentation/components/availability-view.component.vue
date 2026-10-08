<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppointmentStore } from '../../application/appointment.store.js';

const emit = defineEmits(['selected']);
const { t } = useI18n();
const store = useAppointmentStore();

function loadAvailability() {
  store.getAvailability();
}

function selectAvailability(id) {
  emit('selected', id);
}

onMounted(() => {
  if (!store.availabilityLoaded) loadAvailability();
});
</script>

<template>
  <section>
    <h2>{{ t('appointments.availability.title') }}</h2>
    <pv-data-table :value="store.availabilities" data-key="id" :empty-message="t('common.empty')">
      <pv-column field="date" :header="t('appointments.date')" />
      <pv-column field="startTime" :header="t('appointments.start')" />
      <pv-column field="endTime" :header="t('appointments.end')" />
      <pv-column field="nutritionistId" :header="t('appointments.nutritionist')" />
      <pv-column :header="t('common.actions')">
        <template #body="{ data }">
          <pv-button
              :label="t('appointments.availability.select')"
              size="small"
              :disabled="!data.isAvailable()"
              @click="selectAvailability(data.id)"
          />
        </template>
      </pv-column>
    </pv-data-table>
  </section>
</template>