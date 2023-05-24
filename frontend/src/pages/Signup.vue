<template>
  <div class="q-pa-md row justify-center items-center">
    <div class="headings row justify-between">
      <h4 class="q-pa-md">create new account</h4>
      <p class="q-pa-md">
        Already have an account?
        <q-btn label="login" color="secondary" />
      </p>
    </div>



    <br />
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="row col-12"
      style="max-width: 868px; border: 2px solid #fff; border-radius: 5px"
    >
      <q-input
        filled
        class="q-pa-md col-10"
        v-model="username"
        label="Your username *"
        hint="Enter unique username"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="fName"
        class="q-pa-md col-5"
        label="First name *"
        hint="Enter First name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="lName"
        class="q-pa-md col-5"
        label="Last name *"
        hint="Enter Last name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="email"
        class="q-pa-md col-7"
        label="Email*"
        hint="Enter your email address"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="password"
        class="q-pa-md col-7"
        label="Password*"
        hint="Enter the password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="password2"
        class="q-pa-md col-7"
        label="Re-enter Password*"
        hint="Re-enter the password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div class="q-pa-md" style="flex-basis: 100%; height: 0">
        <q-btn label="Create my account" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Signup",
  data() {
    return {
      username: "",
      fName: "",
      lName: "",
      email: "",
      password: "",
      password2: "",
      accept: false,
    };
  },
});
</script>
