<template>
  <q-dialog v-model="showRegisterCompanyDialog">
    <div class="my-card" style="border-radius: 24px">
      <q-form @submit="onSubmit" class="q-pa-lg bg-primary row">
        <div class="col-11"></div>
        <q-btn
          @click="hideDialog()"
          flat
          color="white"
          class="float-right float-top col-1"
          icon="close"
        />
        <br />
        <div class="row justify-between text-center">
          <div class="col-6">
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Company's NTN number
            </div>

            <q-input
              rounded
              outlined
              bg-color="white"
              v-model="ntn"
              class="q-pa-md btn"
              hint=""
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend> <q-icon name="view_comfy" /> </template
            ></q-input>
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Company's name
            </div>
            <q-input
              rounded
              outlined
              class="q-pa-md btn"
              v-model="username"
              bg-color="white"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend>
                <q-icon name="local_convenience_store" /> </template
            ></q-input>
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Company's Employees
            </div>
            <q-input
              rounded
              outlined
              class="q-pa-md btn"
              v-model="employeeSize"
              bg-color="white"
              type="number"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend> <q-icon name="badge" /> </template
            ></q-input>
          </div>
          <div class="col-6">
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Company's Email
            </div>
            <q-input
              rounded
              outlined
              class="q-pa-md btn"
              v-model="email"
              bg-color="white"
              type="email"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend> <q-icon name="email" /> </template
            ></q-input>
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Your new password
            </div>
            <q-input
              rounded
              outlined
              class="q-pa-md btn"
              bg-color="white"
              v-model="password"
              lazy-rules
              :rules="[(val) => val && val.length > 5]"
              ><template v-slot:prepend> <q-icon name="password" /> </template
            ></q-input>
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Phone number
            </div>
            <q-input
              rounded
              outlined
              class="q-pa-md btn"
              v-model="phone"
              bg-color="white"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend> <q-icon name="phone" /> </template
            ></q-input>
          </div>
          <q-toggle
            color="secondary"
            class="text-white"
            v-model="accept"
            label="I accept the license and terms"
          />
        </div>

        <div class="q-pa-sm">
          <q-btn
            rounded
            outlined
            class="btn"
            text-color="primary"
            bg-color="white"
            label="register as employer"
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
import { defineComponent, ref } from "vue";
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
  name: "RegisterCompany",
  props: ["showRegisterCompanyDialog"],
  data() {
    return {
      email: "",
      accept: ref(false),
      ntn: "",
      phone: "",
      username: "",
      employeeSize: 0,
      password: "",
      accept: false,
    };
  },
  methods: {
    hideDialog() {
      this.$emit("hideRegisterCompanyDialog");
    },
    onSubmit() {
      if (!this.accept) {
        return this.showNotif(
          "You need to accept the license and terms first",
          "negative"
        );
      }
      this.$q.loading.show();
      api
        .post(`user/signup`, {
          email: this.email,
          ntn: this.ntn,
          phone: this.phone,
          username: this.username,
          employeeSize: this.employeeSize,
          password: this.password,
          isCompany: true,
        })
        .then((res) => {
          this.$q.loading.hide();

          this.showNotif(res.data.msg, "green");

          this.hideDialog();
          api.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.user.token;
          this.store.user = res.data.user;
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch((error) => {
          if (error.response) {
            this.$q.loading.hide();

            console.log(error.response.data);
            return this.showNotif(error.response.data.msg, "red");
          }
        });
    },
  },
});
</script>
<style lang="scss" scoped>
.header-text {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.register {
  background-color: aliceblue;
}
</style>
