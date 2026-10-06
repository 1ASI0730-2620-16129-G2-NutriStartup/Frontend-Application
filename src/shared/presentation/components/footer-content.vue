<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer class="fo-color type-letter absolute bottom-0 left-0 w-full border-none mt-4 border-round-md shadow-1 p-3">
    <div class="flex flex-column align-items-center justify-content-center gap-2 text-center text-white">
      <p class="m-0 text-sm font-medium">Copyright &copy; 2026. NutriStartup</p>
      <p class="m-0 text-sm line-height-3">
        {{ t('authoring-phrase.intro') }}
        {{ t('authoring-phrase.use') }}
        {{ t('authoring-phrase.author', { brand: 'NutriStartup' }) }}
      </p>
    </div>
  </footer>
</template>
<style scoped>
.fo-color {
  background-color: #64acfc;
}

.type-letter {
  letter-spacing: 0.05em;
  font-family: Arial, sans-serif;

  font-size: 36px;
  line-height: 2;
}
</style>
