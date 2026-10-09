import {HabitRecord} from "../domain/model/habit-record.js";

export class HabitRecordAssembler {
    toEntityFromResource(resource) {
        return HabitRecord.fromJSON(resource);
    }

    toEntitiesFromResponse(response) {
        return (response.data || []).map(resource => this.toEntityFromResource(resource));
    }
}
