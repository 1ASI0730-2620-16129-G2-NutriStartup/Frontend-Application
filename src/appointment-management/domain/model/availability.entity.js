export class Availability {
    constructor({ id = null, nutritionistId, date, startTime, endTime, available = true }) {
        this.id = id;
        this.nutritionistId = nutritionistId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.available = available;
    }

    isAvailable() {
        return this.available;
    }
}