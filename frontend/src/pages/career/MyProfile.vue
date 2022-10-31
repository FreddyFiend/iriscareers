<template>
  <q-page class="q-pa-md bg-grey-2">
    <div
      class="row q-col-gutter-md"
      v-if="this.$route.params.slug === this.store?.user?.slug"
    >
      <!-- job seeker -->
      <div
        v-for="(val, idx) in cards"
        :key="idx"
        class="dashboard-card"
        @click="this.$router.push(`${val.link}`)"
        v-if="!this.store?.user?.isCompany"
      >
        <div
          class="card bg-white row justify-between items-center shadow-6"
          style="border-radius: 12px"
        >
          <q-avatar
            :icon="val.icon"
            :color="val.color"
            text-color="white"
            class="q-ma-md"
            size="90px"
          />
          <div class="q-pa-md text-right row">
            <div class="text-h6 col-12">{{ val.title }}</div>
            <div class="col-12 q-px-md text-h6">{{ val.caption }}</div>
          </div>
        </div>
      </div>
      <div
        v-for="(val, idx) in cardsC"
        :key="idx"
        class="dashboard-card"
        @click="this.$router.push(`${val.link}`)"
        v-if="this.store?.user?.isCompany"
      >
        <div
          class="card bg-white row justify-between items-center shadow-6"
          style="border-radius: 12px"
        >
          <q-avatar
            :icon="val.icon"
            :color="val.color"
            text-color="white"
            class="q-ma-md"
            size="90px"
          />
          <div class="q-pa-md text-right row">
            <div class="text-h6 col-12">{{ val.title }}</div>
            <div class="col-12 q-px-md text-h6">{{ val.caption }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Profile setup -->
    <div class="q-py-md row justify-center items-start">
      <div class="col-md-3 col-sm-4 col-xs-12 text-center">
        <div
          class="q-pa-md profile q-ma-sm bg-white shadow-6 row"
          style="border-radius: 12px"
        >
          <div
            class="col-10"
            v-if="this.$route.params.slug === this.store?.user?.slug"
          ></div>
          <q-btn
            icon="edit"
            class="float-right col-2"
            @click="$router.push({ name: 'editProfile', replace: true })"
            v-if="this.$route.params.slug === this.store?.user?.slug"
          />

          <q-knob
            show-value
            font-size="10px"
            class="q-ma-md col shadow-box"
            v-model="profileCompleted"
            size="130px"
            :thickness="0.1"
            color="primary"
            track-color="grey-1"
          >
            <q-avatar size="100px" class="shadow-6">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-knob>
          <div class="col-12 text-subtitle1">{{ profileCompleted }}%</div>
          <h6 class="col-12">{{ user.username }}</h6>
          <div class="col-12 text-subtitle2">{{ user.email }}</div>
          <div class="q-px-md text-subtitle2">Info:</div>
          <div class="q-mx-md hr" />
          <div class="col-12 row">
            <div class="q-pa-md text-subtitle1">Bio:</div>
            <div class="q-pa-md text-black text-subtitle2">{{ user.bio }}</div>
          </div>
          <div class="col-12 row">
            <q-icon class="q-pa-md" name="phone" size="24px" />
            <div class="q-pa-md text-black text-subtitle2">
              {{ user.phone }}
            </div>
          </div>
        </div>
        <!-- Address -->
        <div
          class="q-pa-md q-ma-sm profile bg-white shadow-6 row"
          style="border-radius: 12px"
        >
          <div
            class="col-10"
            v-if="this.$route.params.slug === this.store?.user?.slug"
          ></div>
          <q-btn
            icon="edit"
            class="float-right col-2"
            @click="$router.push({ path: '/addaddress', replace: true })"
            v-if="this.$route.params.slug === this.store?.user?.slug"
          />
          <div class="text-h5 q-my-sm col-12">Address</div>
          <div class="text-subtitle2 col-12">
            Country: {{ user?.address?.country }}
          </div>
          <div class="text-subtitle1 col-12">
            State: {{ user?.address?.state }}
          </div>
          <div class="text-subtitle2 col-12">
            City: {{ user?.address?.city }}
          </div>
        </div>
      </div>
      <!-- Profession -->
      <div class="col-md-9 col-sm-8 col-xs-12">
        <Professions v-if="!user.isCompany" :user-data="user" />
        <!-- Jobs -->
        <div
          class="profession q-ma-sm q-pa-md col-12 bg-white shadow-6"
          style="border-radius: 12px"
          v-if="user.isCompany"
        >
          <q-btn
            icon="add"
            class="float-right"
            @click="$router.push({ path: '/postjob', replace: true })"
            v-if="this.$route.params.slug === this.store?.user?.slug"
          />
          <h5>Job Posts</h5>
          <JobPosts :posts="jobPosts" />
        </div>

        <!-- Education -->
        <Educations v-if="!user.isCompany" :user-data="user" />

        <!-- Experience -->
        <Experiences v-if="!user.isCompany" :user-data="user" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useIrisStore } from "src/stores/iris";
