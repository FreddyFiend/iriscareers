<template>
  <div class="row justify-center" style="min-height: 100vh">
    <q-page-sticky
      position="top-left"
      :offset="[18, 18]"
      @click="$router.push(`/profile/${this.store.user.slug}`)"
    >
      <q-btn fab icon="arrow_back" color="primary" />
    </q-page-sticky>
    <div
      class="q-ma-sm q-pa-md col-12 bg-white shadow-6"
      style="max-width: 500px"
      v-if="showProfessions"
    >
      <div class="professions">
        <h5>Professions</h5>
        <div
          class="q-pa-md"
          v-for="(profession, idx) in user.professions"
          :key="idx"
        >
          <div class="buttons float-right">
            <q-btn
              class="q-ma-sm"
              icon="edit"
              @click="editProfession(profession)"
            />
            <br />
            <q-btn
              class="q-ma-sm"
              icon="delete"
              @click="deleteProfession(profession)"
            />
          </div>

          <div class="text-h6 q-py-md">{{ profession.profession }}</div>
          <div class="text-subtitle2">Areas of work:</div>
          <div
            v-for="(subProfession, idx) in profession.subProfession"
            :key="idx"
          >
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

      <q-btn
        class="q-ma-md"
        v-if="professionsLength < 3"
        @click="
          showAddProfession = !showAddProfession;
          showProfessions = !showProfessions;
        "
        >Add
      </q-btn>
    </div>

    <q-form
      v-if="showAddProfession"
      @submit="onSubmit"
      class="q-ma-sm q-pa-md col-12 bg-white shadow-6"
      style="max-width: 500px"
    >
      <div class="q-px-md text-h6">What is your Profession?</div>

      <q-select
        outlined
        class="q-pa-md"
        v-model="professionModel"
        use-input
        input-debounce="0"
        label="Profession"
        :options="options"
        @filter="filterFn"
        behavior="menu"
      ></q-select>

      <div class="q-px-md text-h6">What are your skills?</div>
      <q-select
        label="Skills required "
        outlined
        class="q-pa-md"
        v-model="skillsModel"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        new-value-mode="add-unique"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0 && val.length < 8) ||
            'Please add between 1 to 8 skills',
        ]"
      />
      <div class="q-pa-md">
        <div class="q-pa-sm text-subtitle2">
          What is your skill level in this field?
        </div>
        <div class="q-gutter-y-md column">
          <q-rating
            v-model="ratingModel"
            size="3em"
            color="grey"
            :color-selected="ratingColors"
          />
        </div>
      </div>
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
          text-color="primary"
          bg-color="white"
          label="Cancel"
          @click="cancelEdit"
          color="white "
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import professionOptions from "./professions";
import { useIrisStore } from "src/stores/iris";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "addProfession",
  setup() {
    const store = useIrisStore();
    const q = useQuasar();

    const options = ref(professionOptions);
    let subProfessions = [];
    const filterOptions = ref(subProfessions);

    return {
      store,
      q,
      ratingModel: ref(1),
      ratingColors: ["blue-2", "blue-4", "blue-6", "blue-8", "blue-10"],
      showAddProfession: ref(false),
      showProfessions: ref(true),
      isUpdate: ref(false),
      professionId: ref(null),
      skillsModel: ref(null),
      profession: ref(null),
      filterOptions,
      professionModel: ref(null),
      professionOptions,
      options,
    };
  },
  methods: {
    onSubmit() {
      if (this.isUpdate) {
        this.q.loading.show();

        api
          .patch("user/profession", {
            id: this.professionId,
            profession: this.professionModel,
            subProfession: this.skillsModel,
            skillLevel: this.ratingModel,
          })
          .then((res) => {
            this.q.loading.hide();

            console.log(res.data);
            if (res.data.success) {
              this.$q.notify({
                message: res.data.msg,
                color: "green",
              });
              this.$router.push("/profile");
            } else {
              this.$q.notify({
                message: res.data.msg,
                color: "red",
              });
            }
          })
          .catch((err) => {
            this.q.loading.hide();

            console.log(err);
          });
      } else {
        api
          .post("user/addprofession", {
            profession: this.professionModel,
            subProfession: this.skillsModel,
            skillLevel: this.ratingModel,
          })
          .then((res) => {
            this.q.loading.hide();

            console.log(res.data);
            if (res.data.success) {
              this.$q.notify({
                message: "Successfully added!",
                color: "green",
              });
              this.$router.push(`/profile/${this.store.user.slug}`);
            } else {
              this.$q.notify({
                message: res.data.msg,
                color: "red",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.q.loading.hide();
          });
      }
    },
    editProfession(profession) {
      this.professionId = profession._id;
      this.showProfessions = false;
      this.showAddProfession = true;
      this.isUpdate = true;
      this.professionModel = profession.profession;
      this.subProfessionModel = profession.subProfession;
    },
    deleteProfession(profession) {
      api.delete(`/user/profession/${profession._id}`).then((res) => {
        console.log(res.data);
        this.getUser();
      });
    },
    cancelEdit() {
      this.isUpdate = false;
      this.showProfessions = true;
      this.showAddProfession = false;
    },
    getUser() {
      api
        .get(`user/single/${this.store.user.slug}`)
        .then((res) => {
          this.user = res.data.user;
          this.professionsLength = this.user.professions.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return { user: {} };
  },
  mounted() {
    setTimeout(() => {
      this.getUser();
    }, 400);
  },
});
</script>
