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
        return nutritionPlansLoaded.value ? nutritionPlans.value.length : 0;
    });
    const mealPlansCount = computed(() => {
        return mealPlansLoaded.value ? mealPlans.value.length : 0;
    });
    const foodRecommendationsCount = computed(() => {
        return foodRecommendationsLoaded.value ? foodRecommendations.value.length : 0;
    });

    function fetchNutritionPlans() {
        nutritionApi.getNutritionPlans().then((response) => {
            nutritionPlans.value = NutritionPlanAssembler.toEntitiesFromResponse(response);
            nutritionPlansLoaded.value = true;
            console.log(nutritionPlansLoaded.value);
            console.log(nutritionPlans.value);
        }).catch((error) => {
            errors.value.push(error);
        });
    }
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
    function deleteNutritionPlan(nutritionPlan) {
        nutritionApi.deleteNutritionPlan(nutritionPlan.id).then((response) => {
            const index = nutritionPlans.value.findIndex(c => c["id"] === nutritionPlan.id);
            if (index !== -1) {
                nutritionPlans.value.splice(index, 1);
            }
        }).catch((error) => {
            errors.value.push(error);
        });
    }

    function fetchMealPlans() {
        nutritionApi.getMealPlans().then((response) => {
            mealPlans.value = MealPlanAssembler.toEntitiesFromResponse(response);
            mealPlansLoaded.value = true;
            console.log(mealPlansLoaded.value);
            console.log(mealPlans.value);
        }).catch((error) => {
            errors.value.push(error);
        });
    }
    function getMealPlanById(id) {
        let idNum = parseInt(id);
        return mealPlans.value.find(meal => meal["id"] === idNum);
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
    function updateMealPlan(mealPlan) {
        nutritionApi.updateMealPlan(mealPlan).then((response) => {
            const resource = response.data;
            const updatedMealPlan = MealPlanAssembler.toEntityFromResource(resource);
            const index = mealPlans.value.findIndex(c => c["id"] === updatedMealPlan.id);
            if (index !== -1) {
                mealPlans.value[index] = updatedMealPlan;
            }
        }).catch((error) => {
            errors.value.push(error);
        });
    }
    function deleteMealPlan(mealPlan) {
        nutritionApi.deleteMealPlan(mealPlan.id).then((response) => {
            const index = mealPlans.value.findIndex(c => c["id"] === mealPlan.id);
            if (index !== -1) {
                mealPlans.value.splice(index, 1);
            }
        }).catch((error) => {
            errors.value.push(error);
        });
    }

    function fetchFoodRecommendations() {
        nutritionApi.getFoodRecommendations().then((response) => {
            foodRecommendations.value = FoodRecommendationAssembler.toEntitiesFromResponse(response);
            foodRecommendationsLoaded.value = true;
            console.log(foodRecommendationsLoaded.value);
            console.log(foodRecommendations.value);
        }).catch((error) => {
            errors.value.push(error);
        });
    }
    function getFoodRecommendationById(id) {
        let idNum = parseInt(id);
        return foodRecommendations.value.find(food => food["id"] === idNum);
    }
    function addFoodRecommendation(foodRecommendation) {
        nutritionApi.createFoodRecommendation(foodRecommendation).then((response) => {
            const resource = response.data;
            const newFoodRecommendation = FoodRecommendationAssembler.toEntityFromResource(resource);
            foodRecommendations.value.push(newFoodRecommendation);
        }).catch((error) => {
            errors.value.push(error);
        });
    }
    function updateFoodRecommendation(foodRecommendation) {
        nutritionApi.updateFoodRecommendation(foodRecommendation).then((response) => {
            const resource = response.data;
            const updatedFoodRecommendation = FoodRecommendationAssembler.toEntityFromResource(resource);
            const index = foodRecommendations.value.findIndex(c => c["id"] === updatedFoodRecommendation.id);
            if (index !== -1) {
                foodRecommendations.value[index] = updatedFoodRecommendation;
            }
        }).catch((error) => {
            errors.value.push(error);
        });
    }
    function deleteFoodRecommendation(foodRecommendation) {
        nutritionApi.deleteFoodRecommendation(foodRecommendation.id).then((response) => {
            const index = foodRecommendations.value.findIndex(c => c["id"] === foodRecommendation.id);
            if (index !== -1) {
                foodRecommendations.value.splice(index, 1);
            }
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

        fetchNutritionPlans,
        getNutritionPlanById,
        addNutritionPlan,
        updateNutritionPlan,
        deleteNutritionPlan,

        fetchMealPlans,
        getMealPlanById,
        addMealPlan,
        updateMealPlan,
        deleteMealPlan,

        fetchFoodRecommendations,
        getFoodRecommendationById,
        addFoodRecommendation,
        updateFoodRecommendation,
        deleteFoodRecommendation,
    }
});

export default useNutritionStore;
