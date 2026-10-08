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
const { mealPlans, errors, mealPlansLoaded } = toRefs(store);
const { fetchMealPlans , deleteMealPlan } = store;

onMounted(() => {
  if (!store.mealPlansLoaded) {
    fetchMealPlans();
    mealPlansLoaded.value = store.mealPlansLoaded;
  }
});

const navigateToNew = () => {
  router.push({name: "meal-plans-nutritionist-new"});
};

const navigateToEdit = (id) => {
  router.push({name: 'meal-plan-nutritionist-edit', params: {id}});
};

const confirmDelete = (mealPlan) => {
  confirm.require({
    message: t('meal-plans.confirm-delete', {name: mealPlan.name}),
    header: t('meal-plans.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteMealPlan(mealPlan);
    },
  });
};
</script>

<template>
  <div class="p-4 letter-style">
    <h1>{{ t('meal-plans.title') }}</h1>
    <pv-button
        v-if="!route.meta.readOnly"
        :label="t('meal-plans.new')"
        class="mb-3"
        icon="pi pi-plus"
        @click="navigateToNew"/>
    <pv-data-table
        :loading="!mealPlansLoaded"
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        :value="mealPlans"
        paginator
        striped-rows
        table-style="min-width: 50rem">
      <pv-column :header="t('meal-plans.id')" field="id" sortable/>
      <pv-column :header="t('meal-plans.nutrition-id')" field="nutritionPlanId" sortable/>
      <pv-column :header="t('meal-plans.type')" field="mealType" sortable/>
      <pv-column :header="t('meal-plans.description')" field="description" sortable/>
      <pv-column :header="t('meal-plans.calories')" field="calories" sortable/>
      <pv-column
          v-if="!route.meta.readOnly"
          :header="t('meal-plans.actions')">
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
