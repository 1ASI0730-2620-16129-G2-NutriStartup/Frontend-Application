import { BaseApi } from '@/shared/infrastructure/base-api.js';
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js';

const habitRecordsPath = import.meta.env.VITE_HABIT_RECORDS_ENDPOINT_PATH;

export class ProgressMonitoringApi extends BaseApi {
    #habitRecordEndpoint;

    constructor() {
        super();
        this.#habitRecordEndpoint = new BaseEndpoint(this, habitRecordsPath);
    }
    
    getHabitRecordsByUser(userId, { from = '', to = '' } = {}) {
        const params = { userId, _sort: 'date,createdAt', _order: 'desc,desc' };
        if (from) params.date_gte = from;
        if (to) params.date_lte = to;
        return this.http.get(habitRecordsPath, { params });
    }
    
    createHabitRecord(resource) {
        const habitRecord = { ...resource };
        delete habitRecord.id;
        return this.#habitRecordEndpoint.create(habitRecord);
    }
}