<template>
  <q-dialog v-model="showDialog">
    <div class="my-card" style="border-radius: 24px">
      <q-form @submit="onSubmit" class="q-pa-lg bg-primary text-center row">
        <div class="col-11"></div>
        <q-btn
          @click="hideDialog()"
          flat
          color="white"
          class="float-right float-top col-1"
          icon="close"
        /><br />
        <div class="col-12 row">
          <div class="col-6">
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Your Full name?
            </div>
            <q-input
              rounded
              outlined
              bg-color="white"
              class="q-pa-sm text-subtitle2"
              v-model="username"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend> <q-icon name="person" /> </template
            ></q-input>
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Your email address?
            </div>

            <q-input
              rounded
              outlined
              bg-color="white"
              class="q-pa-sm text-subtitle2"
              v-model="email"
              type="email"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend> <q-icon name="email" /> </template
            ></q-input>
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Enter new Password
            </div>
            <q-input
              rounded
              outlined
              bg-color="white"
              class="q-pa-sm text-subtitle2"
              v-model="password"
              lazy-rules
              :rules="[(val) => val && val.length > 5]"
              ><template v-slot:prepend> <q-icon name="password" /> </template
            ></q-input>
          </div>
          <div class="col-6">
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Your gender?
            </div>
            <q-select
              class="q-pa-sm text-subtitle2"
              rounded
              outlined
              bg-color="white"
              v-model="gender"
              :options="['male', 'female', 'undefined']"
              ><template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-select>
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Your mobile number?
            </div>
            <q-input
              rounded
              outlined
              bg-color="white"
              class="q-pa-sm text-subtitle2"
              v-model="phone"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend> <q-icon name="phone" /> </template
            ></q-input>
            <div class="q-px-md text-white text-subtitle2 q-mt-sm">
              Your CNIC number?
            </div>
            <q-input
              rounded
              outlined
              bg-color="white"
              v-model="cnic"
              class="q-pa-sm text-subtitle2"
              mask="##### - ####### - #"
              fill-mask="#"
              unmasked-value
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              ><template v-slot:prepend>
                <q-icon name="quick_contacts_mail" /> </template
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
            class="btn"
            outlined
            text-color="primary"
            bg-color="white"
            label="register as job seeker"
            type="submit"
            color="white "
          />
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
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
  name: "Register",
  props: ["showDialog"],
  data() {
    return {
      username: "",
      accept: ref(false),
      email: "",
      password: "",
      cnic: "",
      phone: "",
      gender: "male",
      accept: false,
    };
  },
  methods: {
    hideDialog() {
      this.$emit("hideRegisterDialog");
    },
    onSubmit() {
      if (this.accept !== true) {
        return this.showNotif(
          "You need to accept the license and terms first",
          "negative"
        );
      }
      this.$q.loading.show();

      api
        .post("user/signup", {
          username: this.username,
          email: this.email,
          password: this.password,
          cnic: this.cnic,
          phone: this.phone,
          gender: this.gender,
          isCompany: false,
        })
        .then((res) => {
          this.$q.loading.hide();

          this.showNotif(res.data.msg, "green");
          console.log(res.data);
          api.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.user.token;
          this.store.user = res.data.user;
          localStorage.setItem("user", JSON.stringify(res.data.user));
          this.hideDialog();
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
  background: rgba(0, 0, 0, 0.65);
}
.register {
  background-color: aliceblue;
}
.my-card {
  background-color: whitesmoke;
}
</style>
