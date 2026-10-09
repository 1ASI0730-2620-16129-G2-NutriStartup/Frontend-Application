<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";

const { t } = useI18n();
const activeItem = ref('home');
const items = [
  {label: 'option.home', to: '/home'},

  {label: 'option.nutrition-plans', to: '/nutrition-patient/nutrition-plans-patient'},
  {label: 'option.meal-plans', to: '/nutrition-patient/meal-plans-patient'},
  {label: 'option.food-recommendations', to: '/nutrition-patient/food-recommendations-patient'},
];
</script>

<template>
  <dashboard-shell
      :workspace-label="t('dashboard.personal-space')"
      :sidebar-label="t('dashboard.personal-section')"
      user-name="Camila Torres"
      :user-plan="t('dashboard.free-plan')"
      :menu-items="items"
      :active-item="activeItem"
      @select-menu="activeItem = $event"
  >
    <template #topbar-actions>
      <LanguageSwitcher />
    </template>
  </dashboard-shell>
</template>
