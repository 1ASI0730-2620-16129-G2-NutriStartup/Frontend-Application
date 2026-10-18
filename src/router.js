import {createRouter, createWebHistory} from "vue-router";
import NutritionistView from "@/shared/presentation/views/nutritionist-view.vue";
import PatientView from "@/shared/presentation/views/patient-view.vue";
import iamRoutes from "@/iam/presentation/iam-routes.js";
import { authenticationGuard } from "@/iam/infrastructure/authentication.guard.js";
import nutritionNutritionistRoutes from "@/nutrition/presentation/nutrition-nutritionist-routes.js";
import nutritionPatientRoutes from "@/nutrition/presentation/nutrition-patient-routes.js";
import Home from "@/shared/presentation/views/home.vue";

const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');
const appointmentsView = () => import('./appointment-management/presentation/views/appointments.vue');
const appointmentNewView = () => import('./appointment-management/presentation/views/appointment-new.vue');
const availabilityView = () => import('./appointment-management/presentation/views/availability.vue');
const consultationNewView = () => import('./appointment-management/presentation/views/consultation-new.vue');

const routes =
    [
        ...iamRoutes.map((route) => ({
            ...route,
            path: `/iam/${route.path}`,
        })),
        {
            path: '/home',
            redirect: { name: 'user1-home' }
        },
        {
            path: '/about',
            name: 'about',
            component: about,
            meta: { title: 'About' }
        },
        {
            path: '/appointments',
            name: 'appointments',
            component: appointmentsView,
            meta: { title: 'Appointments' }
        },
        {
            path: '/appointments/new',
            name: 'appointment-new',
            component: appointmentNewView,
            meta: { title: 'New appointment' }
        },
        {
            path: '/availability',
            name: 'availability',
            component: availabilityView,
            meta: { title: 'Availability' }
        },
        {
            path: '/consultations/new',
            name: 'consultation-new',
            component: consultationNewView,
            meta: { title: 'Register consultation' }
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/user1-view',
            name: 'user1',
            component: NutritionistView,
            meta: { title: 'User 1' },
            children: [
                { path: '', name: 'user1-home', component: Home, meta: { title: 'Home', menuKey: 'home' } },
                { path: 'appointments-nutritionist', name: 'appointments-nutritionist', component: Home, meta: { title: 'Appointments', menuKey: 'appointments' } },
                { path: 'availability-nutritionist', name: 'availability-nutritionist', component: Home, meta: { title: 'Availability', menuKey: 'availability' } },
                { path: 'profile-nutritionist', name: 'profile-nutritionist', component: Home, meta: { title: 'Profile', menuKey: 'profile' } },
                ...nutritionNutritionistRoutes.map((route) => ({
                    ...route,
                    meta: { ...route.meta, menuKey: route.path.startsWith('nutrition-plans') ? 'nutrition-plans' : route.path.startsWith('meal-plans') ? 'meal-plans' : 'food-recommendations' }
                }))
            ]
        },
        {
            path: '/user2-view',
            name: 'user2',
            component: PatientView,
            meta: { title: 'User 2' },
            children: [
                { path: '', name: 'user2-home', component: Home, meta: { title: 'Home', menuKey: 'home' } },
                { path: 'appointments-patient', name: 'appointments-patient', component: Home, meta: { title: 'Appointments', menuKey: 'appointments' } },
                { path: 'availability-patient', name: 'availability-patient', component: Home, meta: { title: 'Availability', menuKey: 'availability' } },
                { path: 'profile-patient', name: 'profile-patient', component: Home, meta: { title: 'Profile', menuKey: 'profile' } },
                ...nutritionPatientRoutes.map((route) => ({
                    ...route,
                    meta: { ...route.meta, menuKey: route.path.startsWith('nutrition-plans') ? 'nutrition-plans' : route.path.startsWith('meal-plans') ? 'meal-plans' : 'food-recommendations' }
                }))
            ]
        },
        {
            path: '/:pageMatch(.*)*',
            name: 'not-found',
            component: pageNotFound,
            meta: { title: 'Page Not Found' }
        },
    ];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach(authenticationGuard);

router.beforeEach((to, from) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'NutriApp Integral';
    document.title = `${baseTitle} - ${to.meta.title}`;

    return true;
});

export default router;
