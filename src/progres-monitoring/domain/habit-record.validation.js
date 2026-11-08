import { HabitType } from '@/progres-monitoring/domain/model/habit-record.entity.js';

export function todayIsoDate() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
}

export function validateHabitRecord(habitRecord) {
    const errors = {};

    if (!Object.values(HabitType).includes(habitRecord.type)) errors.type = 'required';
    if (!habitRecord.description?.trim()) errors.description = 'required';
    if (!Number.isFinite(Number(habitRecord.quantity)) || Number(habitRecord.quantity) <= 0) errors.quantity = 'positive';
    if (!habitRecord.date) errors.date = 'required';
    else if (habitRecord.date > todayIsoDate()) errors.date = 'futureDate';

    return errors;
}