<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import useNutritionStore from "../../application/nutrition.store.js";
import {computed, onMounted, ref, watch} from "vue";
import {NutritionPlan} from "../../domain/model/nutrition-plan.entity.js";
import {DateTime} from "@/shared/domain/model/date-time.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = useNutritionStore();
const { errors, addNutritionPlan, updateNutritionPlan } = store;

const form = ref({
  name: '', description: '',
  objective: '', startDate: '', endDate: '',
  status: ''
});

const formError = ref("");

const isEdit = computed(() => {
  return !!route.params.id;
});

function formatDate(value) {
  if (value instanceof DateTime) {
    return value.toISOString().slice(0, 10);
  }

  const dateValue = String(value ?? "");
  const datePrefix = dateValue.match(/^\d{4}-\d{2}-\d{2}/);

  if (datePrefix) {
    return datePrefix[0];
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

onMounted(() => {
  console.log("Mounted nutrition plan form");
  console.log(route.params.id);
  if (isEdit.value) {
    const nutritionPlan = getNutritionPlanById(route.params.id);
    if (nutritionPlan) {
      form.value.name = nutritionPlan.name;
      form.value.description = nutritionPlan.description;
      form.value.objective = nutritionPlan.objective;
      form.value.startDate = nutritionPlan.startDate;
      form.value.endDate = nutritionPlan.endDate;
      form.value.status = nutritionPlan.status;
    } else {
      router.push({ name: 'nutrition-plans' });
    }
  }
});

function getNutritionPlanById(id) {
  return store.getNutritionPlanById(id);
}

const saveNutritionPlan = () => {
  const nutritionPlan = new NutritionPlan({
    id: isEdit.value ? route.params.is : null,
    name: form.value.name,
    description: form.value.description,
    objective: form.value.objective,
    startDate: form.value.startDate,
    endDate: form.value.endDate,
    status: form.value.status
  });
  if (isEdit.value) {
    updateNutritionPlan(nutritionPlan);
  } else {
    addNutritionPlan(nutritionPlan);
  }
  navigateBack();
};

const navigateBack = () => {
  router.push({ name: 'nutrition-plans' });
};
</script>

<template>
  <div class="p-4">
    <h1>{{ isEdit ? t('nutrition-plan.edit-title') : t('nutrition-plan.new-title') }}</h1>
    <form @submit.prevent="saveNutritionPlan">
      <div class="field mb-3">
        <label for="name">{{ t('nutrition-plan.name') }}</label>
        <pv-input-text id="name" v-model="form.name" class="w-full" required />
      </div>
      <pv-button :label="t('nutrition-plan.save')" icon="pi pi-save" type="submit" />
      <pv-button :label="t('nutrition-plan.cancel')" class="ml-2" saverity="secondary" @click="navigateBack" />
    </form>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}:
      {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>

</style>
