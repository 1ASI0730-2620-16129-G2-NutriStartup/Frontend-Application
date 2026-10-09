<script setup>
import {computed, onMounted, ref} from "vue";
import {useToast} from "primevue/usetoast";
import {useI18n} from "vue-i18n";
import {useProgressMonitoringStore} from "../../../../../../WebstormProjects/Fronted-Aplication/src/application/progress-monitoring-store.js";
import ProgressSummaryCard from "../../../../../../WebstormProjects/Fronted-Aplication/src/shared/presentation/components/progress-summary-card.vue";
import ProgressTrend from "../../../../../../WebstormProjects/Fronted-Aplication/src/shared/presentation/components/progress-trend.vue";
import HabitTracking from "../../../../../../WebstormProjects/Fronted-Aplication/src/shared/presentation/components/habit-tracking.vue";
import ProgressRegistrationForm from "../../../../../../WebstormProjects/Fronted-Aplication/src/shared/presentation/components/progress-registration-form.vue";

const store = useProgressMonitoringStore();
const toast = useToast();
const {t} = useI18n();
const showRegistrationForm = ref(false);

const currentWeight = computed(() => store.latestProgress ? `${store.latestProgress.weight.toFixed(1)} kg` : "--");
const weightChangeText = computed(() => {
    if (!store.firstProgress || !store.latestProgress) return t("progress.noPreviousRecords");
    if (store.weightChange === 0) return t("progress.noChanges");
    return t("progress.weightChangeSinceFirst", {change: `${store.weightChange > 0 ? "+" : ""}${store.weightChange.toFixed(1)} kg`});
});
const latestActivity = computed(() => `${store.latestProgress?.activityMinutes || 0} min`);

function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("es-PE");
}

function formatMeasurement(value) {
    return value === null || value === undefined ? "--" : `${value} cm`;
}

async function registerProgress(progress) {
    try {
        await store.registerProgress(progress);
        showRegistrationForm.value = false;
        toast.add({severity: "success", summary: t("progress.recordSaved"), detail: t("progress.recordAddedToHistory"), life: 3000});
    } catch (error) {
        toast.add({severity: "error", summary: t("progress.recordError"), detail: error.message, life: 3500});
    }
}

async function toggleReminder(active) {
    await store.updateReminder(active);
    toast.add({severity: active ? "success" : "info", summary: active ? t("progress.reminderActivated") : t("progress.reminderDeactivated"), detail: t("progress.reminderUpdated"), life: 2500});
}

function navigateToHistory() {
    document.getElementById("progress-history")?.scrollIntoView({behavior: "smooth"});
}

function loadProgress() {
    return store.load();
}

onMounted(loadProgress);
</script>

