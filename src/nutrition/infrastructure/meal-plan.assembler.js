import {MealPlan} from "@/nutrition/domain/model/meal-plan.entity.js";

export class MealPlanAssembler {
    static toEntityFromResource(resource) {
        return new MealPlan({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(response.statusText);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['meal-plans'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
