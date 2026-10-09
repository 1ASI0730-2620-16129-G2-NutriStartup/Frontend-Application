import { defineStore } from 'pinia';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') ?? 'null');
  } catch {
    localStorage.removeItem('currentUser');
    return null;
  }
}

/**
 * Session boundary for bounded contexts that need the authenticated identity.
 * IAM owns authentication; this store shares the identity with bounded contexts.
 */
export const useCurrentUserStore = defineStore('current-user', {
  state: () => ({
    user: getStoredUser(),
  }),
  actions: {
    setUser(user) {
      this.user = user ? {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      } : null;
      if (this.user) localStorage.setItem('currentUser', JSON.stringify(this.user));
      else localStorage.removeItem('currentUser');
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('currentUser');
    },
  },
});
