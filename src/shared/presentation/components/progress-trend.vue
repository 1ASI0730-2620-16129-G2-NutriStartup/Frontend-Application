<script setup>
import {computed} from "vue";

const props = defineProps({records: {type: Array, default: () => []}});

const chart = computed(() => {
    if (!props.records.length) return null;
    const width = 720;
    const height = 250;
    const pad = 36;
    const weights = props.records.map(record => Number(record.weight));
    const min = Math.min(...weights) - 1;
    const max = Math.max(...weights) + 1;
    const span = max - min || 1;
    const points = props.records.map((record, index) => ({
        x: pad + index * (width - pad * 2) / Math.max(props.records.length - 1, 1),
        y: height - pad - (record.weight - min) / span * (height - pad * 2),
        record
    }));
    return {width, height, points, polyline: points.map(point => `${point.x},${point.y}`).join(" ")};
});

function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("es-PE", {day: "2-digit", month: "2-digit"});
}
</script>

<template>
  <div v-if="chart" class="chart-scroll">
    <svg :viewBox="`0 0 ${chart.width} ${chart.height}`" class="trend-chart" role="img" aria-label="Evolución del peso">
      <line x1="36" y1="214" x2="684" y2="214" stroke="#cbd5e1" />
      <line x1="36" y1="25" x2="36" y2="214" stroke="#cbd5e1" />
      <polyline :points="chart.polyline" fill="none" stroke="#16a34a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <g v-for="point in chart.points" :key="point.record.id || point.record.date">
        <circle :cx="point.x" :cy="point.y" r="5" fill="white" stroke="#16a34a" stroke-width="3" />
        <text :x="point.x" y="238" text-anchor="middle" class="chart-label">{{ formatDate(point.record.date) }}</text>
        <text :x="point.x" :y="point.y - 12" text-anchor="middle" class="chart-value">{{ Number(point.record.weight).toFixed(1) }}</text>
      </g>
    </svg>
  </div>
  <div v-else class="empty-state">No hay registros para mostrar la evolución del peso.</div>
</template>

<style scoped>
.chart-scroll { width: 100%; overflow-x: auto; }
.trend-chart { width: 100%; min-width: 520px; height: auto; }
.chart-label { fill: #64748b; font-size: 12px; }
.chart-value { fill: #334155; font-size: 12px; font-weight: 600; }
.empty-state { min-height: 180px; display: flex; align-items: center; justify-content: center; color: #64748b; }
</style>
