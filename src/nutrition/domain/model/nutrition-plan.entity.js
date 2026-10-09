import {DateTime} from "@/shared/domain/model/date-time.js";

export class NutritionPlan {
    constructor({id = null, name = '', description = '',
                    objective = '', startDate = '', endDate = '',
                    status = ''} = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.objective = objective;

        let dateTime1;
        try {
            dateTime1 = startDate instanceof DateTime ? startDate : new DateTime(startDate);
        } catch (e) {
            throw new Error('Nutrition Plan startDate must be a valid date');
        }
        if (dateTime1.isFuture()) throw new Error('Nutrition Plan startDate cannot be in the future');

        this.startDate = dateTime1;

        let dateTime2;
        try {
            dateTime2 = endDate instanceof DateTime ? endDate : new DateTime(endDate);
        } catch (e) {
            throw new Error('Nutrition Plan endDate must be a valid date');
        }
        if (dateTime1.isFuture()) throw new Error('Nutrition Plan endDate cannot be in the future');

        this.endDate = dateTime2;

        this.status = status;
    }

    isActive() {
        return (this.status === 'Active');
    }
}
