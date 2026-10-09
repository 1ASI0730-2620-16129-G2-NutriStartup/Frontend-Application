<script setup>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";

const { t } = useI18n();
const activeItem = ref('home');
const items = computed(() => [
  { key: 'home', label: t('dashboard.menu.home'), icon: 'pi pi-home' },
  { key: 'patients', label: t('dashboard.menu.patients'), icon: 'pi pi-users' },
  { key: 'plans', label: t('dashboard.menu.plans'), icon: 'pi pi-calendar' },
  { key: 'progress', label: t('dashboard.menu.progress'), icon: 'pi pi-chart-bar' },

  { key: 'nutrition-plans', label: t('option.nutrition-plans'), icon: 'pi pi-heart' },
  { key: 'meal-plans', label: t('option.meal-plans'), icon: 'pi pi-heart' },
  { key: 'food-recommendations', label: t('option.food-recommendations'), icon: 'pi pi-heart' },
]);
</script>

<template>
  <dashboard-shell
      :workspace-label="t('dashboard.personal-space')"
      :sidebar-label="t('dashboard.personal-section')"
      user-name="Camila Torres"
      :user-plan="t('dashboard.free-plan')"
      :menu-items="items"
      :active-item="activeItem"
      @select-menu="onSelectMenu"
  >
    <router-view />
    <template #topbar-actions>
      <LanguageSwitcher />
    </template>
  </dashboard-shell>
</template>
