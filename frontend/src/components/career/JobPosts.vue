<template>
  <div v-for="(job, index) in posts" :key="index" class="q-pa-md">
    <div class="q-pa-md">
      <div class="text-h5">{{ job.title }}</div>
      <div
        @click="this.$router.push({ path: `/profile/${job.company.slug}` })"
        class="text-h6 q-my-xs text-primary cursor-pointer"
      >
        {{ job?.company?.username }}
      </div>
      <div class="text-subtitle2">{{ job.city }}, {{ job.country }}</div>
      {{ job.shortDesc }}
    </div>
    <div class="q-px-md text-subtitle1">{{ job.profession }}</div>
    <div class="q-pa-md">
      <q-chip>
        <q-avatar icon="money" color="secondary" text-color="white" />
        {{ job.paymentType }} {{ job.currency }}: {{ job.salaryFrom }} -
        {{ job.currency }}: {{ job.salaryTo }}
      </q-chip>
      <q-chip
        outline
        color="primary"
        text-color="white"
        size="md"
        v-for="(val, idx) in job.jobType"
        :key="idx"
      >
        {{ val }}
      </q-chip>
    </div>

    <div class="q-px-md">
      <q-btn @click="this.$router.push(`/jobpost/${job.slug}`)" flat
        >MORE DETAILS</q-btn
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useIrisStore } from "src/stores/iris";

export default defineComponent({
  props: ["posts"],
  setup() {
    const store = useIrisStore();
    return { store };
  },
  methods: {},
  data() {
    return {
      jobPostsDummy: [],
    };
  },
  mounted() {},
});
</script>
