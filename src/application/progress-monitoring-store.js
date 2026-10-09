import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {ProgressRecord} from "../../../../Downloads/Fronted-Aplication-Progress-Monitoring-BC/Fronted-Aplication/src/domain/model/progress-record.js";
import {HabitRecord} from "../../../../Downloads/Fronted-Aplication-Progress-Monitoring-BC/Fronted-Aplication/src/domain/model/habit-record.js";
import {ProgressMonitoringApi} from "../../../../Downloads/Fronted-Aplication-Progress-Monitoring-BC/Fronted-Aplication/src/infrastructure/progress-monitoring-api.js";

const demoUserId = 1;
const api = new ProgressMonitoringApi();

const demoProgress = [
    new ProgressRecord({id: 1, userId: demoUserId, date: "2026-10-01", weight: 76.8, bodyFat: 25.2, waist: 91, hip: 102, activityMinutes: 25, planCompliance: 72, notes: "Inicio del seguimiento"}),
    new ProgressRecord({id: 2, userId: demoUserId, date: "2026-10-04", weight: 76.0, bodyFat: 24.9, waist: 90, hip: 101, activityMinutes: 35, planCompliance: 78, notes: "Manteniendo la rutina"}),
    new ProgressRecord({id: 3, userId: demoUserId, date: "2026-10-07", weight: 75.1, bodyFat: 24.5, waist: 88, hip: 100, activityMinutes: 45, planCompliance: 88, notes: "Buen avance semanal"})
];

const demoHabits = [
    new HabitRecord({id: 1, userId: demoUserId, date: "2026-10-08", habitType: "Tomar agua", completed: true}),
    new HabitRecord({id: 2, userId: demoUserId, date: "2026-10-08", habitType: "Realizar actividad física", completed: true}),
    new HabitRecord({id: 3, userId: demoUserId, date: "2026-10-08", habitType: "Cumplir el plan nutricional", completed: false})
];

const defaultReminder = {
    id: 1,
    userId: demoUserId,
    name: "Seguimiento de hábitos",
    time: "20:00",
    active: true
};

