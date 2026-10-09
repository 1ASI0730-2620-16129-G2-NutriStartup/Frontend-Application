<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/shared/presentation/components/language-switcher.vue";
import DashboardShell from "@/shared/presentation/components/dashboard-shell.vue";
import AuthenticationSection from "@/iam/presentation/components/authentication-section.vue";
import UserProfileManagementView from '@/user-profile-management/presentation/components/user-profile-management-view.vue';
import AppointmentList from '@/appointment-management/presentation/components/appointment-list.vue';
import AvailabilityView from '@/appointment-management/presentation/components/availability-view.vue';
import { useCurrentUserStore } from '@/shared/application/current-user.store.js';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const currentUserStore = useCurrentUserStore();
const activeItem = ref(route.meta.menuKey || 'home');
const items = computed(() => [
  { key: 'home', label: t('dashboard.menu.home'), icon: 'pi pi-home' },
  { key: 'nutrition-plans', label: t('option.nutrition-plans'), icon: 'pi pi-heart' },
  { key: 'meal-plans', label: t('option.meal-plans'), icon: 'pi pi-heart' },
  { key: 'food-recommendations', label: t('option.food-recommendations'), icon: 'pi pi-heart' },
  { key: 'appointments', label: t('option.appointments'), icon: 'pi pi-calendar' },
  { key: 'availability', label: t('option.availability'), icon: 'pi pi-clock' },
  { key: 'profile', label: t('profile.menu'), icon: 'pi pi-id-card' },
]);

watch(() => route.meta.menuKey, (menuKey) => {
  if (menuKey) activeItem.value = menuKey;
});

function selectMenu(key) {
  activeItem.value = key;
  const destinations = {
    home: 'user1-home',
    'nutrition-plans': 'nutrition-plans-nutritionist',
    'meal-plans': 'meal-plans-nutritionist',
    'food-recommendations': 'food-recommendations-nutritionist',
  };
  if (destinations[key]) router.push({ name: destinations[key] });
}

function selectAvailability(id) {
  router.push({ name: 'appointment-new', query: { availabilityId: id } });
}
</script>

<template>
  <dashboard-shell
      :workspace-label="t('dashboard.professional-space')"
      :sidebar-label="t('dashboard.professional-section')"
      :user-name="currentUserStore.user?.name || t('dashboard.nutritionist-name')"
      :user-plan="t('dashboard.professional-account')"
      :menu-items="items"
      :active-item="activeItem"
      @select-menu="selectMenu"
  >
    <UserProfileManagementView v-if="activeItem === 'profile'" role="nutritionist" />
    <AppointmentList v-else-if="activeItem === 'appointments'" />
    <AvailabilityView v-else-if="activeItem === 'availability'" @selected="selectAvailability" />
    <router-view v-else />
    <template #topbar-actions>
      <AuthenticationSection />
      <LanguageSwitcher />
    </template>
  </dashboard-shell>
</template>

