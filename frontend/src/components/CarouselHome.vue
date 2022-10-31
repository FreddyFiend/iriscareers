<template>
  <q-carousel
    v-model="latest_slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    navigation
    padding
    infinite
    arrows
    class="rounded-borders gt-sm"
    style="background-color: rgb(230, 230, 230)"
  >
    <q-carousel-slide
      v-for="(val, idx1) in [1, 2]"
      :name="val"
      :key="idx1"
      class="column no-wrap"
    >
      <div
        class="row fit justify-center items-center q-gutter-md q-col-gutter no-wrap"
      >
        <q-card class="my-card" v-for="(card, idx2) in [0, 1, 2]" :key="idx2">
          <div class="">
            <q-img
              :src="getImgUrl(training[idx1 * 3 + card].img)"
              height="200px"
            >
              <div class="absolute-bottom text-center">
                <p>{{ training[idx1 * 3 + card].caption }}</p>
              </div>
            </q-img>
          </div>
        </q-card>
      </div>
    </q-carousel-slide>
  </q-carousel>
  <q-carousel
    v-model="latest_slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    navigation
    padding
    infinite
    arrows
    class="rounded-borders sm"
  >
    <q-carousel-slide
      v-for="(val, idx1) in [1, 2, 3]"
      :name="val"
      :key="idx1"
      class="column no-wrap"
    >
      <div
        class="row fit justify-center items-center q-gutter-md q-col-gutter no-wrap"
      >
        <q-card class="my-card" v-for="(card, idx2) in [0, 1]" :key="idx2">
          <div class="">
            <q-img
              :src="getImgUrl(training[idx1 * 2 + card].img)"
              height="200px"
            >
              <div class="absolute-bottom text-center">
                <p>{{ training[idx1 * 2 + card].caption }}</p>
              </div>
            </q-img>
          </div>
        </q-card>
      </div>
    </q-carousel-slide>
  </q-carousel>
  <q-carousel
    v-model="latest_slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-color="primary"
    navigation
    padding
    infinite
    arrows
    class="rounded-borders xs"
  >
    <q-carousel-slide
      v-for="(val, idx) in [1, 2, 3, 4, 5, 6]"
      :name="val"
      :key="idx"
      class="column no-wrap"
    >
      <div
        class="row fit justify-center items-center q-gutter-md q-col-gutter no-wrap"
      >
        <q-card class="my-card" :key="idx">
          <div class="">
            <q-img :src="getImgUrl(training[idx].img)" height="200px">
              <div class="absolute-bottom text-center">
                <p>{{ training[idx].caption }}</p>
              </div>
            </q-img>
          </div>
        </q-card>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { defineComponent } from "vue";
const cards = ["d", "d", "d", "d", "d", "d"];
const training = [
  {
    caption: "IELTS With AMAN KAUR KAHLON",
    img: "courses/training/ielts.jpg",
  },
  {
    caption: "Data Analysis in Quantitative Research with Saeed Javeed",
    img: "courses/training/dataanalysis.png",
  },
  {
    caption: "Research in Criminology With Dr.Waheed Abbasi",
    img: "courses/training/criminology.jpg",
  },
  {
    caption:
      "Research Methodology in Medical Sciences With Dr. Sarmad Jamal Siddiqui",
    img: "courses/training/research.jpg",
  },
  {
    caption: "Scholarship Hunt With Madam Anum Riaz",
    img: "courses/training/scholarship.jpg",
  },
  {
    caption:
      "INTRODUCTION TO SPSS-WITH Dr.Raheem Bux Soomro-Consultant on Entrepreneurship",
    img: "courses/training/spss.jpg",
  },
];
export default defineComponent({
  name: "CarouselHome",
  data() {
    return {
      slide: 1,
      latest_slide: 1,
      cards,
      training,
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    },
  },
  created() {},
});
</script>
<style lang="scss" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  float: right;
}
.my-card {
  width: 100%;
  max-width: 300px;
  min-width: 200px;
}
</style>