<template>
  <section class="progress-page p-4 md:p-5">
    <pv-toast />
    <div class="flex flex-column md:flex-row md:align-items-center md:justify-content-between gap-3 mb-4">
      <div>
        <p class="eyebrow m-0 mb-2">Progress Monitoring BC</p>
        <h1 class="text-3xl font-bold m-0">{{ t('progress.title') }}</h1>
        <p class="text-color-secondary m-0 mt-2">{{ t('progress.subtitle') }}</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <pv-button :label="t('progress.register')" icon="pi pi-plus" @click="showRegistrationForm = true" />
        <pv-button :label="t('progress.viewHistory')" icon="pi pi-list" severity="secondary" outlined @click="navigateToHistory" />
      </div>
    </div>

    <div v-if="store.errors.length" class="error-list mb-4 p-3 border-1 border-round">
      <p v-for="error in store.errors" :key="error" class="m-0 text-sm">{{ error }}</p>
    </div>

    <div class="grid mb-1">
      <div class="col-12 md:col-6 lg:col-3">
        <ProgressSummaryCard :title="t('progress.currentWeight')" :value="currentWeight" :detail="t('progress.latestRecord')" icon="pi pi-chart-line" />
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <ProgressSummaryCard :title="t('progress.weightChange')" :value="weightChangeText" :detail="t('progress.fromFirstRecord')" icon="pi pi-arrow-down" />
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <ProgressSummaryCard :title="t('progress.planCompliance')" :value="`${store.averageCompliance}%`" :detail="t('progress.averageRecords')" icon="pi pi-check-circle" />
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <ProgressSummaryCard :title="t('progress.physicalActivity')" :value="latestActivity" :detail="t('progress.latestRecord')" icon="pi pi-heart" />
      </div>
    </div>

    <div class="grid">
      <div class="col-12 lg:col-8">
        <pv-card class="h-full">
          <template #title>{{ t('progress.weightEvolution') }}</template>
          <template #subtitle>{{ t('progress.weightEvolutionSubtitle') }}</template>
          <template #content><ProgressTrend :records="store.orderedProgress" /></template>
        </pv-card>
      </div>
      <div class="col-12 lg:col-4">
        <HabitTracking />
      </div>
      <div id="progress-history" class="col-12">
        <pv-card>
          <template #title>{{ t('progress.historyTitle') }}</template>
          <template #subtitle>{{ t('progress.historySubtitle') }}</template>
          <template #content>
            <pv-data-table :value="store.orderedProgress.slice().reverse()" responsive-layout="scroll" striped-rows>
              <pv-column field="date" :header="t('progress.date')"><template #body="slotProps">{{ formatDate(slotProps.data.date) }}</template></pv-column>
              <pv-column field="weight" :header="t('progress.weight')"><template #body="slotProps">{{ Number(slotProps.data.weight).toFixed(1) }} kg</template></pv-column>
              <pv-column field="waist" :header="t('progress.waist')"><template #body="slotProps">{{ formatMeasurement(slotProps.data.waist) }}</template></pv-column>
              <pv-column field="hip" :header="t('progress.hip')"><template #body="slotProps">{{ formatMeasurement(slotProps.data.hip) }}</template></pv-column>
              <pv-column field="bodyFat" :header="t('progress.bodyFat')"><template #body="slotProps">{{ slotProps.data.bodyFat ?? "--" }}{{ slotProps.data.bodyFat == null ? "" : "%" }}</template></pv-column>
              <pv-column field="activityMinutes" :header="t('progress.activity')"><template #body="slotProps">{{ slotProps.data.activityMinutes }} min</template></pv-column>
              <pv-column field="planCompliance" :header="t('progress.compliance')"><template #body="slotProps">{{ slotProps.data.planCompliance }}%</template></pv-column>
            </pv-data-table>
            <p v-if="!store.progressCount" class="text-color-secondary mt-3">{{ t('progress.noRecords') }}</p>
          </template>
        </pv-card>
      </div>
      <div class="col-12 md:col-6">
        <pv-card>
          <template #title>{{ t('progress.reminderTitle') }}</template>
          <template #content>
            <div class="flex align-items-center justify-content-between gap-3">
              <div>
                <div class="font-medium">{{ store.reminder.name }}</div>
                <div class="text-sm text-color-secondary mt-1">{{ t('progress.reminderTime') }}: {{ store.reminder.time }}</div>
                <div class="text-sm text-color-secondary mt-1">{{ store.reminder.active ? t('progress.active') : t('progress.inactive') }}</div>
              </div>
              <pv-checkbox :model-value="store.reminder.active" binary @update:model-value="toggleReminder" />
            </div>
          </template>
        </pv-card>
      </div>
    </div>

    <ProgressRegistrationForm v-model:visible="showRegistrationForm" @save="registerProgress" />
  </section>
</template>

<style scoped>
.progress-page { padding-bottom: 5rem; font-family: Arial, sans-serif; letter-spacing: .02em; }
.eyebrow { color: #16a34a; font-size: .85rem; font-weight: 700; text-transform: uppercase; }
.error-list { display: flex; flex-direction: column; gap: .4rem; background: #fff8e6; border-color: #f5d78e; color: #7c5b13; }
</style>
