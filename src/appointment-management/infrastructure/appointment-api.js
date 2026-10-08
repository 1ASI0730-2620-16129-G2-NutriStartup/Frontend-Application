import { BaseApi } from '@/shared/infrastructure/base-api.js';
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js';

export class AppointmentApi extends BaseApi {
    #appointmentEndpoint;
    #availabilityEndpoint;
    #consultationEndpoint;

    constructor() {
        super();
        this.#appointmentEndpoint = new BaseEndpoint(this, import.meta.env.VITE_APPOINTMENTS_ENDPOINT_PATH);
        this.#availabilityEndpoint = new BaseEndpoint(this, import.meta.env.VITE_AVAILABILITIES_ENDPOINT_PATH);
        this.#consultationEndpoint = new BaseEndpoint(this, import.meta.env.VITE_CONSULTATIONS_ENDPOINT_PATH);
    }

    createAppointment(resource) {
        return this.#appointmentEndpoint.create(resource);
    }

    getAppointmentsByUser(userId) {
        return this.#appointmentEndpoint.getAll({ userId });
    }

    cancelAppointment(id) {
        return this.#appointmentEndpoint.patch(id, { status: 'CANCELLED' });
    }

    getAvailability(nutritionistId) {
        const params = nutritionistId ? { nutritionistId } : {};
        return this.#availabilityEndpoint.getAll(params);
    }

    registerConsultation(resource) {
        return this.#consultationEndpoint.create(resource);
    }
}