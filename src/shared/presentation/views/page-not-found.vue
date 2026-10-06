<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const unavailableRoute = route.path;
const { t } = useI18n();
</script>

<template>
  <section class="pt-6 p-4 md:p-5">
    <div class="letter-style flex flex-column gap-3">
      <h1 class="text-4xl font-bold text-color">{{ t('page-not-found.title') }}</h1>
      <p class="m-0 line-height-3 text-color-secondary">
        {{ t('page-not-found.content', { 'unavailable-route': unavailableRoute }) }}
      </p>
      <router-link to="/home" class="text-primary font-medium">
        {{ t('page-not-found.go-home') }}
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.letter-style {
  letter-spacing: 0.05em;
  font-family: Arial, sans-serif;
}

h1 {
  font-style: italic;
}
</style>
