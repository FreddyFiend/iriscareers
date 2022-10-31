<template>
  <div>
    <q-dialog v-model="showDialog" style="max-width: 700px">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        style="max-width: 1000px"
      >
        <q-btn>x</q-btn>
        <q-step
          :name="1"
          title="Select campaign settings"
          icon="settings"
          :done="step > 1"
        >
          For each ad campaign that you create, you can control how much you're
          willing to spend on clicks and conversions, which networks and
          geographical locations you want your ads to show on, and more.
        </q-step>

        <q-step
          :name="2"
          title="Create an ad group"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          An ad group contains one or more ads which target a shared set of
          keywords.
        </q-step>

        <q-step :name="3" title="Create an ad" icon="add_comment">
          Try out different ad text to see what brings in the most customers,
          and learn how to enhance your ads using features like ad extensions.
          If you run into any problems with your ads, find out how to tell if
          they're running and how to resolve approval issues.
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.next()"
              color="primary"
              :label="step === 3 ? 'Finish' : 'Continue'"
            /><q-btn
              @click="$refs.stepper.next()"
              color="secondary"
              v-if="step < 3"
              label="skip"
              class="q-ml-sm"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            /><q-btn
              flat
              color="primary"
              @click="hideDialog"
              label="close"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: ["showDialog"],
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    hideDialog() {
      this.$emit("hideDialog");
    },
  },
});
</script>
