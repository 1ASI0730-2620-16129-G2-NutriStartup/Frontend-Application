<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";
import UserProfileManagementView from '@/user-profile-management/presentation/components/user-profile-management-view.vue';
import { useCurrentUserStore } from '@/shared/application/current-user.store.js';

const { t } = useI18n();
const currentUserStore = useCurrentUserStore();
const activeItem = ref('home');
const items = computed(() => [
  { key: 'home', label: t('dashboard.menu.home'), icon: 'pi pi-home' },
  { key: 'patients', label: t('dashboard.menu.patients'), icon: 'pi pi-users' },
  { key: 'plans', label: t('dashboard.menu.plans'), icon: 'pi pi-calendar' },
  { key: 'progress', label: t('dashboard.menu.progress'), icon: 'pi pi-chart-bar' },
  { key: 'profile', label: t('profile.menu'), icon: 'pi pi-id-card' },
  /*Aquí deben agregar más opciones*/
]);
</script>

<template>
  <dashboard-shell
    :workspace-label="t('dashboard.professional-space')"
    :sidebar-label="t('dashboard.professional-section')"
    :user-name="currentUserStore.user?.name || t('dashboard.nutritionist-name')"
    :user-plan="t('dashboard.professional-account')"
    :menu-items="items"
    :active-item="activeItem"
    @select-menu="activeItem = $event"
  >
    <UserProfileManagementView v-if="activeItem === 'profile'" role="nutritionist" />
    <template #topbar-actions>
      <LanguageSwitcher />
    </template>
  </dashboard-shell>
</template>


