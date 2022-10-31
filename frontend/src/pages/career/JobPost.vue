<template>
  <q-page class="q-pa-md flex flex-center row justify-center">
    <div class="text-h4">{{ job.title }}</div>
    <div class="text-h6 text-primary">Company: {{ job.company.username }}</div>
    <div class="text-subtitle2">City: {{ job.city }}</div>
    <div class="text-subtitle1">Required Skills</div>
    <div class="text-subtitle2">
      {{ job.profession }}
    </div>

    <div
      class="text-subtitle1"
      v-for="(skills, idx) in job.subProfession"
      :key="idx"
    >
      <q-chip> {{ skills }}</q-chip>
    </div>

    <div class="q-pb-md">{{ job.longDesc }}</div>
    <q-chip>
      <q-avatar icon="money" color="secondary" text-color="white" />
      {{ job.paymentType }} {{ job.currency }}: {{ job.salaryFrom }} -
      {{ job.currency }}:
      {{ job.salaryTo }}
    </q-chip>

    <div></div>
    <q-chip
      outline
      color="primary"
      text-color="white"
      size="md"
      v-for="(val, idx) in job.jobType"
      :key="idx"
      >{{ val }}
    </q-chip>
    <q-btn flat class="q-ma-md" @click="applyJob(job)" label="APPLY"> </q-btn
  ></q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useIrisStore } from "src/stores/iris";
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "JobPost",
  setup() {
    const store = useIrisStore();
    const route = useRoute();
    let job = ref({});
    let getJobPost = () => {
      api.get(`job/${route.params.slug}`).then((res) => {
        job.value = res.data.job;
      });
    };
    getJobPost();

    return {
      store,
      job,
    };
  },
  methods: {
    applyJob() {
      api
        .post("/proposal", {
          companyId: this.job.company,
          jobId: this.job._id,
        })
        .then((res) => {
          this.showNotif(res.data.msg, "green");
        });
    },
  },
});
</script>
