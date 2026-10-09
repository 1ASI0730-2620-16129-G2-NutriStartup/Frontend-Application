<script setup>
import { useRouter } from 'vue-router';
import LanguageSwitcher from '@/shared/presentation/components/language-switcher.vue';

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const router = useRouter();
</script>

<template>
  <main class="auth-page">
    <div class="language-switcher"><LanguageSwitcher /></div>
    <section class="auth-card" aria-labelledby="auth-title">
      <button class="close-button" type="button" aria-label="Close" @click="router.push({ name: 'about' })">
        <i class="pi pi-times" aria-hidden="true" />
      </button>
      <div class="brand-mark" aria-hidden="true"><i class="pi pi-plus" /></div>
      <h1 id="auth-title">{{ title }}</h1>
      <p class="auth-description">{{ description }}</p>
      <slot />
      <footer v-if="$slots.footer" class="auth-footer"><slot name="footer" /></footer>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  box-sizing: border-box;
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 32px 20px;
  color: #243e32;
  background: radial-gradient(ellipse at 50% 0%, #e6f0e8 0%, #f1f5f0 48%, #e9f0e8 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.language-switcher {
  position: absolute;
  top: 18px;
  right: 22px;
}

.auth-card {
  position: relative;
  box-sizing: border-box;
  width: min(100%, 420px);
  padding: 34px 34px 38px;
  border: 1px solid rgb(222 233 223 / 90%);
  border-radius: 25px;
  background: #fff;
  box-shadow: 0 18px 55px rgb(37 70 52 / 10%);
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 14px;
  color: #25815c;
  background: #e8f3ea;
  font-size: 17px;
}

h1 {
  margin: 15px 0 5px;
  color: #233e32;
  font-size: 25px;
  font-weight: 750;
  letter-spacing: -0.04em;
}

.auth-description {
  margin: 0 0 26px;
  color: #718279;
  font-size: 13px;
}

.close-button {
  position: absolute;
  top: 17px;
  right: 17px;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: #294639;
  background: #f1f5f0;
  cursor: pointer;
}

.auth-footer {
  margin-top: 20px;
  color: #718279;
  font-size: 12px;
  text-align: center;
}

.auth-footer :deep(a) {
  color: #267c59;
  font-weight: 700;
  text-decoration: none;
}

.auth-footer :deep(a:hover) {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-page { padding: 58px 14px 20px; }
  .auth-card { padding: 28px 22px 30px; border-radius: 21px; }
  .language-switcher { top: 12px; right: 14px; }
}
</style>
