export class NutritionPlan {
    constructor({id = null, name = '', description = '',
                    objective = '', startDate = '', endDate = '',
                    status = ''}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.objective = objective;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }

    isActive() {
        return (this.status === 'Active');
    }
}
