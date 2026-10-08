const nutritionPlanList = () => import('@/nutrition/presentation/views/nutrition-plan-list.vue');
const nutritionPlanForm = () => import('@/nutrition/presentation/views/nutrition-plan-form.vue');

const mealPlanList = () => import('@/nutrition/presentation/views/meal-plan-list.vue');
const mealPlanForm = () => import('@/nutrition/presentation/views/meal-plan-form.vue');

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
    {
        path: 'meal-plans-nutritionist',
        name: 'meal-plans-nutritionist',
        component: mealPlanList,
        meta: {title: 'Meal Plans'},
    },
    {
        path: 'meal-plans-nutritionist/new',
        name: 'meal-plans-nutritionist-new',
        component: mealPlanForm,
        meta: {title: 'New Meal Plans'}
    },
    {
        path: 'meal-plans-nutritionist/:id/edit',
        name: 'meal-plan-nutritionist-edit',
        component: mealPlanForm,
        meta: {title: 'Edit Meal Plan'}
    },
];

export default nutritionNutritionistRoutes;
