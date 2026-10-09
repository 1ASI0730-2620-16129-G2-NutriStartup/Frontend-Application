<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useIamStore from '@/iam/application/iam.store.js';
import { SignUpCommand } from '@/iam/domain/sign-up.command.js';
import AuthenticationPage from '@/iam/presentation/components/authentication-page.vue';

const router = useRouter();
const { t } = useI18n();
const store = useIamStore();
const form = reactive({ name: '', email: '', password: '', role: '' });

function performSignUp() {
  store.errors = [];
  store.signUp(new SignUpCommand(form), router);
}
</script>

<template>
  <AuthenticationPage :title="t('iam.signUpTitle')" :description="t('iam.signUpDescription')">
    <form class="auth-form" @submit.prevent="performSignUp">
      <label for="name">{{ t('iam.fullName') }}</label>
      <input
        id="name"
        v-model.trim="form.name"
        type="text"
        name="name"
        autocomplete="name"
        :placeholder="t('iam.namePlaceholder')"
        required
      />

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

      <label for="role">{{ t('iam.accountType') }}</label>
      <select id="role" v-model="form.role" name="role" required>
        <option disabled value="">{{ t('iam.accountTypePlaceholder') }}</option>
        <option value="patient">{{ t('iam.patientRole') }}</option>
        <option value="nutritionist">{{ t('iam.nutritionistRole') }}</option>
      </select>

      <label for="password">{{ t('iam.password') }}</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        name="password"
        autocomplete="new-password"
        :placeholder="t('iam.passwordCreatePlaceholder')"
        required
      />

      <p v-if="store.errors.length" class="form-error" role="alert">{{ t('iam.requestFailed') }}</p>
      <button class="submit-button" type="submit">{{ t('iam.signUpAction') }}</button>
    </form>

    <template #footer>
      {{ t('iam.switchToSignIn') }}
      <router-link :to="{ name: 'iam-sign-in' }">{{ t('iam.signInAction') }}</router-link>
    </template>
  </AuthenticationPage>
</template>

<style scoped>
.auth-form { display: grid; gap: 8px; }
.auth-form label { margin-top: 1px; color: #2c4839; font-size: 11px; font-weight: 700; }
.auth-form input,
.auth-form select {
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  margin-bottom: 6px;
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
.auth-form input::placeholder,
.auth-form select:invalid { color: #8a958e; }
.auth-form input:focus,
.auth-form select:focus { border-color: #25815c; box-shadow: 0 0 0 3px rgb(37 129 92 / 12%); }
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
