export class ProgressRecord {
    constructor({
        id = null,
        userId,
        date,
        weight,
        bodyFat = null,
        waist = null,
        hip = null,
        activityMinutes = 0,
        planCompliance = 0,
        notes = ""
    }) {
        this.id = id;
        this.userId = Number(userId);
        this.date = date;
        this.weight = Number(weight);
        this.bodyFat = bodyFat === null || bodyFat === "" ? null : Number(bodyFat);
        this.waist = waist === null || waist === "" ? null : Number(waist);
        this.hip = hip === null || hip === "" ? null : Number(hip);
        this.activityMinutes = Number(activityMinutes) || 0;
        this.planCompliance = Number(planCompliance) || 0;
        this.notes = notes || "";
    }

    isValid() {
        return Boolean(
            Number.isFinite(this.userId) && this.userId > 0 &&
            this.date && Number.isFinite(this.weight) && this.weight > 0 &&
            this.planCompliance >= 0 && this.planCompliance <= 100 &&
            this.activityMinutes >= 0
        );
    }

    toJSON() {
        return {
            userId: this.userId,
            date: this.date,
            weight: this.weight,
            bodyFat: this.bodyFat,
            waist: this.waist,
            hip: this.hip,
            activityMinutes: this.activityMinutes,
            planCompliance: this.planCompliance,
            notes: this.notes
        };
    }

    static fromJSON(resource) {
        return new ProgressRecord(resource);
    }
}
