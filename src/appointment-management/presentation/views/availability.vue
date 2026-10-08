<script setup>
import { useRouter } from 'vue-router';
import AvailabilityView from '../components/availability-view.vue';

const router = useRouter();

function onSelected(id) {
  router.push({ name: 'appointment-new', query: { availabilityId: id } });
}
</script>
<template><availability-view @selected="onSelected" /></template>