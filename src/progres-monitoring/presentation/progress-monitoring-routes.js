const habitRecordList = () => import('@/progres-monitoring/presentation/views/habit-record-list.vue');

const habitRecordForm = () => import('@/progres-monitoring/presentation/views/habit-record-form.vue');

const progressMonitoringRoutes = [
    {
        path: 'habit-records-patient',
        name: 'habit-records-patient',
        component: habitRecordList,
        meta: {
            title: 'Habit Records'
        },
    },
    {
        path: 'habit-records-patient/new',
        name: 'habit-records-patient-new',
        component: habitRecordForm,
        meta: {
            title: 'New Habit Record'
        },
    },
];

export default progressMonitoringRoutes;