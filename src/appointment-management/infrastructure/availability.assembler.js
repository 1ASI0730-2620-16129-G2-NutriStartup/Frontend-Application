import { Availability } from '../domain/model/availability.entity.js';

export class AvailabilityAssembler {
    static toEntityFromResource(resource) {
        return new Availability({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        const data = Array.isArray(response.data) ? response.data : response.data.availabilities ?? [];
        return data.map((resource) => AvailabilityAssembler.toEntityFromResource(resource));
    }
}