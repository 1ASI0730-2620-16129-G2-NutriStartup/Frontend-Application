<script setup>
import { useI18n } from 'vue-i18n';

const { locale, availableLocales } = useI18n();

function changeLocale(language) {
  locale.value = language;
}
</script>

<template>
  <div class="language-switcher" role="group" aria-label="Idioma / Language">
    <button
      v-for="language in availableLocales"
      :key="language"
      class="language-button"
      :class="{ active: locale === language }"
      type="button"
      :aria-pressed="locale === language"
      @click="changeLocale(language)"
    >
      {{ language.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
}

.language-button {
  padding: 9px 16px;
  border: 1px solid #39bca3;
  border-radius: 4px;
  color: #fff;
  background: #39bca3;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;
}

.language-button:hover {
  border-color: #2da990;
  background: #2da990;
}

.language-button:focus-visible {
  outline: 2px solid #176b53;
  outline-offset: 2px;
}
</style>
