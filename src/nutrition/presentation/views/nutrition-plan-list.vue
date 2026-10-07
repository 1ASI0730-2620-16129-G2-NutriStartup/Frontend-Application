<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useConfirm} from "primevue";
import useNutritionStore from "@/nutrition/application/nutrition.store.js";
import {onMounted, toRefs} from "vue";

const {t} = useI18n();
const router = useRouter();
const confirm = useConfirm();
const store = useNutritionStore();
const {nutritionPlans, errors, nutritionPlansLoaded } = toRefs(store);
const { fetchNutritionPlans , deleteNutritionPlan } = store;

onMounted(() => {
  if (!store.nutritionPlansLoaded) {
    fetchNutritionPlans();
    nutritionPlansLoaded.value = store.nutritionPlansLoaded;
  }
});

const navigateToNew = () => {
  router.push({name: 'nutrition-plan-new'});
};

const navigateToEdit = (id) => {
  router.push({name: 'nutrition-plan-edit', params: {id}});
};

const confirmDelete = (nutritionPlan) => {
  confirm.require({
    message: t('nutrition-plans.confirm-delete', {name: nutritionPlan.name}),
    header: t('nutrition-plans.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteNutritionPlan(nutritionPlan);
    },
  });
};
</script>

<template>
  <div class="p-4">
    <h1>{{ t('nutrition-plans.title') }}</h1>
    <pv-button :label="t('nutrition-plans.new')" class="mb-3" icon="pi pi-plus" @click="navigateToNew"/>
    <pv-data-table
        :loading="!nutritionPlansLoaded"
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        :value="nutritionPlans"
        paginator
        striped-rows
        table-style="min-width: 50rem">
      <pv-column :header="t('nutrition-plans.id')" field="id" sortable/>
      <pv-column :header="t('nutrition-plans.name')" field="name" sortable/>
      <pv-column :header="t('nutrition-plans.description')" field="description" sortable/>
      <pv-column :header="t('nutrition-plans.objective')" field="objective" sortable/>
      <pv-column :header="t('nutrition-plans.status')" field="status" sortable/>
      <pv-column :header="t('nutrition-plans.actions')">
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

</style>
