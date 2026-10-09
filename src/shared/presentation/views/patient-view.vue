<script setup>
import { computed, ref } from "vue";
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";
import AuthenticationSection from "@/iam/presentation/components/authentication-section.vue";
import UserProfileManagementView from '@/user-profile-management/presentation/components/user-profile-management-view.vue';
import AppointmentList from '@/appointment-management/presentation/components/appointment-list.vue';
import AvailabilityView from '@/appointment-management/presentation/components/availability-view.vue';
import { useCurrentUserStore } from '@/shared/application/current-user.store.js';

const { t } = useI18n();
const router = useRouter();
const currentUserStore = useCurrentUserStore();
const activeItem = ref('home');
const items = computed(() => [
  { key: 'home', label: t('dashboard.menu.home'), icon: 'pi pi-home' },
  { key: 'plan', label: t('dashboard.menu.plan'), icon: 'pi pi-calendar' },
  { key: 'meals', label: t('dashboard.menu.meals'), icon: 'pi pi-apple' },
  { key: 'progress', label: t('dashboard.menu.progress'), icon: 'pi pi-chart-bar' },
  { key: 'nutritionist', label: t('dashboard.menu.nutritionist'), icon: 'pi pi-user' },
  { key: 'appointments', label: t('option.appointments'), icon: 'pi pi-calendar' },
  { key: 'availability', label: t('option.availability'), icon: 'pi pi-clock' },
  { key: 'profile', label: t('profile.menu'), icon: 'pi pi-id-card' },
  /*Aquí deben agregar más opciones*/
]);

function selectMenu(key) {
  activeItem.value = key;
}

function selectAvailability(id) {
  router.push({ name: 'appointment-new', query: { availabilityId: id } });
}
</script>

<template>
  <dashboard-shell
    :workspace-label="t('dashboard.personal-space')"
    :sidebar-label="t('dashboard.personal-section')"
    :user-name="currentUserStore.user?.name || t('dashboard.patient-name')"
    :user-plan="t('dashboard.free-plan')"
    :menu-items="items"
    :active-item="activeItem"
    @select-menu="selectMenu"
  >
    <UserProfileManagementView v-if="activeItem === 'profile'" role="patient" />
    <AppointmentList v-else-if="activeItem === 'appointments'" />
    <AvailabilityView v-else-if="activeItem === 'availability'" @selected="selectAvailability" />
    <template #topbar-actions>
      <AuthenticationSection />
      <LanguageSwitcher />
    </template>
  </dashboard-shell>
</template>


