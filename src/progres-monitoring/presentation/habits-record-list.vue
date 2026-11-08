<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useProgressMonitoringStore } from '@/progress-monitoring/application/progress-monitoring.store.js';
import { useCurrentUserStore } from '@/shared/application/current-user.store.js';

const { t } = useI18n();
const router = useRouter();
const store = useProgressMonitoringStore();
const currentUserStore = useCurrentUserStore();
const userId = computed(() => currentUserStore.user?.id);

const from = ref('');
const to = ref('');
const loading = ref(false);

async function loadHabitRecords() {
  if (!userId.value) return;
  loading.value = true;
  await store.getHabitRecordsByUser(userId.value, { from: from.value, to: to.value });
  loading.value = false;
}

function clearFilters() {
  from.value = '';
  to.value = '';
  loadHabitRecords();
}

function navigateToNew() {
  router.push({ name: 'habit-records-patient-new' });
}

onMounted(loadHabitRecords);
</script>

<template>
  <div class="p-4">
    <h1>{{ t('progress-monitoring.list.title') }} ({{ store.habitRecordsCount }})</h1>

    <div class="filters mb-3">
      <div class="field">
        <label for="from">{{ t('progress-monitoring.filters.from') }}</label>
        <input id="from" v-model="from" type="date" class="date-input" />
      </div>
      <div class="field">
        <label for="to">{{ t('progress-monitoring.filters.to') }}</label>
        <input id="to" v-model="to" type="date" class="date-input" />
      </div>
      <pv-button :label="t('progress-monitoring.filters.apply')" icon="pi pi-search" @click="loadHabitRecords" />
      <pv-button :label="t('progress-monitoring.filters.clear')" severity="secondary" text @click="clearFilters" />
    </div>

    <pv-button
        :label="t('progress-monitoring.list.new')"
        class="mb-3"
        icon="pi pi-plus"
        @click="navigateToNew" />

    <pv-data-table
        :loading="loading"
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        :value="store.habitRecords"
        data-key="id"
        paginator
        striped-rows
        table-style="min-width: 50rem">
      <pv-column :header="t('progress-monitoring.columns.date')" field="date" sortable />
      <pv-column :header="t('progress-monitoring.columns.type')" field="type" sortable>
        <template #body="{ data }">
          <pv-tag
              :severity="data.isFood() ? 'success' : 'info'"
              :value="t(`progress-monitoring.types.${data.type}`)" />
        </template>
      </pv-column>
      <pv-column :header="t('progress-monitoring.columns.description')" field="description" sortable />
      <pv-column :header="t('progress-monitoring.columns.quantity')" field="quantity" sortable>
        <template #body="{ data }">{{ data.quantity }} {{ data.unit() }}</template>
      </pv-column>
      <pv-column :header="t('progress-monitoring.columns.notes')" field="notes" />
      <template #empty>{{ t('progress-monitoring.list.empty') }}</template>
    </pv-data-table>

    <div v-if="store.errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ store.errors.map((e) => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: sans-serif;
  color: #154d37;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.date-input {
  padding: .6rem;
  border: 1px solid #c4cdc6;
  border-radius: 6px;
  font: inherit;
}
</style>