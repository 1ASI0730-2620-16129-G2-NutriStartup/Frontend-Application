const nutritionPlanList = () => import('@/nutrition/presentation/views/nutrition-plan-list.vue');

const mealPlanList = () => import('@/nutrition/presentation/views/meal-plan-list.vue');


const nutritionPatientRoutes = [
    {
        path: 'nutrition-plans-patient',
        name: 'nutrition-plans-patient',
        component: nutritionPlanList,
        meta: {
            title: 'Nutrition Plans',
            readOnly: true
        },
    },
    {
        path: 'meal-plans-patient',
        name: 'meal-plans-patient',
        component: mealPlanList,
        meta: {
            title: 'Meal Plans',
            readOnly: true
        },
    },
];

export default nutritionPatientRoutes;
