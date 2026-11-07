import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ProgressMonitoringApi } from '@/progress-monitoring/infrastructure/progress-monitoring-api.js';
import { HabitRecordAssembler } from '@/progress-monitoring/infrastructure/habit-record.assembler.js';

const api = new ProgressMonitoringApi();

export const useProgressMonitoringStore = defineStore('progress-monitoring', () => {
    const habitRecords = ref([]);
    const errors = ref([]);
    const habitRecordsLoaded = ref(false);

    const habitRecordsCount = computed(() => (habitRecordsLoaded.value ? habitRecords.value.length : 0));

    function handleError(error) {
        console.error(error);
        errors.value.push(error);
    }

    function getHabitRecordsByUser(userId, period) {
        errors.value = [];
        return api
            .getHabitRecordsByUser(userId, period)
            .then((response) => {
                habitRecords.value = HabitRecordAssembler.toEntitiesFromResponse(response);
                habitRecordsLoaded.value = true;
            })
            .catch(handleError);
    }

    function createHabitRecord(habitRecord) {
        return api
            .createHabitRecord(habitRecord)
            .then((response) => {
                const created = HabitRecordAssembler.toEntityFromResource(response.data);
                habitRecords.value.unshift(created);
                return created;
            })
            .catch((error) => {
                handleError(error);
                throw error;
            });
    }

    return {
        habitRecords, errors, habitRecordsLoaded, habitRecordsCount,
        getHabitRecordsByUser, createHabitRecord,
    };
});