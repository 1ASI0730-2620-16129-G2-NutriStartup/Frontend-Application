<script setup>
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const props = defineProps({visible: {type: Boolean, default: false}});
const emit = defineEmits(["update:visible", "save"]);

function today() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const form = ref({date: today(), weight: null, bodyFat: null, waist: null, hip: null, activityMinutes: 0, planCompliance: 0, notes: ""});

watch(() => props.visible, visible => {
    if (visible) {
        form.value = {date: today(), weight: null, bodyFat: null, waist: null, hip: null, activityMinutes: 0, planCompliance: 0, notes: ""};
    }
});

function close() {
    emit("update:visible", false);
}

function registerProgress() {
    emit("save", {...form.value});
}
</script>

<template>
  <pv-dialog :visible="visible" modal :header="t('progress.registrationTitle')" :style="{width: '42rem'}" :breakpoints="{'960px': '75vw', '640px': '95vw'}" @update:visible="emit('update:visible', $event)">
    <form class="grid" @submit.prevent="registerProgress">
      <div class="col-12 md:col-6">
        <label class="block font-medium mb-2" for="progress-date">{{ t('progress.date') }} *</label>
        <pv-input-text id="progress-date" v-model="form.date" type="date" class="w-full" required />
      </div>
      <div class="col-12 md:col-6">
        <label class="block font-medium mb-2" for="progress-weight">{{ t('progress.weight') }} (kg) *</label>
        <pv-input-number input-id="progress-weight" v-model="form.weight" :min="1" :max="400" :min-fraction-digits="1" :max-fraction-digits="1" class="w-full" required />
      </div>
      <div class="col-12 md:col-4">
        <label class="block font-medium mb-2" for="progress-waist">{{ t('progress.waist') }} (cm)</label>
        <pv-input-number input-id="progress-waist" v-model="form.waist" :min="1" :max="300" class="w-full" />
      </div>
      <div class="col-12 md:col-4">
        <label class="block font-medium mb-2" for="progress-hip">{{ t('progress.hip') }} (cm)</label>
        <pv-input-number input-id="progress-hip" v-model="form.hip" :min="1" :max="300" class="w-full" />
      </div>
      <div class="col-12 md:col-4">
        <label class="block font-medium mb-2" for="progress-fat">{{ t('progress.bodyFat') }} (%)</label>
        <pv-input-number input-id="progress-fat" v-model="form.bodyFat" :min="0" :max="100" :max-fraction-digits="1" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label class="block font-medium mb-2" for="progress-activity">{{ t('progress.activity') }} (min)</label>
        <pv-input-number input-id="progress-activity" v-model="form.activityMinutes" :min="0" :max="1440" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label class="block font-medium mb-2" for="progress-compliance">{{ t('progress.planCompliance') }} (%)</label>
        <pv-input-number input-id="progress-compliance" v-model="form.planCompliance" :min="0" :max="100" suffix=" %" class="w-full" />
      </div>
      <div class="col-12">
        <label class="block font-medium mb-2" for="progress-notes">{{ t('progress.notes') }}</label>
        <pv-textarea id="progress-notes" v-model="form.notes" rows="2" auto-resize class="w-full" />
      </div>
      <div class="col-12 flex justify-content-end gap-2">
        <pv-button :label="t('progress.cancel')" severity="secondary" text type="button" @click="close" />
        <pv-button :label="t('progress.save')" icon="pi pi-check" type="submit" />
      </div>
    </form>
  </pv-dialog>
</template>
