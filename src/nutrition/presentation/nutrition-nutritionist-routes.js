const nutritionPlanList = () => import('@/nutrition/presentation/views/nutrition-plan-list.vue');
const nutritionPlanForm = () => import('@/nutrition/presentation/views/nutrition-plan-form.vue');

const mealPlanList = () => import('@/nutrition/presentation/views/meal-plan-list.vue');
const mealPlanForm = () => import('@/nutrition/presentation/views/meal-plan-form.vue');

const foodRecommendationList = () => import('@/nutrition/presentation/views/food-recommendation-list.vue');
const foodRecommendationForm = () => import('@/nutrition/presentation/views/food-recommendation-form.vue');

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
    {
        path: 'food-recommendations-nutritionist',
        name: 'food-recommendations-nutritionist',
        component: foodRecommendationList,
        meta: {title: 'Food Recommendations'},
    },
    {
        path: 'food-recommendations-nutritionist/new',
        name: 'food-recommendations-nutritionist-new',
        component: foodRecommendationForm,
        meta: {title: 'New Food Recommendation'}
    },
    {
        path: 'food-recommendations-nutritionist/:id/edit',
        name: 'food-recommendations-nutritionist-edit',
        component: foodRecommendationForm,
        meta: {title: 'Edit Food Recommendation'}
    },
];

export default nutritionNutritionistRoutes;
