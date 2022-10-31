<template>
  <div
    class="profession q-ma-sm q-pa-md col-12 bg-white shadow-6"
    style="border-radius: 12px"
  >
    <q-btn
      icon="edit"
      class="float-right"
      v-if="this.$route.params.slug === this.store?.user?.slug"
      @click="$router.push({ path: '/addexperience', replace: true })"
    />
    <h5>Experiences</h5>
    <div class="text-subtitle2" v-if="!userData?.experiences?.length">
      Empty
    </div>
    <div
      class="q-pa-md"
      v-for="(experience, idx) in userData.experiences"
      :key="idx"
    >
      <div class="text-subtitle1">Company:</div>
      <div class="text-h6">{{ experience.company }}</div>
      <div class="text-subtitle1"></div>
      <div class="text-subtitle1">{{ experience.description }}</div>

      <div class="text-subtitle2">
        {{ experience.startYear }} - {{ experience.endYear }}
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
