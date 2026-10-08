import { Appointment } from '../domain/model/appointment.entity.js';

export class AppointmentAssembler {
    static toEntityFromResource(resource) {
        return new Appointment({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        const data = Array.isArray(response.data) ? response.data : response.data.appointments ?? [];
        return data.map((resource) => AppointmentAssembler.toEntityFromResource(resource));
    }
}