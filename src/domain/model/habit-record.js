export class HabitRecord {
    constructor({
        id = null,
        userId,
        date,
        habitType,
        completed = false
    }) {
        this.id = id;
        this.userId = Number(userId);
        this.date = date;
        this.habitType = (habitType || "").trim();
        this.completed = Boolean(completed);
    }

    isValid() {
        return Boolean(
            Number.isFinite(this.userId) && this.userId > 0 &&
            this.date && this.habitType
        );
    }

    toJSON() {
        return {
            userId: this.userId,
            date: this.date,
            habitType: this.habitType,
            completed: this.completed
        };
    }

    static fromJSON(resource) {
        return new HabitRecord(resource);
    }
}
