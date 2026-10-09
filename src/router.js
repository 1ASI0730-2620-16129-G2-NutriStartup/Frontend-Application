import {createRouter, createWebHistory} from "vue-router";
import NutritionistView from "@/shared/presentation/views/nutritionist-view.vue";
import PatientView from "@/shared/presentation/views/patient-view.vue";
import ProgressMonitoringView from "@/presentation/views/progress-monitoring-view.vue";
const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes =
    [
        {
            path: '/home',
            name: 'home',
            component: NutritionistView,
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

router.beforeEach((to, from) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'NutriApp Integral';
    document.title = `${baseTitle} - ${to.meta.title}`;

    return true;
});

export default router;