export const useProgressMonitoringStore = defineStore("progressMonitoring", () => {
    const progressRecords = ref([]);
    const habitRecords = ref([]);
    const reminder = ref({...defaultReminder});
    const errors = ref([]);
    const progressLoaded = ref(false);
    const habitsLoaded = ref(false);

    const orderedProgress = computed(() => [...progressRecords.value].sort((a, b) => a.date.localeCompare(b.date)));
    const latestProgress = computed(() => orderedProgress.value[orderedProgress.value.length - 1] || null);
    const firstProgress = computed(() => orderedProgress.value[0] || null);
    const progressCount = computed(() => progressRecords.value.length);
    const habitsCount = computed(() => habitRecords.value.length);
    const completedHabitsCount = computed(() => habitRecords.value.filter(habit => habit.completed).length);
    const habitsCompletion = computed(() => habitsCount.value ? Math.round(completedHabitsCount.value / habitsCount.value * 100) : 0);
    const weightChange = computed(() => {
        if (!firstProgress.value || !latestProgress.value) return 0;
        return Number((latestProgress.value.weight - firstProgress.value.weight).toFixed(1));
    });
    const averageCompliance = computed(() => {
        if (!progressRecords.value.length) return 0;
        return Math.round(progressRecords.value.reduce((total, item) => total + item.planCompliance, 0) / progressRecords.value.length);
    });

    async function loadProgress(userId = demoUserId) {
        errors.value = [];
        try {
            progressRecords.value = await api.getProgressByUser(userId);
        } catch (error) {
            progressRecords.value = demoProgress.map(record => ProgressRecord.fromJSON(record));
            errors.value.push("No se pudo conectar con el servicio de progreso. Se muestran datos de ejemplo.");
        } finally {
            progressLoaded.value = true;
        }
    }

    async function getProgressByUser(userId = demoUserId) {
        try {
            progressRecords.value = await api.getProgressByUser(userId);
        } catch (error) {
            errors.value.push("No se pudo actualizar el historial de progreso.");
        }
        return orderedProgress.value;
    }

    async function registerProgress(data) {
        const progress = new ProgressRecord({...data, userId: data.userId || demoUserId});
        if (!progress.isValid()) throw new Error("Ingresa una fecha, un peso válido y valores correctos.");

        try {
            const saved = await api.registerProgress(progress.toJSON());
            progressRecords.value = [...progressRecords.value, saved];
        } catch (error) {
            progressRecords.value = [...progressRecords.value, progress];
            errors.value.push("El progreso se agregó en esta sesión, pero no se pudo guardar en el servidor.");
        }
        return progress;
    }

    async function loadHabits(userId = demoUserId) {
        try {
            habitRecords.value = await api.getHabitsByUser(userId);
        } catch (error) {
            habitRecords.value = demoHabits.map(habit => HabitRecord.fromJSON(habit));
            if (!errors.value.some(message => message.includes("hábitos"))) {
                errors.value.push("No se pudo conectar con el servicio de hábitos. Se muestran datos de ejemplo.");
            }
        } finally {
            habitsLoaded.value = true;
        }
    }

    async function getHabitsByUser(userId = demoUserId) {
        try {
            habitRecords.value = await api.getHabitsByUser(userId);
        } catch (error) {
            errors.value.push("No se pudo actualizar la lista de hábitos.");
        }
        return habitRecords.value;
    }

    async function registerHabit(data) {
        const habit = new HabitRecord({...data, userId: data.userId || demoUserId});
        if (!habit.isValid()) throw new Error("Escribe el nombre del hábito.");

        try {
            const saved = await api.registerHabit(habit.toJSON());
            habitRecords.value = [...habitRecords.value, saved];
        } catch (error) {
            habitRecords.value = [...habitRecords.value, habit];
            errors.value.push("El hábito se agregó en esta sesión, pero no se pudo guardar en el servidor.");
        }
        return habit;
    }

    async function updateHabit(habitData) {
        const updatedHabit = new HabitRecord(habitData);
        try {
            if (updatedHabit.id) await api.updateHabit(updatedHabit.toJSON ? {...updatedHabit.toJSON(), id: updatedHabit.id} : updatedHabit);
        } catch (error) {
            errors.value.push("El estado del hábito cambió localmente, pero no se pudo actualizar en el servidor.");
        }
        habitRecords.value = habitRecords.value.map(habit => {
            const sameRecord = updatedHabit.id
                ? habit.id === updatedHabit.id
                : habit.date === updatedHabit.date && habit.habitType === updatedHabit.habitType;
            return sameRecord ? updatedHabit : habit;
        });
    }

    async function loadReminder(userId = demoUserId) {
        try {
            reminder.value = (await api.getReminderByUser(userId)) || {...defaultReminder};
        } catch (error) {
            reminder.value = {...defaultReminder};
        }
    }

    async function updateReminder(active) {
        const nextReminder = {...reminder.value, active};
        reminder.value = nextReminder;
        try {
            reminder.value = await api.updateReminder(nextReminder);
        } catch (error) {
            errors.value.push("El recordatorio cambió localmente, pero no se pudo guardar en el servidor.");
        }
    }

    async function load(userId = demoUserId) {
        await Promise.all([loadProgress(userId), loadHabits(userId), loadReminder(userId)]);
    }

    return {
        progressRecords,
        habitRecords,
        reminder,
        errors,
        progressLoaded,
        habitsLoaded,
        orderedProgress,
        latestProgress,
        firstProgress,
        progressCount,
        habitsCount,
        completedHabitsCount,
        habitsCompletion,
        weightChange,
        averageCompliance,
        load,
        loadProgress,
        getProgressByUser,
        registerProgress,
        loadHabits,
        getHabitsByUser,
        registerHabit,
        updateHabit,
        updateReminder
    };
});
