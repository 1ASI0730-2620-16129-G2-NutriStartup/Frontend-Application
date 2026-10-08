export class Consultation {
    constructor({ id = null, appointmentId, notes = '', recommendations = '', date }) {
        this.id = id;
        this.appointmentId = appointmentId;
        this.notes = notes;
        this.recommendations = recommendations;
        this.date = date;
    }
}