<script setup>
import useIamStore from "@/iam/application/iam.store.js";
import {useRouter} from "vue-router";
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import {useCurrentUserStore} from "@/shared/application/current-user.store.js";

const router = useRouter();
const {t} = useI18n();
const store = useIamStore();
const currentUserStore = useCurrentUserStore();
const {signOut} = store;

let isSignedIn = computed(() => !!store.isSignedIn);
let currentDisplayName = computed(() => currentUserStore.user?.name || store.currentUsername);

/**
 * Navigate to the sign-in page.
 * @function performSignIn
 */
function performSignIn() {
  router.push({name: 'iam-sign-in'});
}

/**
 * Navigate to the sign-up page.
 * @function performSignUp
 */
function performSignUp() {
  router.push({name: 'iam-sign-up'});
}

/**
 * Sign out the current user and navigate to the appropriate page.
 * @function performSignOut
 */
function performSignOut() {
  signOut(router);
}
</script>

<template>
  <div class="authentication-section">
    <div v-if="isSignedIn" class="auth-actions">
      <span class="welcome-message">{{ t('iam.welcome', { name: currentDisplayName }) }}</span>
      <pv-button class="sign-out-button" text @click="performSignOut">{{ t('iam.signOutAction') }}</pv-button>
    </div>
    <div v-else class="auth-actions">
      <pv-button class="sign-out-button" text @click="performSignIn">{{ t('iam.signInAction') }}</pv-button>
      <pv-button class="sign-out-button" text @click="performSignUp">{{ t('iam.signUpAction') }}</pv-button>
    </div>
  </div>
</template>

<style scoped>
.auth-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
}

.welcome-message {
  color: #355144;
  font-size: 12px;
}

.auth-actions :deep(.sign-out-button) {
  border: 0;
  border-radius: 4px;
  color: #fff;
  background: #39bca3;
  font-size: 13px;
}

.auth-actions :deep(.sign-out-button:hover) {
  background: #2da990;
}
</style>
