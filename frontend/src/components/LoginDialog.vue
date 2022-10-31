<template>
  <q-dialog v-model="showLoginDialog">
    <div class="my-card" style="border-radius: 24px">
      <q-form @submit="onSubmit" class="q-pa-lg bg-primary">
        <q-btn
          flat
          color="white"
          class="float-right float-top"
          dense
          icon="close"
          @click="hideLoginDialog()"
          v-close-popup
        ></q-btn>
        <div class="q-px-md text-white text-subtitle2">Email:</div>

        <q-input
          rounded
          outlined
          bg-color="white"
          class="q-py-md q-px-sm col-md-11 col-sm-11 col-xs-11 text-subtitle2"
          v-model="email"
          type="email"
          lazy-rules
          :rules="[(val) => val !== null && val !== '']"
          ><template v-slot:prepend>
            <q-icon name="alternate_email" /> </template
        ></q-input>
        <div class="q-px-md text-white text-subtitle2">Password:</div>
        <q-input
          rounded
          outlined
          bg-color="white"
          class="q-py-md q-px-sm col-md-7 col-sm-7 col-xs-11 text-subtitle2"
          v-model="password"
          lazy-rules
          :rules="[(val) => val && val.length > 0]"
          ><template v-slot:prepend> <q-icon name="password" /> </template
        ></q-input>

        <div class="q-pa-sm">
          <q-btn
            rounded
            class="btn"
            outlined
            text-color="primary"
            bg-color="white"
            label="login"
            type="submit"
            color="white "
          />
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent } from "vue";

import { useIrisStore } from "src/stores/iris";

import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const store = useIrisStore();

    return {
      store,
      showNotif(message, color) {
        $q.notify({
          message,
          color,
        });
      },
    };
  },
  name: "Login",
  props: ["showLoginDialog"],
  data() {
    return { email: "", password: "" };
  },

  methods: {
    hideLoginDialog() {
      this.$emit("hideLoginDialog");
    },
    onSubmit() {
      this.$q.loading.show();

      api
        .post("user/signin", { email: this.email, password: this.password })
        .then((res) => {
          this.$q.loading.hide();

          this.showNotif(res.data.msg, "green");
          console.log(res.data);
          api.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.user.token;
          this.store.user = res.data.user;
          localStorage.setItem("user", JSON.stringify(res.data.user));
          console.log(JSON.parse(localStorage.getItem("user")));
          this.hideLoginDialog();
        })
        .catch((error) => {
          if (error.response) {
            this.$q.loading.hide();

            this.email = "";
            this.password = "";
            console.log(error.response.data.msg);
            this.showNotif(error.response.data.msg, "red");
          }
        });
    },
    checkRoute() {
      api
        .get("user/check")
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            this.notif(res.data.msg, "primary");
          }
        })
        .catch((e) => {
          this.showNotif("unauthorized", "red");
        });
    },
    notif(msg, clr) {
      this.showNotif(msg, clr);
    },
  },
});
</script>
<style lang="scss" scoped>
section {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
}
</style>
