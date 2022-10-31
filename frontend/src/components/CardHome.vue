<template>
  <q-card class="my-card q-ma-md row justify-center">
    <q-card-section class="card-header">
      <div class="header-text text-h6">{{ headerText }}</div>
    </q-card-section>
    <q-separator dark />
    <q-card-section class="card-caption"
      ><p class="subtitle-text text-subtitle2">
        {{ captionText }}
      </p></q-card-section
    >
    <q-card-actions class="options">
      <q-btn flat color="primary">Join Now</q-btn>
      <q-btn outline color="secondary" @click="alert = true">Learn more</q-btn>
    </q-card-actions>
  </q-card>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Learn More</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
        perferendis totam, ea at omnis vel numquam exercitationem aut, natus
        minima, porro labore.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardHome",
  props: {
    headerText: {
      type: String,
      required: true,
    },

    captionText: {
      type: String,
      default: "",
    },

    joinLink: {
      type: String,
      default: "#",
    },

    learnMore: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      alert: false,
    };
  },
});
</script>
<style lang="scss" scoped>
.my-card {
  background: url(~assets/card-texture.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 300px;
  text-align: center;

  box-shadow: inset 5px 5px 5x rgba(0, 0, 0, 0.05),
    inset -5px -5px 5x rgba($color: #fefefe, $alpha: 0.5),
    5px 5px 5x rgba($color: #000000, $alpha: 0.05),
    -5px -5px 5x rgba($color: #fefefe, $alpha: 0.5);

  .options {
    display: none;
  }
}
@media (max-width: 465px) {
  .my-card {
    width: 100px;
    height: 150px;
    .header-text {
      font-size: 0.8rem;
    }
    .subtitle-text {
      font-size: 0.5rem;
    }
  }
}
.my-card:hover {
  cursor: pointer;
  .card-header {
    color: $primary;
  }
  .card-caption {
    display: none;
  }
  .options {
    display: flex;
    justify-content: center;
  }
  transform: translateY(-10px);
}
</style>
