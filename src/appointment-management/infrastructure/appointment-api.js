import { BaseApi } from '@/shared/infrastructure/base-api.js';
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js';

const appointmentsPath = import.meta.env.VITE_APPOINTMENTS_ENDPOINT_PATH;
const availabilitiesPath = import.meta.env.VITE_AVAILABILITIES_ENDPOINT_PATH;
const consultationsPath = import.meta.env.VITE_CONSULTATIONS_ENDPOINT_PATH;

export class AppointmentApi extends BaseApi {
    #appointmentEndpoint;
    #consultationEndpoint;

    constructor() {
        super();
        this.#appointmentEndpoint = new BaseEndpoint(this, appointmentsPath);
        this.#consultationEndpoint = new BaseEndpoint(this, consultationsPath);
    }

    createAppointment(resource) {
        return this.#appointmentEndpoint.create(resource);
    }

    getAppointmentsByUser(userId, role = 'patient') {
        const userField = role === 'nutritionist' ? 'nutritionistId' : 'userId';
        return this.http.get(appointmentsPath, { params: { [userField]: userId } });
    }

    cancelAppointment(appointment) {
        return this.#appointmentEndpoint.update(appointment.id, { ...appointment, status: 'CANCELLED' });
    }

    deleteAppointment(id) {
        return this.#appointmentEndpoint.delete(id);
    }

    getAvailability(nutritionistId) {
        const params = nutritionistId ? { nutritionistId } : {};
        return this.http.get(availabilitiesPath, { params });
    }

    registerConsultation(resource) {
        return this.#consultationEndpoint.create(resource);
    }
}
