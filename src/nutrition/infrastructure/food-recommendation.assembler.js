import {FoodRecommendation} from "@/nutrition/domain/model/food-recommendation.entity.js";

export class FoodRecommendationAssembler {
    static toEntityFromResource(resource) {
        return new FoodRecommendation({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(response.statusText);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['food-recommendations'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
