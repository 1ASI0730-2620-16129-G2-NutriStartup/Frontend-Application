<script setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="pt-6 p-4 md:p-5">
    <div class="letter-style flex flex-column gap-3">
      <h1 class="text-4xl font-bold text-color">{{ t('about.title') }}</h1>
      <!--Aquí pondré el logo-->
      <p class="m-0 line-height-3 text-color-secondary">{{ t('about.content') }}</p>
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
