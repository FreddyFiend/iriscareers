<template>
  <q-page class="q-pa-md flex flex-center row justify-center">
    <q-page-sticky
      position="top-left"
      :offset="[18, 18]"
      @click="$router.push(`/profile/${this.store.user.slug}`)"
    >
      <q-btn fab icon="arrow_back" color="primary" />
    </q-page-sticky>
    <q-form
      @submit="onSubmit"
      class="q-ma-sm q-pa-md col-12 bg-white shadow-6"
      style="max-width: 500px"
    >
      <div class="q-px-md text-h6">Edit Profile Details</div>
      <q-input
        outlined
        class="q-pa-md"
        readonly
        autogrow
        v-model="username"
        label="Username"
        lazy-rules
      />
      <q-input
        outlined
        class="q-pa-md"
        autogrow
        v-model="bio"
        label="Bio"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length < 300) || 'Please type less than 300 characters',
        ]"
      />

      <div class="q-pa-sm">
        <q-btn
          rounded
          outlined
          text-color="primary"
          bg-color="white"
          label="Done"
          type="submit"
          color="white "
        />
        <q-btn
          rounded
          outlined
          class="q-mx-sm"
          text-color="primary"
          bg-color="white"
          label="Cancel"
          @click="$router.push(`/profile/${this.store.user.slug}`)"
          color="white "
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useIrisStore } from "src/stores/iris";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "editProfile",
  setup() {
    let q = useQuasar();
    const store = useIrisStore();
    return {
      q,
      store,
      bio: ref(""),
      username: ref(""),
    };
  },
  methods: {
    onSubmit() {
      this.q.loading.show();
      api
        .patch("/user", {
          bio: this.bio,
        })
        .then((res) => {
          this.$router.push(`/profile/${this.store.user.slug}`);
          this.q.notify({
            message: res.data.msg,
            color: "green",
          });
          $q.loading.hide();
        })
        .catch((error) => {
          this.q.loading.hide();
          if (error.response) {
            this.q.notify({
              message: error.response.data.msg,
              color: "red",
            });
          }
        });
    },
  },
  mounted() {
    this.username = this.store.loadedUser.username;
    this.bio = this.store.loadedUser.bio;
    console.log(this.bio);
  },
});
</script>
<style lang="scss" scoped></style>
