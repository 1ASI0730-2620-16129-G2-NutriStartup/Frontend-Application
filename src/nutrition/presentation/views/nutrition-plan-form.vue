<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import useNutritionStore from "../../application/nutrition.store.js";
import {computed, onMounted, ref} from "vue";
import {NutritionPlan} from "../../domain/model/nutrition-plan.entity.js";

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

const isEdit = computed(() => {
  return !!route.params.id;
});

onMounted(() => {
  console.log("Mounted nutrition plan form");
  console.log(route.params.id);
  if (isEdit.value) {
    const nutritionPlan = getNutritionPlanById(route.params.id);
    if (nutritionPlan) {
      form.value.name = nutritionPlan.name;
      form.value.description = nutritionPlan.description;
      form.value.objective = nutritionPlan.objective;
      form.value.startDate = nutritionPlan.startDate.toISOString().slice(0, 10);
      form.value.endDate = nutritionPlan.endDate.toISOString().slice(0, 10);
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
    id: isEdit.value ? Number(route.params.id) : null,
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
  router.push({ name: 'nutrition-plans-nutritionist' });
};
</script>

<template>
  <div class="p-4 letter-style">
    <h1>{{ isEdit ? t('nutrition-plan.edit-title') : t('nutrition-plan.new-title') }}</h1>
    <form @submit.prevent="saveNutritionPlan">
      <div class="field mb-3">
        <label for="name">{{ t('nutrition-plans.name') }}</label>
        <pv-input-text id="name" v-model="form.name" class="w-full" required />
        <label for="description">{{ t('nutrition-plans.description') }}</label>
        <pv-input-text id="description" v-model="form.description" class="w-full" required />
        <label for="objective">{{ t('nutrition-plans.objective') }}</label>
        <pv-input-text id="objective" v-model="form.objective" class="w-full" required />
        <div class="field mb-3">
          <label for="startDate">Start Date</label>
          <input
              id="startDate"
              v-model="form.startDate"
              class="w-full"
              type="date"
              required
          />
        </div>
        <div class="field mb-3">
          <label for="endDate">End Date</label>
          <input
              id="endDate"
              v-model="form.endDate"
              class="w-full"
              type="date"
              required
          />
        </div>
        <label for="status">{{ t('nutrition-plans.status') }}</label>
        <pv-input-text id="status" v-model="form.status" class="w-full" required />
      </div>
      <pv-button :label="t('nutrition-plan.save')" icon="pi pi-save" type="submit" />
      <pv-button
          :label="t('nutrition-plan.cancel')"
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
