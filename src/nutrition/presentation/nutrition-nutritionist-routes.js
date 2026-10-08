const nutritionPlanList = () => import('@/nutrition/presentation/views/nutrition-plan-list.vue');
const nutritionPlanForm = () => import('@/nutrition/presentation/views/nutrition-plan-form.vue');

const nutritionNutritionistRoutes = [
    {
        path: 'nutrition-plans-nutritionist',
        name: 'nutrition-plans-nutritionist',
        component: nutritionPlanList,
        meta: {title: 'Nutrition Plans'},
    },
    {
        path: 'nutrition-plans-nutritionist/new',
        name: 'nutrition-plans-nutritionist-new',
        component: nutritionPlanForm,
        meta: {title: 'New Nutrition Plans'}
    },
    {
        path: 'nutrition-plans-nutritionist/:id/edit',
        name: 'nutrition-plan-nutritionist-edit',
        component: nutritionPlanForm,
        meta: {title: 'Edit Nutrition Plan'}
    },
];

export default nutritionNutritionistRoutes;