import dashboardCard from "src/components/career/dashboardCard.vue";
import Professions from "src/components/career/Professions.vue";
import JobPosts from "src/components/career/JobPosts.vue";
import { api } from "src/boot/axios";
import Educations from "src/components/career/Educations.vue";
import Experiences from "src/components/career/Experiences.vue";
let cards = [
  /*
  {
    icon: "cases",
    color: "blue-4",
    title: "JOB OFFERS",
    caption: "",
    link: "",
  }, */
  {
    icon: "assignment",
    color: "cyan-4",
    title: "JOBS APPLIED",
    caption: "",
    link: "/jobsapplied",
  } /*
  {
    icon: "person",
    color: "green-4",
    title: "PROFILE VIEWS",
    caption: "",
    link: "",
  },
  {
    icon: "mail",
    color: "yellow-4",
    title: "MESSAGES",
    caption: "",
    link: "",
  }, */,
];
let cardsC = [
  /*
  {
    icon: "cases",
    color: "blue-4",
    title: "JOB OFFERS",
    caption: "",
    link: "",
  }, */
  {
    icon: "assignment",
    color: "cyan-4",
    title: "Job Applicants",
    caption: "",
    link: "/receivedproposals",
  } /*
  {
    icon: "person",
    color: "green-4",
    title: "PROFILE VIEWS",
    caption: "",
    link: "",
  },
  {
    icon: "mail",
    color: "yellow-4",
    title: "MESSAGES",
    caption: "",
    link: "",
  }, */,
];
export default defineComponent({
  name: "myprofile",
  setup() {
    const store = useIrisStore();
    let profileCompleted = ref(0);

    return { store, profileCompleted };
  },
  name: "mycareerprofile",
  data() {
    return {
      cards,
      cardsC,
      user: {},
      professionsLength: 0,
      jobPosts: [],
    };
  },
  methods: {
    getUserData() {
      api
        .get(`job/bycompany/${this.$route.params.slug}`)
        .then((res) => {
          console.log(res.data.jobs);
          this.jobPosts = res.data.jobs;
        })
        .catch((e) => {
          console.log(e);
        });

      api
        .get(`user/single/${this.$route.params.slug}`)
        .then((res) => {
          console.log(res.data.user);
          this.profileCompleted = res.data.user.profileCompleted * 20;
          this.user = res.data.user;
          console.log(res.data.user);

          localStorage.setItem("loadedUser", JSON.stringify(res.data.user));

          // this.cards[0].caption = res.data.user.proposalCount;
          this.professionsLength = this.user.professions.length;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    console.log(this.$route.params);
    this.$watch(
      () => this.$route.params.slug,
      () => {
        this.getUserData();
      }
    );
    this.getUserData();
  },
  components: {
    dashboardCard,
    Professions,
    JobPosts,
    Educations,
    Experiences,
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
.dashboard-card:hover {
  cursor: pointer;
}
</style>
