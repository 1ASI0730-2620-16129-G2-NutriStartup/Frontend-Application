<script setup>
import { useRouter } from 'vue-router';
import AvailabilityView from '../components/availability-view.vue';
import AppointmentWorkspace from '../components/appointment-workspace.vue';

const router = useRouter();

function onSelected(id) {
  router.push({ name: 'appointment-new', query: { availabilityId: id } });
}
</script>
<template><AppointmentWorkspace role="patient"><availability-view @selected="onSelected" /></AppointmentWorkspace></template>
