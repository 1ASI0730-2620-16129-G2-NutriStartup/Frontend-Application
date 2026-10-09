import {BaseApi} from "../../../../Downloads/Fronted-Aplication-Progress-Monitoring-BC/Fronted-Aplication/src/shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../../../Downloads/Fronted-Aplication-Progress-Monitoring-BC/Fronted-Aplication/src/shared/infrastructure/base-endpoint.js";
import {ProgressRecordAssembler} from "../../../../Downloads/Fronted-Aplication-Progress-Monitoring-BC/Fronted-Aplication/src/infrastructure/progress-record-assembler.js";
import {HabitRecordAssembler} from "./habit-record-assembler.js";

const progressEndpointPath = import.meta.env.VITE_PROGRESS_RECORDS_ENDPOINT_PATH || "/progress-records";
const habitEndpointPath = import.meta.env.VITE_HABIT_RECORDS_ENDPOINT_PATH || "/habit-records";
const reminderEndpointPath = import.meta.env.VITE_REMINDERS_ENDPOINT_PATH || "/reminders";

export class ProgressMonitoringApi {
    constructor() {
        const api = new BaseApi();
        this.progressEndpoint = new BaseEndpoint(api, progressEndpointPath);
        this.habitEndpoint = new BaseEndpoint(api, habitEndpointPath);
        this.reminderEndpoint = new BaseEndpoint(api, reminderEndpointPath);
        this.progressAssembler = new ProgressRecordAssembler();
        this.habitAssembler = new HabitRecordAssembler();
    }

    async registerProgress(progress) {
        const response = await this.progressEndpoint.create(progress);
        return this.progressAssembler.toEntityFromResource(response.data);
    }

    async getProgressByUser(userId) {
        const response = await this.progressEndpoint.getAll();
        const resources = (response.data || []).filter(record => Number(record.userId) === Number(userId));
        return resources.map(resource => this.progressAssembler.toEntityFromResource(resource));
    }

    async registerHabit(habit) {
        const response = await this.habitEndpoint.create(habit);
        return this.habitAssembler.toEntityFromResource(response.data);
    }

    async getHabitsByUser(userId) {
        const response = await this.habitEndpoint.getAll();
        const resources = (response.data || []).filter(record => Number(record.userId) === Number(userId));
        return resources.map(resource => this.habitAssembler.toEntityFromResource(resource));
    }

    async updateHabit(habit) {
        if (!habit.id) return habit;
        const response = await this.habitEndpoint.update(habit.id, habit);
        return this.habitAssembler.toEntityFromResource(response.data);
    }

    async getReminderByUser(userId) {
        const response = await this.reminderEndpoint.getAll();
        return (response.data || []).find(reminder => Number(reminder.userId) === Number(userId)) || null;
    }

    async updateReminder(reminder) {
        if (reminder.id) {
            const response = await this.reminderEndpoint.update(reminder.id, reminder);
            return response.data;
        }
        const response = await this.reminderEndpoint.create(reminder);
        return response.data;
    }
}
