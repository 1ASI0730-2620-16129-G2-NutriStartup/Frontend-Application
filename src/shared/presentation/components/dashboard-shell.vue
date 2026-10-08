<script setup>
import { computed } from 'vue';

const props = defineProps({
  workspaceLabel: { type: String, default: 'Mi espacio personal' },
  sidebarLabel: { type: String, default: 'MI BIENESTAR' },
  userName: { type: String, default: 'Camila Torres' },
  userPlan: { type: String, default: 'Plan gratuito' },
  menuItems: {
    type: Array,
    default: () => [
      { key: 'home', label: 'Inicio', icon: 'pi pi-home' },
      { key: 'plan', label: 'Mi plan', icon: 'pi pi-calendar' },
      { key: 'meals', label: 'Comidas', icon: 'pi pi-apple' },
      { key: 'progress', label: 'Progreso', icon: 'pi pi-chart-bar' },
      { key: 'nutritionist', label: 'Nutricionista', icon: 'pi pi-user' },
    ],
  },
  activeItem: { type: String, default: 'home' },
});

const emit = defineEmits(['select-menu']);
const initials = computed(() => props.userName.split(' ').map((name) => name[0]).slice(0, 2).join('').toUpperCase());
const activeLabel = computed(() => props.menuItems.find((item) => item.key === props.activeItem)?.label ?? '');
const today = computed(() => {
  const date = new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return date.charAt(0).toUpperCase() + date.slice(1);
});
</script>

<template>
  <div class="dashboard-shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark"><i class="pi pi-sparkles" /></span>
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

      <div class="sidebar-bottom">
        <button class="help-card" type="button">
          <i class="pi pi-heart" aria-hidden="true" />
          <span class="help-title">A tu ritmo, cada día</span>
          <span class="help-caption">Centro de ayuda <i class="pi pi-arrow-up-right" /></span>
        </button>
        <div class="profile">
          <span class="avatar">{{ initials }}</span>
          <span class="profile-copy"><b>{{ userName }}</b><small>{{ userPlan }}</small></span>
        </div>
      </div>
    </aside>

    <section class="main-panel">
      <header class="topbar">
        <div class="breadcrumb"><span>{{ workspaceLabel }}</span><i class="pi pi-angle-right" /><b>{{ activeLabel }}</b></div>
        <div class="topbar-actions">
          <span class="today">{{ today }}</span>
          <slot name="topbar-actions" />
          <button class="icon-button notification" type="button" aria-label="Notificaciones">
            <i class="pi pi-bell" />
          </button>
          <span class="avatar top-avatar">{{ initials }}</span>
        </div>
      </header>
      <main class="workspace"><slot /></main>
    </section>
  </div>
</template>

<style scoped>
:global(body),
:global(html) {
  min-height: 100%;
  margin: 0;
}

.dashboard-shell {
  --sidebar-green: #104b36;
  --deep-green: #174b37;
  --soft-green: #e6f1e9;
  --pale-lime: #d6e9a5;
  display: flex;
  min-height: 100vh;
  color: #294237;
  background: #f4f7f2;
  font-family: Arial, sans-serif;
}

.sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex: 0 0 252px;
  flex-direction: column;
  box-sizing: border-box;
  width: 252px;
  height: 100vh;
  padding: 24px 16px 16px;
  color: #f1f6ec;
  background: var(--sidebar-green);
}

.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 40px;
  margin-bottom: 29px;
}

.brand-mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  color: var(--sidebar-green);
  background: var(--pale-lime);
  font-size: 18px;
}

.brand-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
}

.brand-name small {
  display: block;
  margin-top: 4px;
  font-size: 7px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.sidebar-label {
  margin: 0 0 13px;
  color: #d1e39d;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.side-navigation {
  display: grid;
  gap: 6px;
}

.navigation-item {
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  min-height: 42px;
  padding: 0 12px;
  border: 0;
  border-radius: 10px;
  color: #edf4e8;
  background: transparent;
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}

.navigation-item > i {
  width: 15px;
  color: var(--pale-lime);
  font-size: 14px;
}

.navigation-item.active {
  color: var(--deep-green);
  background: var(--soft-green);
  font-weight: 700;
}

.navigation-item.active > i {
  color: var(--deep-green);
}

.sidebar-bottom {
  display: grid;
  gap: 16px;
  margin-top: auto;
}

.help-card {
  display: grid;
  justify-items: start;
  gap: 8px;
  min-height: 106px;
  padding: 14px;
  border: 0;
  border-radius: 13px;
  color: #f2f7e9;
  background: rgba(255, 255, 255, 0.08);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.help-card > i {
  color: var(--pale-lime);
  font-size: 17px;
}

.help-title {
  font-size: 12px;
  font-weight: 700;
}

.help-caption {
  color: #c5d8c4;
  font-size: 10px;
}

.help-caption i {
  margin-left: 3px;
  font-size: 9px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.avatar {
  display: grid;
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 50%;
  color: #22503c;
  background: #e8f0e8;
  font-size: 10px;
  font-weight: 700;
}

.profile-copy {
  display: grid;
  gap: 3px;
  min-width: 0;
  font-size: 10px;
}

.profile-copy b,
.profile-copy small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-copy small {
  color: #c5d8c4;
  font-size: 9px;
}

.main-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  min-height: 78px;
  padding: 0 32px;
  border-bottom: 1px solid #e9eee8;
  background: #fff;
}

.breadcrumb,
.topbar-actions {
  display: flex;
  align-items: center;
}

.breadcrumb {
  gap: 8px;
  color: #73847a;
  font-size: 12px;
}

.breadcrumb > i {
  font-size: 10px;
}

.breadcrumb b {
  color: #355144;
  font-weight: 600;
}

.topbar-actions {
  gap: 16px;
}

.today {
  color: #6d7c73;
  font-size: 11px;
}

.icon-button {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 0;
  color: #27513e;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
}

.top-avatar {
  width: 32px;
  height: 32px;
}

.workspace {
  flex: 1;
  min-height: calc(100vh - 78px);
  background: #f4f7f2;
}

@media (max-width: 760px) {
  .sidebar {
    flex-basis: 76px;
    width: 76px;
    align-items: center;
    padding: 18px 8px 14px;
  }

  .brand {
    margin-bottom: 24px;
  }

  .brand-name,
  .sidebar-label,
  .navigation-item span,
  .help-card,
  .profile-copy {
    display: none;
  }

  .side-navigation {
    width: 100%;
  }

  .navigation-item {
    justify-content: center;
    padding: 0;
  }

  .navigation-item > i {
    text-align: center;
  }

  .sidebar-bottom {
    justify-items: center;
  }

  .profile {
    justify-content: center;
  }

  .topbar {
    min-height: 64px;
    padding: 0 16px;
  }

  .today {
    display: none;
  }
}
</style>
