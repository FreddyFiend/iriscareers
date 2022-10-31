<template>
  <q-page>
    <div class="home">
      <div class="wrapper row justify-center items-center">
        <div class="content row justify-center">
          <h5 class="q-pa-md col-md-4 col-sm-5 col-xs-12">
            WANT TO LEARN FROM THE BEST?
            <span style="color: #2859e0">IRIS</span> IS WHAT YOU NEED
          </h5>
          <div class="bg-primary col-1 gt-xs" style="width: 3px"></div>

          <div class="bg-primary col-12 xs" style="height: 3px"></div>
          <div
            class="q-pa-md caption-text text-subtitle2 col-md-6 col-sm-6 col-xs-12"
          >
            IRIS Provides high-quality courses from the best and experienced
            teachers for people all around the globe.
          </div>
          <q-btn
            outline
            class="q-ma-md q-mt-lg"
            color="primary"
            label="join now"
          />

          <q-btn
            outline
            class="q-ma-md q-mt-lg"
            color="secondary"
            label="learn more"
          />
        </div>
      </div>
    </div>

    <SignupDialog
      :show-dialog="showDialog"
      v-on:hideDialog="hideDialog"
    /><RegisterDialog
      :show-dialog="showRegisterDialog"
      v-on:hideRegisterDialog="hideDialog"
    /><!--
    <q-btn @click="showDialog = !showDialog"> Shpow</q-btn>
    <q-btn @click="showRegisterDialog = !showRegisterDialog"> Shpow</q-btn> -->
    <div id="learn" class="cards row justify-center cards-area">
      <CardHome v-for="card in cardDetails" :key="card.title" v-bind="card" />
    </div>
    <div class="q-pa-md portion-1 text-center">
      <h4 class="q-pt-md">
        OUR
        <span class="text-primary">TRAININGS</span>
      </h4>
      <p class="text-subtitle2">
        Trainings are saving your time, money and resources With limited Profit
      </p>
      <CarouselHome class="text-primary" />
      <q-btn
        class="q-ma-md"
        outline
        color="primary"
        label="See more trainings"
      />
    </div>
    <div class="q-pa-md portion-1 text-center">
      <h4 class="q-pt-md">
        OUR
        <span class="text-primary">LAW COURSES</span>
      </h4>
      <p class="text-subtitle2">we also provide law courses at IRIS</p>
      <CarouselHome />
      <q-btn
        class="q-ma-md"
        outline
        color="primary"
        label="See more law courses"
      />
    </div>
    <div class="portion-1 text-center">
      <h4 class="q-pt-md">
        OUR
        <span class="text-primary">SERVICES</span>
      </h4>
      <p class="text-subtitle2">
        Quality service are saving your time, money and resources With limited
        Profit
      </p>
      <CarouselHome />
      <q-btn
        class="q-ma-md"
        outline
        color="primary"
        label="See more services"
      />
    </div>
    <div class="portion-1 text-center">
      <h4 class="q-pt-md">
        FREELANCE
        <span class="text-primary">JOBS</span>
      </h4>
      <p class="text-subtitle2">Freelance Jobs provided by IRIS</p>
      <CarouselHome />
      <q-btn
        class="q-ma-md"
        outline
        color="primary"
        label="See more freelance jobs"
      />
    </div>

    <div class="q-pa-md row justify-center portion-1">
      <div
        class="q-pa-md col-xs-11 col-sm-9 col-md-8 col-lg-7 col-xl-6 row justify-start"
      >
        <h6>Our salary benchmark helps you find jobs with the right salary.</h6>
        <p class="text-subtitle2">
          We use comprehensive market data to analyze and calculate the JobLeads
          salary benchmark for each position. This enables you to search
          specifically for jobs with your preferred salary.
        </p>
      </div>
      <div class="q-pa-md col-xs-11 col-sm-9 col-md-8 col-lg-7 col-xl-6">
        <q-badge color="secondary">
          Salary range: Rs.{{ step.min }} to Rs.{{ step.max }}
        </q-badge>

        <q-range
          v-model="step"
          :min="5000"
          :max="300000"
          :step="5000"
          label
          color="primary"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import SignupDialog from "components/SignupDialog.vue";
import RegisterDialog from "components/RegisterDialog.vue";
import CardHome from "src/components/CardHome.vue";
import CarouselHome from "src/components/CarouselHome.vue";

const cardDetails = [
  {
    headerText: "JOIN IRIS AS LEARNER (VIRTUAL & PHYSICAL)",
    captionText:
      "Project developer, Budget Manager, Report writer, Trainers, Data analyst, Researcher, Resource Person, Teachers etc.",
    learnMore: "",
  },
  {
    headerText: "JOIN IRIS PROFESSIONAL PANEL (FREELANCE)",
    captionText: "For career development, As trainee, As Student",
    learnMore: "",
  },

  {
    headerText: "GET OUR SERVICES",
    captionText: "For Research Trainings Institution Development Publications",
    learnMore: "",
  },

  {
    headerText: "JOIN IRIS AS INTERNEE",
    captionText: "For career development, As trainee, As Student",
    learnMore: "",
  },

  {
    headerText: "JOIN IRIS AS CANDIDATE FOR CAREER MANAGEMENT",
    captionText: "IRIS is also for Career Management",
    learnMore: "",
  },

  {
    headerText:
      "JOIN IRIS TO MEET ACADEMIC GUIDANCE, COUNSELLING / COUSULTANCY",
    captionText: "Meet education advisor / consultant",
    learnMore: "",
  },
];

export default defineComponent({
  setup() {
    return {
      step: ref({
        min: 5000,
        max: 150000,
      }),
    };
  },
  name: "IndexPage",
  components: {
    SignupDialog,
    RegisterDialog,
    CardHome,
    CarouselHome,
  },
  data() {
    return {
      showDialog: false,
      showRegisterDialog: false,
      cardDetails,
    };
  },
  methods: {
    hideDialog() {
      this.showDialog = false;
      this.showRegisterDialog = false;
    },
  },
});
</script>
<style lang="scss" scoped>
.home {
  background: url(~assets/homepage.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
.wrapper {
  width: 100%;
  height: 100vh;
  text-align: start;
  background: rgba(0, 0, 0, 0.05);
}
.caption-text {
  background-color: rgba(255, 255, 255, 0.343);
}
.home-section {
  background-color: rgba(0, 0, 0, 0.198);
}
.content {
  max-width: 800px;
  padding: 2em;

  background: rgba(255, 255, 255, 0.4);
}
.cards-area {
  background-color: rgb(218, 218, 218);
}
.portion-1 {
  background-color: rgb(250, 250, 250);
}
</style>
