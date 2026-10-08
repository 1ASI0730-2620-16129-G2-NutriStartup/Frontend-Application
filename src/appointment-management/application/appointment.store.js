import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AppointmentApi } from '@/appointment-management/infrastructure/appointment-api.js';
import { AppointmentAssembler } from '@/appointment-management/infrastructure/appointment.assembler.js';
import { AvailabilityAssembler } from '@/appointment-management/infrastructure/availability.assembler.js';
import { ConsultationAssembler } from '@/appointment-management/infrastructure/consultation.assembler.js';

const api = new AppointmentApi();

export const useAppointmentStore = defineStore('appointment', () => {
    const appointments = ref([]);
    const availabilities = ref([]);
    const consultations = ref([]);
    const errors = ref([]);
    const appointmentsLoaded = ref(false);
    const availabilityLoaded = ref(false);
    const consultationsLoaded = ref(false);

    const appointmentsCount = computed(() => (appointmentsLoaded.value ? appointments.value.length : 0));
    const availabilityCount = computed(() => (availabilityLoaded.value ? availabilities.value.length : 0));
    const consultationsCount = computed(() => (consultationsLoaded.value ? consultations.value.length : 0));

    function handleError(error) {
        console.error(error);
        errors.value.push(error);
    }

    function createAppointment(appointment) {
        return api
            .createAppointment(appointment)
            .then((response) => {
                const created = AppointmentAssembler.toEntityFromResource(response.data);
                appointments.value.push(created);
                return created;
            })
            .catch((error) => {
                handleError(error);
                throw error;
            });
    }

    function getAppointmentsByUser(userId) {
        return api
            .getAppointmentsByUser(userId)
            .then((response) => {
                appointments.value = AppointmentAssembler.toEntitiesFromResponse(response);
                appointmentsLoaded.value = true;
            })
            .catch(handleError);
    }

    function cancelAppointment(id) {
        const appointment = appointments.value.find((a) => String(a.id) === String(id));
        if (!appointment) return Promise.reject(new Error('Appointment not found'));
        return api
            .cancelAppointment(appointment)
            .then(() => {
                appointment.cancel();
            })
            .catch((error) => {
                handleError(error);
                throw error;
            });
    }

    function deleteAppointment(id) {
        return api
            .deleteAppointment(id)
            .then(() => {
                appointments.value = appointments.value.filter((a) => String(a.id) !== String(id));
            })
            .catch((error) => {
                handleError(error);
                throw error;
            });
    }

    function getAvailability(nutritionistId) {
        return api
            .getAvailability(nutritionistId)
            .then((response) => {
                availabilities.value = AvailabilityAssembler.toEntitiesFromResponse(response);
                availabilityLoaded.value = true;
            })
            .catch(handleError);
    }

    function registerConsultation(consultation) {
        return api
            .registerConsultation(consultation)
            .then((response) => {
                const created = ConsultationAssembler.toEntityFromResource(response.data);
                consultations.value.push(created);
                consultationsLoaded.value = true;
                return created;
            })
            .catch((error) => {
                handleError(error);
                throw error;
            });
    }

    return {
        appointments, availabilities, consultations, errors,
        appointmentsLoaded, availabilityLoaded, consultationsLoaded,
        appointmentsCount, availabilityCount, consultationsCount,
        createAppointment, getAppointmentsByUser, cancelAppointment, deleteAppointment,
        getAvailability, registerConsultation,
    };
});