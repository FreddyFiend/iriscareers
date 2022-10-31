<template>
  <div
    class="profession q-ma-sm q-pa-md col-12 bg-white shadow-6"
    style="border-radius: 12px"
  >
    <q-btn
      icon="edit"
      class="float-right"
      v-if="this.$route.params.slug === this.store?.user?.slug"
      @click="$router.push({ path: '/addeducation', replace: true })"
    />
    <h5>Educations</h5>
    <div class="text-subtitle2" v-if="!userData?.educations?.length">Empty</div>
    <div
      class="q-pa-md"
      v-for="(education, idx) in userData.educations"
      :key="idx"
    >
      <div class="text-subtitle1">University:</div>
      <div class="text-h6">{{ education.university }}</div>
      <div class="text-subtitle1">Degree:</div>
      <div class="text-subtitle2">{{ education.degree }}</div>
      <div class="text-subtitle1">CGPA:</div>
      <div class="text-h6">
        {{ education.cgpa }} out of {{ education.outOf }}
      </div>
      <div class="text-subtitle2">
        {{ education.startYear }} - {{ education.endYear }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useIrisStore } from "src/stores/iris";

export default defineComponent({
  props: ["userData"],
  setup() {
    const store = useIrisStore();
    return { store };
  },
});
</script>
