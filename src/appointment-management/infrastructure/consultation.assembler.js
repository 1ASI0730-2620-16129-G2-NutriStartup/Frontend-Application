import { Consultation } from '../domain/model/consultation.entity.js';

export class ConsultationAssembler {
    static toEntityFromResource(resource) {
        return new Consultation({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        const data = Array.isArray(response.data) ? response.data : response.data.consultations ?? [];
        return data.map((resource) => ConsultationAssembler.toEntityFromResource(resource));
    }
}