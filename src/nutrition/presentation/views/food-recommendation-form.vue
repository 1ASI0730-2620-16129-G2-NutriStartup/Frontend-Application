<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import useNutritionStore from "@/nutrition/application/nutrition.store.js";
import {computed, onMounted, ref} from "vue";
import {FoodRecommendation} from "@/nutrition/domain/model/food-recommendation.entity.js";
import {MealPlan} from "@/nutrition/domain/model/meal-plan.entity.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = useNutritionStore();
const {errors, foodRecommendations, addFoodRecommendation, updateFoodRecommendation, fetchFoodRecommendations} = store;

const form = ref({
  mealPlanId: null, foodName: '',
  portion: '', nutritionalValue: ''
});

const isEdit = computed(() => {
  return !!route.params.id;
});

onMounted(() => {
  console.log("Mounted food recommendation form");
  console.log(route.params.id);
  if (isEdit.value) {
    const foodRecommendation = getFoodRecommendation(route.params.id);
    if (foodRecommendation) {
      form.value.mealPlanId = foodRecommendation.mealPlanId;
      form.value.foodName = foodRecommendation.foodName;
      form.value.portion = foodRecommendation.portion;
      form.value.nutritionalValue = foodRecommendation.nutritionalValue;
    } else {
      router.push({ name: 'food-recommendations' });
    }
  }
});

function getFoodRecommendation(id) {
  return store.getFoodRecommendationById(id);
}

const saveFoodRecommendation = () => {
  const foodRecommendation = new FoodRecommendation({
    id: isEdit.value ? Number(route.params.id) : null,
    mealPlanId: form.value.mealPlanId,
    foodName: form.value.foodName,
    portion: form.value.portion,
    nutritionalValue: form.value.nutritionalValue,
  });
  if (isEdit.value) {
    updateFoodRecommendation(foodRecommendation);
  } else {
    addFoodRecommendation(foodRecommendation);
  }
  navigateBack();
};

const navigateBack = () => {
  router.push({ name: 'food-recommendations-nutritionist' });
};
</script>

<template>
  <div class="p-4 letter-style">
    <h1>{{ isEdit ? t('food-recommendation.edit-title') : t('food-recommendation.new-title') }}</h1>
    <form @submit.prevent="saveFoodRecommendation">
      <div class="field mb-3">
        <label for="mealPlanId">{{ t('meal-plans.meal-id') }}</label>
        <pv-input-text id="mealPlanId" v-model="form.mealPlanId" class="w-full" required />
        <label for="foodName">{{ t('meal-plans.name') }}</label>
        <pv-input-text id="foodName" v-model="form.foodName" class="w-full" required />
        <label for="portion">{{ t('meal-plans.portion') }}</label>
        <pv-input-text id="portion" v-model="form.portion" class="w-full" required />
        <label for="nutritionalValue">{{ t('meal-plans.value') }}</label>
        <pv-input-text id="nutritionalValue" v-model="form.nutritionalValue" class="w-full" required />
      </div>
      <pv-button :label="t('food-recommendation.save')" icon="pi pi-save" type="submit" />
      <pv-button
          :label="t('food-recommendation.cancel')"
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
