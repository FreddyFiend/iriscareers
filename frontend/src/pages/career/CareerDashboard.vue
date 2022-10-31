<template>
  <q-page class="q-pa-md bg-grey-2">
    <div
      class="row q-col-gutter-md"
      v-if="this.$route.params.slug === this.store.user.slug"
    >
      <dashboardCard
        class="col-md-3 col-sm-6 col-xs-12"
        icon="cases"
        color="blue-4"
        title="JOB OFFERS"
        caption="24"
      />
      <dashboardCard
        class="col-md-3 col-sm-6 col-xs-12"
        icon="assignment"
        color="cyan-4"
        title="JOBS APPLIED"
        caption="52"
      />
      <dashboardCard
        class="col-md-3 col-sm-6 col-xs-12"
        icon="person"
        color="green-4"
        title="PROFILE VIEWS"
        caption="45"
      />
      <dashboardCard
        class="col-md-3 col-sm-6 col-xs-12"
        icon="mail"
        color="yellow-4"
        title="MESSAGES"
        caption="3"
      />
    </div>
    <!-- Profile setup -->
  </q-page>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useIrisStore } from "src/stores/iris";
import dashboardCard from "src/components/career/dashboardCard.vue";
import { api } from "src/boot/axios";
export default defineComponent({
  name: "CareerDashboard",
  setup() {
    const store = useIrisStore();

    return { store };
  },
  data() {
    return {
      user: {},
    };
  },

  mounted() {
    if (this.store.user.isCompany) {
      /*  setTimeout(() => {
        api.get(`job/bycompany/${this.user.slug}`).then((res) => {
          console.log(res);
          this.jobPosts = res.data.jobs;
        });
      }, 500); //wait 5 miliseconds} */
    }
    try {
      api.defaults.headers.common["Authorization"] =
        "Bearer " + this.store.user.token;
    } catch (e) {
      console.log(e);
    }
    api.get(`user/single/${this.$route.params.slug}`).then((res) => {
      console.log(this.$route.params.slug);
      this.user = res.data.user;
      this.professionsLength = this.user.professions.length;
    });
  },
  components: {
    dashboardCard,
  },
});
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  height: 150px;
}
.hr {
  width: 100%;
  height: 1px;
  background-color: black;
}
</style>
