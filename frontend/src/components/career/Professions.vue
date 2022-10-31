<template>
  <div
    class="profession q-ma-sm q-pa-md col-12 bg-white shadow-6"
    style="border-radius: 12px"
  >
    <q-btn
      icon="edit"
      class="float-right"
      v-if="this.$route.params.slug === this.store?.user?.slug"
      @click="$router.push({ path: '/addprofession', replace: true })"
    />
    <h5>Professions</h5>
    <div class="text-subtitle2" v-if="!userData?.professions?.length">
      Empty
    </div>
    <div
      class="q-pa-md"
      v-for="(profession, idx) in userData.professions"
      :key="idx"
    >
      <div class="text-h6">{{ profession.profession }}</div>
      <div class="text-subtitle2">Areas of work:</div>
      <div v-for="(subProfession, idx) in profession.subProfession" :key="idx">
        <q-chip>{{ subProfession }}</q-chip>
      </div>

      <div class="text-subtitle2">
        Skill:
        <q-rating
          v-model="profession.skillLevel"
          size="1.5em"
          color="primary"
          readonly
        />
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
