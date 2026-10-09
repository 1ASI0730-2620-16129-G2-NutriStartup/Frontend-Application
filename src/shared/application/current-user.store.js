import { defineStore } from 'pinia';

/**
 * Session boundary for bounded contexts that need the authenticated identity.
 * The IAM sign-in flow should set this user after authentication.
 */
export const useCurrentUserStore = defineStore('current-user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      } : null;
    },
    clearUser() {
      this.user = null;
    },
  },
});
