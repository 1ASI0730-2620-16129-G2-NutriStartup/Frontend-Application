<script setup>
import { useRoute, useRouter } from 'vue-router';
import NutritionistView from "@/shared/presentation/views/nutritionist-view.vue";
import PatientView from "@/shared/presentation/views/patient-view.vue";

const route = useRoute();
const router  = useRouter();
</script>

<template>
  <NutritionistView />
</template>

<style scoped>
</style>
