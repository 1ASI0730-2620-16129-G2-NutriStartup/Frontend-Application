import {createRouter, createWebHistory} from "vue-router";
import Home from "@/shared/presentation/views/home.vue";
import NutritionistView from "@/shared/presentation/views/nutritionist-view.vue";
import PatientView from "@/shared/presentation/views/patient-view.vue";

const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const appointmentsView = () => import('./appointment-management/presentation/views/appointments.vue');
const appointmentNewView = () => import('./appointment-management/presentation/views/appointment-new.vue');
const availabilityView = () => import('./appointment-management/presentation/views/availability.vue');
const consultationNewView = () => import('./appointment-management/presentation/views/consultation-new.vue');

const routes =
    [
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: { title: 'Home' }
        },
        {
            path: '/about',
            name: 'about',
            component: about,
            meta: { title: 'About' }
        },
        {
            path: '/',
            redirect: '/home'
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
            meta: { title: 'New Appointment' }
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
            meta: { title: 'Register Consultation' }
        },
        {
            path: '/:pageMatch(.*)*',
            name: 'not-found',
            component: pageNotFound,
            meta: { title: 'Page Not Found' }
        },
        {
            path: '/user1-view',
            name: 'user1',
            component: NutritionistView,
            meta: { title: 'User 1' }
        },
        {
            path: '/user2-view',
            name: 'user2',
            component: PatientView,
            meta: { title: 'User 2' }
        },
    ];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'NutriApp Integral';
    document.title = `${baseTitle} - ${to.meta.title}`;

    return true;
});

export default router;