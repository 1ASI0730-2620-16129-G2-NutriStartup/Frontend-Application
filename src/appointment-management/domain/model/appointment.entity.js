export class Appointment {
    constructor({ id = null, userId, nutritionistId, date, startTime, endTime, status = 'PENDING', reason = '' }) {
        this.id = id;
        this.userId = userId;
        this.nutritionistId = nutritionistId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.reason = reason;
    }

    /** Una cita sigue "vigente" si no fue cancelada. */
    isAvailable() {
        return this.status !== 'CANCELLED';
    }

    cancel() {
        this.status = 'CANCELLED';
    }
}