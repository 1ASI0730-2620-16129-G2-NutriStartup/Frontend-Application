<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useProgressMonitoringStore } from '@/progres-monitoring/aplication/progress-monitoring.store.js';
import { useCurrentUserStore } from '@/shared/application/current-user.store.js';
import { HabitRecord, HabitType } from '@/progres-monitoring/domain/model/habit-record.entity.js';
import { todayIsoDate, validateHabitRecord } from '@/progres-monitoring/domain/habit-record.validation.js';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const store = useProgressMonitoringStore();
const currentUserStore = useCurrentUserStore();

const today = todayIsoDate();
const form = reactive({
  type: HabitType.FOOD,
  description: '',
  quantity: null,
  date: today,
  notes: '',
});
const errors = ref({});
const saving = ref(false);

const typeOptions = computed(() => [
  { value: HabitType.FOOD, label: t('progress-monitoring.types.FOOD') },
  { value: HabitType.ACTIVITY, label: t('progress-monitoring.types.ACTIVITY') },
]);
const descriptionLabel = computed(() => t(`progress-monitoring.form.description.${form.type}`));
const quantityLabel = computed(() => t(`progress-monitoring.form.quantity.${form.type}`));
const quantitySuffix = computed(() => (form.type === HabitType.FOOD ? ' kcal' : ' min'));

function errorMessage(field) {
  return errors.value[field] ? t(`progress-monitoring.validation.${errors.value[field]}`) : '';
}

async function saveHabitRecord() {
  const habitRecord = new HabitRecord({
    userId: currentUserStore.user?.id,
    type: form.type,
    description: form.description.trim(),
    quantity: form.quantity,
    date: form.date,
    notes: form.notes.trim(),
  });

  errors.value = validateHabitRecord(habitRecord);
  if (Object.keys(errors.value).length > 0) return;

  saving.value = true;
  try {
    await store.createHabitRecord(habitRecord);
    toast.add({ severity: 'success', summary: t('progress-monitoring.form.saved'), life: 3000 });
    navigateToList();
  } catch {
    toast.add({ severity: 'error', summary: t('progress-monitoring.form.error'), life: 4000 });
  } finally {
    saving.value = false;
  }
}

function navigateToList() {
  router.push({ name: 'habit-records-patient' });
}
</script>

<template>
  <div class="p-4">
    <h1>{{ t('progress-monitoring.form.title') }}</h1>

    <form class="form" novalidate @submit.prevent="saveHabitRecord">
      <div class="field">
        <label>{{ t('progress-monitoring.form.type') }}</label>
        <pv-select-button
            v-model="form.type"
            :allow-empty="false"
            :options="typeOptions"
            option-label="label"
            option-value="value" />
        <small v-if="errors.type" class="field-error">{{ errorMessage('type') }}</small>
      </div>

      <div class="field">
        <label for="description">{{ descriptionLabel }}</label>
        <pv-input-text id="description" v-model="form.description" :invalid="!!errors.description" class="w-full" />
        <small v-if="errors.description" class="field-error">{{ errorMessage('description') }}</small>
      </div>

      <div class="field">
        <label for="quantity">{{ quantityLabel }}</label>
        <pv-input-number
            v-model="form.quantity"
            :invalid="!!errors.quantity"
            :min="0"
            :suffix="quantitySuffix"
            :use-grouping="false"
            class="w-full"
            input-id="quantity" />
        <small v-if="errors.quantity" class="field-error">{{ errorMessage('quantity') }}</small>
      </div>

      <div class="field">
        <label for="date">{{ t('progress-monitoring.form.date') }}</label>
        <input id="date" v-model="form.date" :max="today" class="date-input" type="date" />
        <small v-if="errors.date" class="field-error">{{ errorMessage('date') }}</small>
      </div>

      <div class="field">
        <label for="notes">{{ t('progress-monitoring.form.notes') }}</label>
        <pv-textarea id="notes" v-model="form.notes" class="w-full" rows="3" />
      </div>

      <div class="actions">
        <pv-button
            :label="t('progress-monitoring.form.cancel')"
            severity="secondary"
            type="button"
            @click="navigateToList" />
        <pv-button
            :label="t('progress-monitoring.form.save')"
            :loading="saving"
            icon="pi pi-save"
            type="submit" />
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  font-family: sans-serif;
  color: #154d37;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 480px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.actions {
  display: flex;
  gap: .5rem;
  justify-content: flex-end;
}

.field-error {
  color: #c0392b;
}

.date-input {
  padding: .6rem;
  border: 1px solid #c4cdc6;
  border-radius: 6px;
  font: inherit;
}
</style>