<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import useNutritionStore from "@/nutrition/application/nutrition.store.js";
import {computed, onMounted, ref} from "vue";
import {MealPlan} from "../../domain/model/meal-plan.entity.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = useNutritionStore();
const {errors, mealPlans, addMealPlan, updateMealPlan, fetchMealPlans} = store;

const form = ref({
  nutritionPlanId: null, mealType: '',
  description: '', calories: 0
});

const isEdit = computed(() => {
  return !!route.params.id;
});

onMounted(() => {
  console.log("Mounted meal plan form");
  console.log(route.params.id);
  if (isEdit.value) {
    const mealPlan = getMealPlanById(route.params.id);
    if (mealPlan) {
      form.value.nutritionPlanId = mealPlan.nutritionPlanId;
      form.value.mealType = mealPlan.mealType;
      form.value.description = mealPlan.description;
      form.value.calories = mealPlan.calories;
    } else {
      router.push({ name: 'meal-plans' });
    }
  }
});

function getMealPlanById(id) {
  return store.getMealPlanById(id);
}

const saveMealPlan = () => {
  const mealPlan = new MealPlan({
    id: isEdit.value ? Number(route.params.id) : null,
    nutritionPlanId: form.value.nutritionPlanId,
    mealType: form.value.mealType,
    description: form.value.description,
    calories: form.value.calories,
  });
  if (isEdit.value) {
    updateMealPlan(mealPlan);
  } else {
    addMealPlan(mealPlan);
  }
  navigateBack();
};

const navigateBack = () => {
  router.push({ name: 'meal-plans-nutritionist' });
};
</script>

<template>
  <div class="p-4 letter-style">
    <h1>{{ isEdit ? t('meal-plan.edit-title') : t('meal-plan.new-title') }}</h1>
    <form @submit.prevent="saveMealPlan">
      <div class="field mb-3">
        <label for="nutritionPlanId">{{ t('meal-plans.nutrition-id') }}</label>
        <pv-input-text id="nutritionPlanId" v-model="form.nutritionPlanId" class="w-full" required />
        <label for="mealType">{{ t('meal-plans.type') }}</label>
        <pv-input-text id="mealType" v-model="form.mealType" class="w-full" required />
        <label for="description">{{ t('meal-plans.description') }}</label>
        <pv-input-text id="description" v-model="form.description" class="w-full" required />
        <label for="calories">{{ t('meal-plans.calories') }}</label>
        <pv-input-text id="calories" v-model="form.calories" class="w-full" required />
      </div>
      <pv-button :label="t('meal-plan.save')" icon="pi pi-save" type="submit" />
      <pv-button
          :label="t('meal-plan.cancel')"
          class="ml-2"
          saverity="secondary"
          typeof="button"
          @click="navigateBack" />
    </form>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}:
      {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-style: italic;
}
</style>
