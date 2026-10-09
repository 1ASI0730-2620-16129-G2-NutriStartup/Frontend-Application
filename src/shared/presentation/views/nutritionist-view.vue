<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";

const { t } = useI18n();
const activeItem = ref('home');
const items = [
  {label: 'option.home', to: '/home'},

  {label: 'option.nutrition-plans', to: '/nutrition-nutritionist/nutrition-plans-nutritionist'},
  {label: 'option.meal-plans', to: '/nutrition-nutritionist/meal-plans-nutritionist'},
  {label: 'option.food-recommendations', to: '/nutrition-nutritionist/food-recommendations-nutritionist'},
];
</script>

<template>
  <dashboard-shell
      :workspace-label="t('dashboard.professional-space')"
      :sidebar-label="t('dashboard.professional-section')"
      user-name="Nutricionista"
      :user-plan="t('dashboard.professional-account')"
      :menu-items="items"
      :active-item="activeItem"
      @select-menu="activeItem = $event"
  >
    <template #topbar-actions>
      <LanguageSwitcher />
    </template>
  </dashboard-shell>
</template>
