<template>
  <div>
    <div
      class="card bg-white row justify-between items-center shadow-6"
      style="border-radius: 12px"
    >
      <q-avatar
        :icon="icon"
        :color="color"
        text-color="white"
        class="q-ma-md"
        size="60px"
      />
      <div class="q-pa-md text-right row">
        <div class="col-12 text-h6">{{ title }}</div>
        <div class="col-12 q-px-md text-subtitle2">{{ caption }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "dashboardCard",
  props: ["icon", "color", "title", "caption"],
});
</script>
