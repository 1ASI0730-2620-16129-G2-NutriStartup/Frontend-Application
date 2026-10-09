import {NutritionPlan} from "@/nutrition/domain/model/nutrition-plan.entity.js";

export class NutritionPlanAssembler {
    static toEntityFromResource(resource) {
        return new NutritionPlan({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(response.statusText);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['nutrition-plans'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
