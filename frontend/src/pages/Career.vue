<template>
  <div>
    <div class="home">
      <section class="row justify-center items-center" v-if="!isSearched">
        <div class="content q-pa-md col-md-8 col-sm-10 col-xs-12 text-white">
          <h2>
            Find a job that you
            <span style="color: #e65d09">
              <h2 style="color: #e65d09; font-weight: 500">Desire.</h2>
            </span>
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
            labore, sint cupiditate distinctio tempora reiciendis.
          </p>
          <q-btn
            class="text-white col-5 btn"
            @click="this.$router.push('/learnmore')"
            outline
            dark
          >
            learn more
          </q-btn>
        </div>
      </section>
    </div>
    <q-btn @click="this.$router.push('/posthotjob')"> LG</q-btn>
    <div class="row">
      <div class="q-pa-md col-md-2 col-sm-3 col-xs-12 bg-grey-2">
        <div class="text-h6 q-pa-sm text-primary">Categories</div>
        <div
          class="q-pa-sm row justify-between cursor-pointer"
          v-for="(val, idx) in aggProfessions"
          :key="idx"
          @click="selectProfessionAgg(val)"
        >
          <div class="text-subtitle2">{{ val._id }}</div>
          <div class="text-subtitle1 rounded-borders">
            <q-badge outline color="primary"> {{ val.total }}</q-badge>
          </div>
        </div>
        <div class="text-h6 q-pa-sm text-primary">Cities</div>
        <div
          class="q-pa-sm row justify-between cursor-pointer"
          v-for="(val, idx) in aggCities"
          :key="idx"
          @click="selectCityAgg(val)"
        >
          <div class="text-subtitle2">{{ val._id }}</div>
          <div class="text-subtitle1 rounded-borders">
            <q-badge outline color="primary"> {{ val.total }}</q-badge>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-sm-6 col-xs-12">
        <div class="q-pa-lg row justify-center items-center">
          <q-input
            outlined
            class="q-pa-md"
            bottom-slots
            v-model="jobSearchModel"
            label="Search Job"
          >
            <template v-slot:before>
              <q-icon name="work" />
            </template>
          </q-input>

          <q-select
            style="min-width: 250px"
            class="q-pa-md"
            outlined
            :options="countryOptions"
            v-model="countryModel"
            label="Country"
            @update:model-value="onCountrySelect()"
          >
            <template v-slot:before> <q-icon name="pin_drop" /> </template
          ></q-select>
          <q-select
            style="min-width: 250px"
            class="q-pa-md"
            outlined
            v-model="cityModel"
            :options="
              cityOptions.map((city) => ({
                label: city.name,
                value: city.iso2,
              }))
            "
            label="City"
          >
            <template v-slot:before>
              <q-icon name="pin_drop" />
            </template>
          </q-select>
          <q-select
            class="q-pa-md"
            style="min-width: 250px"
            outlined
            v-model="professionModel"
            :options="options"
            label="Job Category"
            hide-dropdown-icon
            ><template v-slot:before>
              <q-icon name="category" />
            </template>
          </q-select>
          <q-btn
            class="q-pa-md"
            color="primary"
            rounded
            icon="search"
            @click="getJobs"
          ></q-btn>
        </div>

        <JobPosts :posts="jobPosts" @showDetails="selectJob" />
      </div>
      <div class="q-pa-md col-md-2 col-sm-3 col-xs-12 bg-grey-2">
        <div
          class="text-h6 q-pa-sm text-primary"
          @click="this.$router.push(`/hotjobs`)"
        >
          Hot Jobs
        </div>
        <div
          class="q-pa-sm row justify-between cursor-pointer"
          v-for="(val, idx) in govJobs"
          :key="idx"
          @click="selectCityAgg(val)"
        >
          <div class="text-subtitle2">{{ val.title }}</div>
        </div>
      </div>
    </div>

    <div class="row justify-start items-center q-gutter-xl">
      <div class="col-6"></div>
      <div class=""></div>
    </div>
    <div class="fixed-right"></div>
    <RegisterCompany
      :show-register-company-dialog="showRegisterCompanyDialog"
      v-on:hideRegisterCompanyDialog="hideRegisterCompanyDialog"
    />

    <RegisterDialog
      :show-dialog="showRegisterDialog"
      v-on:hideRegisterDialog="hideDialog"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import RegisterCompany from "src/components/RegisterCompany.vue";
