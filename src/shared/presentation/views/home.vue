<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="pt-6 p-4 md:p-5">
    <div class="letter-style flex flex-column gap-3">
      <h1 class="text-4xl font-bold text-color">{{ t('home.title') }}</h1>
      <p class="m-0 line-height-3 text-color-secondary">{{ t('home.content') }}</p>
    </div>
  </section>
</template>

<style scoped>
.letter-style {
  letter-spacing: 0.05em;
  font-family: inherit;
}

h1 {
  font-style: italic;
}
</style>
