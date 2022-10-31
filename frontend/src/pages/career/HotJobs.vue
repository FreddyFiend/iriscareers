<template>
  <div class="q-pa-md row justify-center items-start" style="min-height: 100vh">
    <div v-for="job in govJobs" :key="job._id">
      <div class="row justify-center items-center" style="">
        <div class="col-2">
          <!--  :src="`uploads/${job.imageLink}`" -->
          <q-img
            class="q-pa-md"
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt3228774%2F&psig=AOvVaw3oLPDGujtBCygqCPqg9vaW&ust=1666984880322000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCKDKoeGQgfsCFQAAAAAdAAAAABAD"
            alt=""
            srcset=""
            style="height: 140px; max-width: 150px"
          />
        </div>
        <div class="col-6">
          <div class="text-h4 q-pa-md">{{ job.title }}</div>
          <div class="text-subtitle1 q-pa-md">{{ job.shortDesc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent } from "vue";
import { useIrisStore } from "src/stores/iris";

export default defineComponent({
  name: "HotJobs",
  setup() {
    const store = useIrisStore();
    return {
      store,
    };
  },
  data() {
    return { govJobs: [] };
  },
  methods: {
    getGovJobs() {
      api.get("govjob").then((res) => {
        this.govJobs = res.data.govJobs;
      });
    },
  },
  mounted() {
    this.getGovJobs();
  },
});
</script>
<style lang="scss" scoped>
.my-custom-toggle {
  border: 1px solid #027be3;
}
</style>
