import {ProgressRecord} from "../domain/model/progress-record.js";

export class ProgressRecordAssembler {
    toEntityFromResource(resource) {
        return ProgressRecord.fromJSON(resource);
    }

    toEntitiesFromResponse(response) {
        return (response.data || []).map(resource => this.toEntityFromResource(resource));
    }
}
