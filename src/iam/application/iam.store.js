import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {IamApi} from "@/iam/infrastructure/iam-api.js";
import {SignInAssembler} from "@/iam/infrastructure/sign-in.assembler.js";
import {UserAssembler} from "@/iam/infrastructure/user.assembler.js";
import {SignUpAssembler} from "@/iam/infrastructure/sign-up.assembler.js";
import { useCurrentUserStore } from "@/shared/application/current-user.store.js";

const iamApi = new IamApi();

const useIamStore = defineStore('iam', () => {
    const currentUserStore = useCurrentUserStore();
    const savedUser = currentUserStore.user;
    const users = ref([]);
    const errors = ref([]);
    const usersLoaded = ref(false);
    const isSignedIn = ref(Boolean(localStorage.getItem('token') && savedUser?.id));
    const currentUsername = ref(savedUser?.username ?? savedUser?.name ?? null);
    const currentUserId = ref(savedUser?.id ?? null);
    const currentToken = computed(
        () => isSignedIn.value ? localStorage.getItem('token') : null
    );

    function signIn(signInCommand, router) {
        iamApi.signIn(signInCommand)
            .then(response => {
                let signInResource = SignInAssembler.toResourceFromResponse(response);
                if (signInResource) {
                    let currentUser = UserAssembler.toEntityFromResource(signInResource);

                    currentUserStore.setUser(currentUser);
                    currentUsername.value = currentUser.username;
                    currentUserId.value = currentUser.id;
                    localStorage.setItem('token', signInResource.token);
                    isSignedIn.value = true;
                    console.log(`User ${currentUsername.value} signed in successfully.`);
                    errors.value = [];
                    const role = currentUser.role?.toLowerCase();
                    const destination = role === 'patient'
                        ? 'user2'
                        : role === 'nutritionist' ? 'user1' : 'home';
                    router.push({ name: destination });
                } else {
                    isSignedIn.value = false;
                    currentUserStore.clearUser();
                    localStorage.removeItem('token');
                    currentUsername.value = null;
                    currentUserId.value = null;
                    console.log(`Sign-in failed.`);
                    errors.value.push(new Error('Sign-in failed.'));
                    router.push({ name: 'iam-sign-in' });
                }
            })
            .catch(error => {
                isSignedIn.value = false;
                currentUserStore.clearUser();
                localStorage.removeItem('token');
                currentUsername.value = null;
                currentUserId.value = null;
                console.log(error);
                errors.value.push(error);
                router.push({ name: 'iam-sign-in' });
            });
    }

    function signUp(signUpCommand, router) {
        iamApi.signUp(signUpCommand)
            .then(response => {
                let signUpResource = SignUpAssembler.toResourceFromResponse(response);

                if (signUpResource) {
                    console.log(signUpResource.message);
                    errors.value = [];
                    router.push({ name: 'iam-sign-in' });
                } else {
                    console.log(`Sign-up failed.`);
                    errors.value.push(new Error('Sign-up failed.'));
                    router.push({ name: 'iam-sign-up' });
                }
            })
            .catch(error => {
                console.log(error);
                errors.value.push(error);
                router.push({ name: 'iam-sign-up' });
            });
    }

    function signOut(router) {
        currentUsername.value = null;
        currentUserId.value = null;
        localStorage.removeItem('token');
        isSignedIn.value = false;
        currentUserStore.clearUser();
        console.log(`User signed out successfully.`);
        errors.value = [];
        if (router) router.push({ name: 'iam-sign-in' });
    }

    function fetchUsers() {
        iamApi.getUsers()
            .then(response => {
                users.value = UserAssembler.toEntitiesFromResponse(response);
                usersLoaded.value = true;
                console.log(`Loaded ${users.value.length} users.`);
                errors.value = [];
            })
            .catch(error => {
                console.error(`Error fetching users: ${error}`);
                errors.value.push(error);
            });
    }

    return {
        users,
        errors,
        usersLoaded,
        currentUsername,
        currentUserId,
        currentToken,
        isSignedIn,
        signIn,
        signUp,
        signOut,
        fetchUsers
    }
});

export default useIamStore;
