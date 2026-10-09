<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DashboardShell from '@/shared/presentation/components/dashboard-shell.vue';
import LanguageSwitcher from '@/shared/presentation/components/language-switcher.vue';
import AuthenticationSection from '@/iam/presentation/components/authentication-section.vue';
import UserProfileManagementView from '@/user-profile-management/presentation/components/user-profile-management-view.vue';
import { useCurrentUserStore } from '@/shared/application/current-user.store.js';

const props = defineProps({ role: { type: String, default: '' } });
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const currentUserStore = useCurrentUserStore();
const showProfile = ref(false);
const workspaceRole = computed(() => currentUserStore.user?.role || props.role || 'patient');
const workspaceLabel = computed(() => t(`workspace.${workspaceRole.value}`));
const menuItems = computed(() => [
  { key: 'home', label: t('dashboard.menu.home'), icon: 'pi pi-home' },
  { key: 'appointments', label: t('option.appointments'), icon: 'pi pi-calendar' },
  { key: 'availability', label: t('option.availability'), icon: 'pi pi-clock' },
  { key: 'profile', label: t('profile.menu'), icon: 'pi pi-id-card' },
]);
const activeItem = computed(() => {
  if (showProfile.value) return 'profile';
  return route.name === 'availability'
    ? 'availability'
    : ['user1-home', 'user2-home'].includes(route.name) ? 'home' : 'appointments';
});

function selectMenu(key) {
  if (key === 'profile') {
    showProfile.value = true;
    return;
  }
  showProfile.value = false;
  const destinations = { home: workspaceRole.value === 'nutritionist' ? 'user1-home' : 'user2-home', appointments: 'appointments', availability: 'availability' };
  if (destinations[key]) router.push({ name: destinations[key] });
}
</script>

<template>
  <DashboardShell
    :workspace-label="workspaceLabel"
    :sidebar-label="t('workspace.navigation')"
    :user-name="currentUserStore.user?.name || t(workspaceRole === 'nutritionist' ? 'dashboard.nutritionist-name' : 'dashboard.patient-name')"
    :user-plan="t(workspaceRole === 'nutritionist' ? 'dashboard.professional-account' : 'dashboard.free-plan')"
    :menu-items="menuItems"
    :active-item="activeItem"
    @select-menu="selectMenu"
  >
    <template #topbar-actions>
      <AuthenticationSection />
      <LanguageSwitcher />
    </template>
    <UserProfileManagementView v-if="showProfile" :role="workspaceRole" />
    <slot v-else />
  </DashboardShell>
</template>
