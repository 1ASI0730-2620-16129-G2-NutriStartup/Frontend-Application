<script setup>
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import FooterContent from "@/shared/presentation/components/footer-content.vue";
const { t } = useI18n();

const drawer = ref(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
}
const items = [
  {label: 'option.home', to: '/home'},
  {label: 'option.about', to: '/about'},

  {label: 'option.nutrition-plans', to: '/nutrition-nutritionist/nutrition-plans-nutritionist'},
  {label: 'option.meal-plans', to: '/nutrition-nutritionist/meal-plans-nutritionist'},
  {label: 'option.food-recommendations', to: '/nutrition-nutritionist/food-recommendations-nutritionist'},
];
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header class="type-letter absolute top-0 left-0 w-full">
    <pv-toolbar class="fo-color">
      <template #start>
        <pv-button class="p-button-text menu-button" icon="pi pi-bars" @click="toggleDrawer"/>
        <h3>NutriApp Integral</h3>
      </template>
      <template #end>
        <div class="toolbar-options flex-column mr-3">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{ t(item.label) }}</router-link>
          </pv-button>
        </div>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main class="mt-7">
    <router-view/>
  </main>
  <footer-content/>
</template>

<style scoped>
header h3 {
  color: white;
  font-size: 26px;
  margin: 0;
  line-height: 1.2;
}

.fo-color {
  background-color: #64acfc;
}

.toolbar-options :deep(.p-button) {
  background-color: #64acfc;
  border: none;
}

.toolbar-options :deep(a) {
  text-decoration: none;
}

.type-letter {
  letter-spacing: 0.05em;
  font-family: Arial, sans-serif;
}

.menu-button {
  background-color: white;
  color: black;
  border-color: white;
  margin-right: 0.75rem;
}
</style>
