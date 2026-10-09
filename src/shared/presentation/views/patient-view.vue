<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DashboardShell from '@/shared/presentation/components/dashboard-shell.vue';
import LanguageSwitcher from '@/shared/presentation/components/language-switcher.vue';
import Home from './home.vue';

const router = useRouter();
const { t } = useI18n();
const menuItems = computed(() => [
  { key: 'home', label: t('option.home'), icon: 'pi pi-home' },
  { key: 'appointments', label: t('option.appointments'), icon: 'pi pi-calendar' },
  { key: 'availability', label: t('option.availability'), icon: 'pi pi-clock' },
]);

function selectMenu(key) {
  const destinations = { home: 'user2', appointments: 'appointments', availability: 'availability' };
  if (destinations[key]) router.push({ name: destinations[key] });
}
</script>

<template>
  <DashboardShell
    :workspace-label="t('workspace.patient')"
    :sidebar-label="t('workspace.navigation')"
    :menu-items="menuItems"
    active-item="home"
    @select-menu="selectMenu"
  >
    <template #topbar-actions><LanguageSwitcher /></template>
    <Home />
  </DashboardShell>
</template>
