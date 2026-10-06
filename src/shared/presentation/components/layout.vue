<script setup>
import { useRoute, useRouter } from 'vue-router';
import User1View from "@/shared/presentation/views/user1-view.vue";
import User2View from "@/shared/presentation/views/user2-view.vue";

const route = useRoute();
const router  = useRouter();
</script>

<template>
  <user1-view />
  <!--<user2-view />-->
</template>

<style scoped>
</style>
