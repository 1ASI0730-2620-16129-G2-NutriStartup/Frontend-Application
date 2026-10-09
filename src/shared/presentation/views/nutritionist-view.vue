<script setup>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const activeItem = ref('nutrition-plans');
const routeToMenuItem = {
  'nutrition-plans-nutritionist': 'nutrition-plans',
  'meal-plans-nutritionist': 'meal-plans',
  'food-recommendations-nutritionist': 'food-recommendations',
};

const items = computed(() => [
  { key: 'home', label: t('dashboard.menu.home'), icon: 'pi pi-home' },
  { key: 'patients', label: t('dashboard.menu.patients'), icon: 'pi pi-users' },
  { key: 'plans', label: t('dashboard.menu.plans'), icon: 'pi pi-calendar' },
  { key: 'progress', label: t('dashboard.menu.progress'), icon: 'pi pi-chart-bar' },

  { key: 'nutrition-plans', label: t('option.nutrition-plans'), icon: 'pi pi-heart' },
  { key: 'meal-plans', label: t('option.meal-plans'), icon: 'pi pi-heart' },
  { key: 'food-recommendations', label: t('option.food-recommendations'), icon: 'pi pi-heart' },
]);

watch(
  () => route.name,
  (routeName) => {
    activeItem.value = routeToMenuItem[routeName] ?? 'home';
  },
  { immediate: true }
);

const onSelectMenu = (itemKey) => {
  activeItem.value = itemKey;

  const routeNameMap = {
    'nutrition-plans': 'nutrition-plans-nutritionist',
    'meal-plans': 'meal-plans-nutritionist',
    'food-recommendations': 'food-recommendations-nutritionist',
  };

  const destination = routeNameMap[itemKey];
  if (destination) {
    router.push({ name: destination });
  }
};
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
