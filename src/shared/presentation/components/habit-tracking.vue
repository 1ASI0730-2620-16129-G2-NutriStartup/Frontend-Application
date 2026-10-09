<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {useProgressMonitoringStore} from "../../../../../../WebstormProjects/Fronted-Aplication/src/application/progress-monitoring-store.js";

const store = useProgressMonitoringStore();
const {t} = useI18n();
const habitName = ref("");
const errorMessage = ref("");

function today() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

async function registerHabit() {
    errorMessage.value = "";
    try {
        await store.registerHabit({userId: 1, date: today(), habitType: habitName.value, completed: false});
        habitName.value = "";
    } catch (error) {
        errorMessage.value = error.message;
    }
}

async function updateHabit(habit, completed) {
    await store.updateHabit({...habit, completed});
}

function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("es-PE");
}
</script>

<template>
  <pv-card class="h-full">
    <template #title>{{ t('progress.habitsTitle') }}</template>
    <template #subtitle>{{ t('progress.habitsSubtitle') }}</template>
    <template #content>
      <form class="flex gap-2 mb-4" @submit.prevent="registerHabit">
        <pv-input-text v-model="habitName" class="w-full" :placeholder="t('progress.habitPlaceholder')" :aria-label="t('progress.habitAriaLabel')" />
        <pv-button icon="pi pi-plus" type="submit" :aria-label="t('progress.addHabit')" :disabled="!habitName.trim()" />
      </form>
      <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>
      <div v-if="store.habitRecords.length" class="flex flex-column gap-3">
        <div v-for="habit in store.habitRecords.slice().reverse()" :key="habit.id || `${habit.date}-${habit.habitType}`" class="habit-row flex align-items-center justify-content-between gap-3">
          <div>
            <div class="font-medium">{{ habit.habitType }}</div>
            <div class="text-sm text-color-secondary">{{ formatDate(habit.date) }}</div>
          </div>
          <pv-checkbox :model-value="habit.completed" binary @update:model-value="updateHabit(habit, $event)" />
        </div>
      </div>
      <p v-else class="text-color-secondary m-0">{{ t('progress.noHabits') }}</p>
    </template>
  </pv-card>
</template>

<style scoped>
.habit-row { border-bottom: 1px solid #eef2f7; padding-bottom: .75rem; }
.habit-row:last-child { border-bottom: none; padding-bottom: 0; }
</style>
