<script setup>
import { computed } from 'vue';

const props = defineProps({
  workspaceLabel: { type: String, required: true },
  sidebarLabel: { type: String, required: true },
  menuItems: { type: Array, required: true },
  activeItem: { type: String, default: 'home' },
});

const emit = defineEmits(['select-menu']);
const activeLabel = computed(() => props.menuItems.find((item) => item.key === props.activeItem)?.label ?? '');
</script>

<template>
  <div class="dashboard-shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark"><i class="pi pi-sparkles" aria-hidden="true" /></span>
        <span class="brand-name">NutriApp<small>INTEGRAL</small></span>
      </div>
      <p class="sidebar-label">{{ sidebarLabel }}</p>
      <nav class="side-navigation" aria-label="Navegación principal">
        <button
          v-for="item in menuItems"
          :key="item.key"
          type="button"
          class="navigation-item"
          :class="{ active: activeItem === item.key }"
          :aria-current="activeItem === item.key ? 'page' : undefined"
          @click="emit('select-menu', item.key)"
        >
          <i :class="item.icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </aside>
    <section class="main-panel">
      <header class="topbar">
        <div class="breadcrumb"><span>{{ workspaceLabel }}</span><i class="pi pi-angle-right" /><b>{{ activeLabel }}</b></div>
        <slot name="topbar-actions" />
      </header>
      <main class="workspace"><slot /></main>
    </section>
  </div>
</template>

<style scoped>
:global(html), :global(body), :global(#app) { min-width: 320px; min-height: 100%; margin: 0; }
:global(html) { color-scheme: light; }
.dashboard-shell { --sidebar-green: #104b36; --deep-green: #174b37; --soft-green: #e6f1e9; --pale-lime: #d6e9a5; display: flex; min-height: 100vh; color: #334155; background: #f4f7f2; font-family: system-ui, sans-serif; }
.sidebar { position: sticky; top: 0; display: flex; flex: 0 0 252px; flex-direction: column; box-sizing: border-box; width: 252px; height: 100vh; padding: 24px 16px; color: #f1f6ec; background: var(--sidebar-green); }
.brand { display: flex; align-items: center; gap: 9px; min-height: 40px; margin-bottom: 32px; }
.brand-mark { display: grid; width: 38px; height: 38px; place-items: center; border-radius: 50%; color: var(--sidebar-green); background: var(--pale-lime); font-size: 18px; }
.brand-name { font-size: 16px; font-weight: 700; line-height: 1; }
.brand-name small { display: block; margin-top: 4px; font-size: 7px; font-weight: 600; letter-spacing: .1em; }
.sidebar-label { margin: 0 0 13px; color: #d1e39d; font-size: 9px; font-weight: 700; letter-spacing: .12em; }
.side-navigation { display: grid; gap: 6px; }
.navigation-item { display: flex; align-items: center; gap: 13px; width: 100%; min-height: 42px; padding: 0 12px; border: 0; border-radius: 10px; color: #edf4e8; background: transparent; font: inherit; font-size: 13px; text-align: left; cursor: pointer; }
.navigation-item > i { width: 15px; color: var(--pale-lime); font-size: 14px; }
.navigation-item.active { color: var(--deep-green); background: var(--soft-green); font-weight: 700; }
.navigation-item.active > i { color: var(--deep-green); }
.main-panel { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.topbar { display: flex; align-items: center; justify-content: space-between; box-sizing: border-box; min-height: 78px; padding: 0 32px; border-bottom: 1px solid #e9eee8; background: #fff; }
.breadcrumb { display: flex; align-items: center; gap: 8px; color: #73847a; font-size: 12px; }
.breadcrumb > i { font-size: 10px; }
.breadcrumb b { color: #355144; font-weight: 600; }
.workspace { flex: 1; min-height: calc(100vh - 78px); background: #f4f7f2; }
.workspace :deep(h1), .workspace :deep(h2), .workspace :deep(h3) { color: #334155; }
@media (max-width: 760px) { .sidebar { flex-basis: 76px; width: 76px; align-items: center; padding: 18px 8px; } .brand { margin-bottom: 24px; } .brand-name, .sidebar-label, .navigation-item span { display: none; } .side-navigation { width: 100%; } .navigation-item { justify-content: center; padding: 0; } .navigation-item > i { text-align: center; } .topbar { min-height: 64px; padding: 0 16px; } }
</style>
