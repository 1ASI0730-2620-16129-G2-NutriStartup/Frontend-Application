<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {useConfirm} from "primevue";
import useNutritionStore from "@/nutrition/application/nutrition.store.js";
import {onMounted, toRefs} from "vue";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const store = useNutritionStore();
const { foodRecommendations, errors, foodRecommendationsLoaded } = toRefs(store);
const { fetchFoodRecommendations , deleteFoodRecommendation } = store;

onMounted(() => {
  if (!store.foodRecommendationsLoaded) {
    fetchFoodRecommendations();
    foodRecommendationsLoaded.value = store.foodRecommendationsLoaded;
  }
});

const navigateToNew = () => {
  router.push({name: "food-recommendations-nutritionist-new"});
};

const navigateToEdit = (id) => {
  router.push({name: 'food-recommendations-nutritionist-edit', params: {id}});
};

const confirmDelete = (foodRecommendation) => {
  confirm.require({
    message: t('food-recommendations.confirm-delete', {name: foodRecommendation.name}),
    header: t('food-recommendations.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteFoodRecommendation(foodRecommendation);
    },
  });
};
</script>

<template>
  <div class="p-4 letter-style">
    <h1>{{ t('food-recommendations.title') }}</h1>
    <pv-button
        v-if="!route.meta.readOnly"
        :label="t('food-recommendations.new')"
        class="mb-3"
        icon="pi pi-plus"
        @click="navigateToNew"/>
    <pv-data-table
        :loading="!foodRecommendationsLoaded"
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        :value="foodRecommendations"
        paginator
        striped-rows
        table-style="min-width: 50rem">
      <pv-column :header="t('food-recommendations.id')" field="id" sortable/>
      <pv-column :header="t('food-recommendations.meal-id')" field="mealPlanId" sortable/>
      <pv-column :header="t('food-recommendations.name')" field="foodName" sortable/>
      <pv-column :header="t('food-recommendations.portion')" field="portion" sortable/>
      <pv-column :header="t('food-recommendations.value')" field="nutritionalValue" sortable/>
      <pv-column
          v-if="!route.meta.readOnly"
          :header="t('food-recommendations.actions')">
        <template #body="slotProps">
          <pv-button icon="pi pi-pencil" rounded text @click="navigateToEdit(slotProps.data.id)"/>
          <pv-button icon="pi pi-trash" rounded severity="danger" text @click="confirmDelete(slotProps.data)"/>
        </template>
      </pv-column>
    </pv-data-table>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
    <pv-confirm-dialog/>
  </div>
</template>

<style scoped>
h1 {
  font-style: italic;
}
</style>
