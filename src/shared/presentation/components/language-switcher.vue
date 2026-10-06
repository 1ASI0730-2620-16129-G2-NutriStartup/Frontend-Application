<script setup>
import {useI18n} from "vue-i18n";
const { locale, availableLocales } = useI18n();
</script>

<template>
  <pv-select-button
      class="button-configuration"
      v-model="locale"
      :options="availableLocales">
    <template #option="slotProps">
      <span>{{ slotProps.option.toUpperCase() }}</span>
    </template>
  </pv-select-button>
</template>

<style scoped>
.button-configuration {
  gap: 0.5rem;
}

.button-configuration :deep(.p-togglebutton),
.button-configuration :deep(.p-togglebutton-checked) {
  background-color: #32cd32;
  border-color: #64acfc;
  color: white;
  padding: 10px 30px;
  border-radius: 9999px !important;
}
</style>
