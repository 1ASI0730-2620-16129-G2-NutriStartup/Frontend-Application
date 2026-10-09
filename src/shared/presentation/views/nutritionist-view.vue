<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const activeItem = computed(() => route.meta.menuKey ?? 'home');

const items = computed(() => [
  { key: 'home', label: t('dashboard.menu.home'), icon: 'pi pi-home' },
  { key: 'nutrition-plans', label: t('option.nutrition-plans'), icon: 'pi pi-heart' },
  { key: 'meal-plans', label: t('option.meal-plans'), icon: 'pi pi-heart' },
  { key: 'food-recommendations', label: t('option.food-recommendations'), icon: 'pi pi-heart' },
]);

function onSelectMenu(key) {
  const destinations = {
    home: 'user1-home',
    'nutrition-plans': 'nutrition-plans-nutritionist',
    'meal-plans': 'meal-plans-nutritionist',
    'food-recommendations': 'food-recommendations-nutritionist',
  };
  if (destinations[key]) router.push({ name: destinations[key] });
}
</script>

<template>
  <dashboard-shell
      :workspace-label="t('dashboard.professional-space')"
      :sidebar-label="t('dashboard.professional-section')"
      user-name="Nutricionista"
      :user-plan="t('dashboard.professional-account')"
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