import RegisterDialog from "src/components/RegisterDialog.vue";
import { api } from "src/boot/axios";
import JobPosts from "src/components/career/JobPosts.vue";
import professions from "./career/professions";
import { useQuasar } from "quasar";

let options = professions;

export default defineComponent({
  name: "Careers",
  setup() {
    const q = useQuasar();
    const professionOptions = ref(options);
    return {
      professionOptions,

      onCountrySelect() {
        console.log(this.countryModel.value);
        var config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${this.countryModel.value}/cities`,
          headers: {
            "X-CSCAPI-KEY":
              "bUxVZ3ZFUWlNWVlKQ3BzM1hSdG1GT0xHMGpkczJ5aU9OTXNxa1o1RQ==",
          },
        };
        this.$axios(config)
          .then((res) => {
            this.cityOptions = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            professionOptions.value = options;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          professionOptions.value = options.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      showNotif(msg, clr) {
        q.notify({
          message: msg,
          color: clr,
        });
      },
    };
  },
  data() {
    return {
      jobSearchModel: "",
      location: "",
      selectedJob: {},
      professionModel: "",
      jobPosts: [],
      countryModel: "",
      cityModel: "",
      countryOptions: ref([]),
      cityOptions: ref([]),
      splitterModel: ref(50), // start at 50%
      showRegisterDialog: false,
      showRegisterCompanyDialog: false,
      options,
      postSelected: false,
      isSearched: false,
      aggProfessions: [],
      aggCities: [],
      govJobs: [],
    };
  },
  methods: {
    getGovJobs() {
      api.get("govjob").then((res) => {
        this.govJobs = res.data.govJobs.map((v) => {
          if (v.title.length > 10) {
            return { title: v.title.substring(0, 20) + "...", _id: v._id };
          } else {
            return { title: v.title, _id: v._id };
          }
        });
      });
    },
    getJobCategories() {
      api.get("job/cat").then((res) => {
        this.options = res.data.categories;
      });
    },
    selectCityAgg(val) {
      console.log(val);
      this.cityModel = val._id;
      this.getJobs();
    },
    selectProfessionAgg(val) {
      console.log(val);
      this.professionModel = val._id;
      this.getJobs();
    },
    hideDialog() {
      this.showRegisterDialog = false;
    },
    hideRegisterCompanyDialog() {
      this.showRegisterCompanyDialog = false;
    },
    getJobs() {
      console.log(this.countryModel);
      api
        .get(
          `job?title=${this.jobSearchModel}&country=${this.countryModel}&city=${this.cityModel}&profession=${this.professionModel}`
        )
        .then((res) => {
          console.log(res.data);
          this.jobPosts = res.data.jobs;
          this.aggCities = res.data.aggCities;
          this.aggProfessions = res.data.aggProfessions;
        });
    },
  },
  components: {
    RegisterCompany,
    RegisterDialog,
    JobPosts,
  },
  mounted() {
    let config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY":
          "bUxVZ3ZFUWlNWVlKQ3BzM1hSdG1GT0xHMGpkczJ5aU9OTXNxa1o1RQ==",
      },
    };
    setTimeout(() => {
      this.$axios(config)
        .then((res) => {
          this.countryOptions = res.data.map((country) => ({
            label: country.name,
            value: country.iso2,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
    this.getJobs();
    this.getJobCategories();
    this.getGovJobs();
  },
});
</script>
<style lang="scss" scoped>
.home {
  background: url(~assets/career-home.jpg) no-repeat;
  background-size: cover;
  background-position: center;
}
section {
  //min-height: 100vh;

  background: rgba(0, 0, 0, 0.5);
}
.content {
  max-width: 800px;
  padding: 3em;
}
</style>
