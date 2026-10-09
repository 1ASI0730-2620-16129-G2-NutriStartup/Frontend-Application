<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useIamStore from '@/iam/application/iam.store.js';
import { SignInCommand } from '@/iam/domain/sign-in.command.js';
import AuthenticationPage from '@/iam/presentation/components/authentication-page.vue';

const router = useRouter();
const { t } = useI18n();
const store = useIamStore();
const form = reactive({ email: '', password: '' });

function performSignIn() {
  store.errors = [];
  store.signIn(new SignInCommand({ username: form.email, password: form.password }), router);
}
</script>

<template>
  <AuthenticationPage :title="t('iam.signInTitle')" :description="t('iam.signInDescription')">
    <form class="auth-form" @submit.prevent="performSignIn">
      <label for="email">{{ t('iam.email') }}</label>
      <input
        id="email"
        v-model.trim="form.email"
        type="email"
        name="email"
        autocomplete="email"
        :placeholder="t('iam.emailPlaceholder')"
        required
      />

      <label for="password">{{ t('iam.password') }}</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        name="password"
        autocomplete="current-password"
        :placeholder="t('iam.passwordPlaceholder')"
        required
      />

      <p v-if="store.errors.length" class="form-error" role="alert">{{ t('iam.requestFailed') }}</p>
      <button class="submit-button" type="submit">{{ t('iam.signInAction') }}</button>
    </form>

    <template #footer>
      {{ t('iam.switchToSignUp') }}
      <router-link :to="{ name: 'iam-sign-up' }">{{ t('iam.signUpAction') }}</router-link>
    </template>
  </AuthenticationPage>
</template>

<style scoped>
.auth-form { display: grid; gap: 9px; }
.auth-form label { margin-top: 2px; color: #2c4839; font-size: 11px; font-weight: 700; }
.auth-form input {
  box-sizing: border-box;
  width: 100%;
  height: 46px;
  margin-bottom: 8px;
  padding: 0 13px;
  border: 1px solid #d9e5d9;
  border-radius: 11px;
  outline: none;
  color: #294237;
  background: #fff;
  font: inherit;
  font-size: 13px;
  transition: border-color 150ms, box-shadow 150ms;
}
.auth-form input::placeholder { color: #8a958e; }
.auth-form input:focus { border-color: #25815c; box-shadow: 0 0 0 3px rgb(37 129 92 / 12%); }
.submit-button {
  height: 46px;
  margin-top: 3px;
  border: 0;
  border-radius: 11px;
  color: #fff;
  background: #217b57;
  box-shadow: 0 7px 17px rgb(33 123 87 / 16%);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.submit-button:hover { background: #196947; }
.form-error { margin: 0 0 5px; color: #a33d37; font-size: 12px; }
</style>
