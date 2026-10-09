import {NutritionPlan} from "@/nutrition/domain/model/nutrition-plan.entity.js";

export class MealPlan {
    constructor({id = null, nutritionPlanId = '', mealType = '',
                    description = '', calories = 0, nutritionPlan = null} = {}) {
        this.id = id;
        this.nutritionPlanId = nutritionPlanId;
        this.mealType = mealType;
        this.description = description;
        this.calories = calories;
        this.nutritionPlan = nutritionPlan instanceof NutritionPlan
            ? nutritionPlan : null;
    }
}
