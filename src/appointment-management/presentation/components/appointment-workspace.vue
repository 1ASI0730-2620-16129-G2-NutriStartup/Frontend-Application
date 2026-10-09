<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DashboardShell from '@/shared/presentation/components/dashboard-shell.vue';
import LanguageSwitcher from '@/shared/presentation/components/language-switcher.vue';

const props = defineProps({ role: { type: String, default: 'patient' } });
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const workspaceLabel = computed(() => t(`workspace.${props.role}`));
const menuItems = computed(() => [
  { key: 'home', label: t('option.home'), icon: 'pi pi-home' },
  { key: 'appointments', label: t('option.appointments'), icon: 'pi pi-calendar' },
  { key: 'availability', label: t('option.availability'), icon: 'pi pi-clock' },
]);
const activeItem = computed(() => route.name === 'availability' ? 'availability' : 'appointments');

function selectMenu(key) {
  const destinations = { home: props.role === 'nutritionist' ? 'user1' : 'user2', appointments: 'appointments', availability: 'availability' };
  if (destinations[key]) router.push({ name: destinations[key] });
}
</script>

<template>
  <DashboardShell
    :workspace-label="workspaceLabel"
    :sidebar-label="t('workspace.navigation')"
    :menu-items="menuItems"
    :active-item="activeItem"
    @select-menu="selectMenu"
  >
    <template #topbar-actions><LanguageSwitcher /></template>
    <slot />
  </DashboardShell>
</template>
