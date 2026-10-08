import nutritionPlanList from "@/nutrition/presentation/views/nutrition-plan-list.vue";

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
];

export default nutritionPatientRoutes;
