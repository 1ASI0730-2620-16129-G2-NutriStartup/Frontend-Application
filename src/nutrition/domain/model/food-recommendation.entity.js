import {MealPlan} from "@/nutrition/domain/model/meal-plan.entity.js";

export class FoodRecommendation {
    constructor({id = null, mealPlanId = '', foodName = '',
                    portion = '', nutritionalValue = '', mealPlan = null} = {}) {
        this.id = id;
        this.mealPlanId = mealPlanId;
        this.foodName = foodName;
        this.portion = portion;
        this.nutritionalValue = nutritionalValue;
        this.mealPlan = mealPlan instanceof MealPlan
            ? mealPlan : null;
    }
}
