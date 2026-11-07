import { HabitRecord } from '@/progress-monitoring/domain/model/habit-record.entity.js';

export class HabitRecordAssembler {
    static toEntityFromResource(resource) {
        return new HabitRecord({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(response.statusText);
            return [];
        }
        const resources = Array.isArray(response.data) ? response.data : response.data.habitRecords ?? [];
        return resources.map((resource) => HabitRecordAssembler.toEntityFromResource(resource));
    }
}