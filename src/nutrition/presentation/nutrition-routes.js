const nutritionPlanList = () => import('@/nutrition/presentation/views/nutrition-plan-list.vue');
const nutritionPlanForm = () => import('@/nutrition/presentation/views/nutrition-plan-form.vue');

const nutritionRoutes = [
    {
        path: 'nutrition-plans',
        name: 'nutrition-plans',
        component: nutritionPlanList,
        meta: {title: 'Nutrition Plans'},
    },
    {
        path: 'nutrition-plans/new',
        name: 'nutrition-plans-new',
        component: nutritionPlanForm,
        meta: {title: 'New Nutrition Plans'}
    },
    {
        path: 'nutrition-plans/:id/edit',
        name: 'nutrition-plan-edit',
        component: nutritionPlanForm,
        meta: {title: 'Edit Nutrition Plan'}
    },
];

export default nutritionRoutes;
