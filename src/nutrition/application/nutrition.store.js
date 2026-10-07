import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {NutritionApi} from "@/nutrition/infrastructure/nutrition-api.js";
import {NutritionPlanAssembler} from "@/nutrition/infrastructure/nutrition-plan.assembler.js";
import {MealPlanAssembler} from "@/nutrition/infrastructure/meal-plan.assembler.js";
import {FoodRecommendationAssembler} from "@/nutrition/infrastructure/food-recommendation.assembler.js";

const nutritionApi = new NutritionApi();

const useNutritionStore = defineStore("nutrition", () => {
    const nutritionPlans = ref([]);
    const mealPlans = ref([]);
    const foodRecommendations = ref([]);

    const errors = ref([]);

    const nutritionPlansLoaded = ref(false);
    const mealPlansLoaded = ref(false);
    const foodRecommendationsLoaded = ref(false);

    const nutritionPlansCount = computed(() => {
        return nutritionPlansLoaded ? nutritionPlans.value.length : 0;
    });
    const mealPlansCount = computed(() => {
        return mealPlansLoaded ? mealPlans.value.length : 0;
    });
    const foodRecommendationsCount = computed(() => {
        return foodRecommendationsLoaded ? foodRecommendations.value.length : 0;
    });

    function getNutritionPlanById(id) {
        let idNum = parseInt(id);
        return nutritionPlans.value.find(category => category["id"] === idNum);
    }
    function addNutritionPlan(nutritionPlan) {
        nutritionApi.createNutritionPlan(nutritionPlan).then((response) => {
            const resource = response.data;
            const newPlan = NutritionPlanAssembler.toEntityFromResource(resource);
            nutritionPlans.value.push(newPlan);
        }).catch((error) => {
            errors.value.push(error);
        });
    }
    function updateNutritionPlan(nutritionPlan) {
        nutritionApi.updateNutritionPlan(nutritionPlan).then((response) => {
            const resource = response.data;
            const updatedNutritionPlan = NutritionPlanAssembler.toEntityFromResource(resource);
            const index = nutritionPlans.value.findIndex(c => c["id"] === updatedNutritionPlan.id);
            if (index !== -1) {
                nutritionPlans.value[index] = updatedNutritionPlan;
            }
        }).catch((error) => {
            errors.value.push(error);
        });
    }

    function addMealPlan(mealPlan) {
        nutritionApi.createMealPlan(mealPlan).then((response) => {
            const resource = response.data;
            const newMealPlan = MealPlanAssembler.toEntityFromResource(resource);
            mealPlans.value.push(newMealPlan);
        }).catch((error) => {
            errors.value.push(error);
        });
    }

    function addFoodRecommendation(foodRecommendation) {
        nutritionApi.createMealPlan(foodRecommendation).then((response) => {
            const resource = response.data;
            const newFoodRecommendation = FoodRecommendationAssembler.toEntityFromResource(resource);
            foodRecommendations.value.push(foodRecommendation);
        }).catch((error) => {
            errors.value.push(error);
        });
    }

    return {
        nutritionPlans,
        mealPlans,
        foodRecommendations,
        errors,
        nutritionPlansLoaded,
        mealPlansLoaded,
        foodRecommendationsLoaded,
        nutritionPlansCount,
        mealPlansCount,
        foodRecommendationsCount,
        getNutritionPlanById,
        addNutritionPlan,
        updateNutritionPlan,
        addMealPlan,
        addFoodRecommendation,
    }
});

export default useNutritionStore;
