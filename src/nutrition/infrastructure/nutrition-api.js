import {BaseApi} from "@/shared/infrastructure/base-api.js";
import {BaseEndpoint} from "@/shared/infrastructure/base-endpoint.js";

const nutritionPlansEndpointPath = import.meta.env.VITE_NUTRITION_PLANS_ENDPOINT_PATH;
const mealPlansEndpointPath = import.meta.env.VITE_MEAL_PLANS_ENDPOINT_PATH;
const foodRecommendationsEndpointPath = import.meta.env.VITE_FOOD_RECOMMENDATIONS_ENDPOINT_PATH;

export class NutritionApi extends BaseApi {
    #nutritionPlanEndpoint;
    #mealPlanEndpoint;
    #foodRecommendationEndpoint;

    constructor() {
        super();
        this.#nutritionPlanEndpoint = new BaseEndpoint(this, nutritionPlansEndpointPath);
        this.#mealPlanEndpoint = new BaseEndpoint(this, mealPlansEndpointPath);
        this.#foodRecommendationEndpoint = new BaseEndpoint(this, foodRecommendationsEndpointPath);
    }

    getNutritionPlans() {
        return this.#nutritionPlanEndpoint.getAll();
    }
    getNutritionPlanById(id) {
        return this.#nutritionPlanEndpoint.getById(id);
    }
    createNutritionPlan(resource) {
        const plan = {...resource};
        delete plan.id;
        return this.#nutritionPlanEndpoint.create({
            ...plan,
            startDate: plan.startDate.toISOString(),
            endDate: plan.endDate.toISOString(),
        });
    }
    updateNutritionPlan(resource) {
        return this.#nutritionPlanEndpoint.update(resource.id, {
            ...resource,
            startDate: resource.startDate.toISOString(),
            endDate: resource.endDate.toISOString(),
        });
    }
    deleteNutritionPlan(id) {
        return this.#nutritionPlanEndpoint.delete(id);
    }

    getMealPlans() {
        return this.#mealPlanEndpoint.getAll();
    }
    getMealPlanById(id) {
        return this.#mealPlanEndpoint.getById(id);
    }
    createMealPlan(resource) {
        return this.#mealPlanEndpoint.create(resource);
    }
    updateMealPlan(resource) {
        return this.#mealPlanEndpoint.update(resource);
    }
    deleteMealPlan(id) {
        return this.#mealPlanEndpoint.delete(id);
    }

    getFoodRecommendations() {
        return this.#foodRecommendationEndpoint.getAll();
    }
    getFoodRecommendationById(id) {
        return this.#foodRecommendationEndpoint.getById(id);
    }
    createFoodRecommendation(resource) {
        return this.#foodRecommendationEndpoint.create(resource);
    }
    updateFoodRecommendation(resource) {
        return this.#foodRecommendationEndpoint.update(resource);
    }
    deleteFoodRecommendation(id) {
        return this.#foodRecommendationEndpoint.delete(id);
    }
}
