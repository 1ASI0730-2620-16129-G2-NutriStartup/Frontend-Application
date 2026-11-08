import { DateTime } from '@/shared/domain/model/date-time.js';

export const HabitType = Object.freeze({
    FOOD: 'FOOD',
    ACTIVITY: 'ACTIVITY',
});

export class HabitRecord {
    constructor({
                    id = null,
                    userId = null,
                    type = HabitType.FOOD,
                    description = '',
                    quantity = 0,
                    date = '',
                    notes = '',
                    createdAt = DateTime.now().toISOString(),
                } = {}) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.description = description;
        this.quantity = quantity;
        this.date = date;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    isFood() {
        return this.type === HabitType.FOOD;
    }

    isActivity() {
        return this.type === HabitType.ACTIVITY;
    }
    
    unit() {
        return this.isFood() ? 'kcal' : 'min';
    }
}