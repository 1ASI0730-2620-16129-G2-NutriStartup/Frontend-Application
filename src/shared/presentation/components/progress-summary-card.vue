<script setup>
defineProps({
    title: {type: String, required: true},
    value: {type: [String, Number], required: true},
    detail: {type: String, default: ""},
    icon: {type: String, default: "pi pi-chart-line"}
});
</script>

<template>
  <pv-card class="summary-card h-full">
    <template #content>
      <div class="flex align-items-center justify-content-between gap-3">
        <div>
          <p class="summary-title m-0 mb-2">{{ title }}</p>
          <p class="summary-value m-0">{{ value }}</p>
          <p class="summary-detail m-0 mt-2">{{ detail }}</p>
        </div>
        <div class="summary-icon flex align-items-center justify-content-center border-circle">
          <i :class="icon" class="text-xl"></i>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.summary-card { border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06); }
.summary-title, .summary-detail { color: #64748b; }
.summary-title { font-size: .9rem; }
.summary-detail { font-size: .8rem; }
.summary-value { color: #1e293b; font-size: 1.7rem; font-weight: 700; }
.summary-icon { width: 2.75rem; height: 2.75rem; background: #eaf8ef; color: #16a34a; }
</style>
