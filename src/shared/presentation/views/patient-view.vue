<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";

const { t } = useI18n();
const activeItem = ref('home');
const items = computed(() => [
  { key: 'home', label: t('dashboard.menu.home'), icon: 'pi pi-home' },
  { key: 'plan', label: t('dashboard.menu.plan'), icon: 'pi pi-calendar' },
  { key: 'meals', label: t('dashboard.menu.meals'), icon: 'pi pi-apple' },
  { key: 'progress', label: t('dashboard.menu.progress'), icon: 'pi pi-chart-bar' },
  { key: 'nutritionist', label: t('dashboard.menu.nutritionist'), icon: 'pi pi-user' },
  /*Aquí deben agregar más opciones*/
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
    @select-menu="activeItem = $event"
  >
    <template #topbar-actions>
      <LanguageSwitcher />
    </template>
  </dashboard-shell>
</template>

