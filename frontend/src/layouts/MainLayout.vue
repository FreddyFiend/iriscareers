<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-white justify-between">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="black"
          @click="toggleLeftDrawer"
          class="lt-md"
        />

        <img
          alt="Quasar logo"
          src="~assets/irisLogo.png"
          style="width: 120px; height: 50px; margin-bottom: 0.25rem"
        />

        <q-toolbar-title>
          <div class="text-subtitle2 text-primary"></div>
          <!--   <nav class="navbar text-center text-subtitle2 gt-sm">
            <ul>
              <li><a href="https://iris.org.pk/">Home</a></li>
              <li>
                <a href="https://iris.org.pk/training-workshop"
                  >Training & Workshop</a
                >
              </li>
              <li><a href="https://iris.org.pk/education">Education</a></li>
              <li><router-link to="/">Career Management</router-link></li>
              <li>
                <a href="https://iris.org.pk/research-publications"
                  >Research & Publication</a
                >
              </li>
            </ul>
          </nav> --></q-toolbar-title
        >

        <q-btn-dropdown
          v-if="store.user"
          flat
          no-caps
          @click="onMainClick"
          dropdown-icon="gbc"
        >
          <template v-slot:label
            ><div class="q-mr-sm text-center text-primary btn">
              {{ store.user.username }}
            </div>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </template>

          <q-list>
            <q-item clickable v-close-popup @click="$router.push(`/`)">
              <q-item-section avatar>
                <q-icon name="home" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="btn">Home</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="$router.push(`/profile/${this.store.user.slug}`)"
            >
              <q-item-section avatar>
                <q-icon name="man" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="btn">My Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logOut()">
              <q-item-section avatar>
                <q-icon name="logout" color="red" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="btn">Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-group v-if="!store.user" class="">
          <q-btn
            push
            class="btn"
            flat
            dense
            color="primary"
            label="Login"
            icon="home"
            @click="showLoginDialog = !showLoginDialog"
            no-caps
          />
          <q-btn
            push
            flat
            class="btn"
            dense
            color="secondary"
            label="Signup"
            icon="engineering"
            @click="showSignUpAsDialog = true"
            no-caps
          />
        </q-btn-group>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          IRIS Education & Training Services Pvt. Limited
        </q-item-label>
        <q-item clickable v-close-popup @click="$router.push(`/`)">
          <q-item-section avatar>
            <q-icon name="home" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="btn">Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          @click="$router.push(`/profile/${this.store.user.slug}`)"
        >
          <q-item-section avatar>
            <q-icon name="man" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="btn">My Profile</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="logOut()">
          <q-item-section avatar>
            <q-icon name="logout" color="red" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="btn">Logout</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable v-ripple @click="this.$router.push('/dashboard')">
          <q-item-section avatar>
            <q-icon color="primary" name="dashboard" />
          </q-item-section>

          <q-item-section>dashboard</q-item-section>
        </q-item>
        <q-item clickable v-ripple href="https://iris.org.pk/">
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>

          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple href="https://iris.org.pk/training-workshop">
          <q-item-section avatar>
            <q-icon color="primary" name="engineering" />
          </q-item-section>

          <q-item-section>Training & Workshop</q-item-section>
        </q-item>
        <q-item clickable v-ripple href="https://iris.org.pk/education">
          <q-item-section avatar>
            <q-icon color="primary" name="school" />
          </q-item-section>

          <q-item-section>Education</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="this.$router.push('/')">
          <q-item-section avatar>
            <q-icon color="primary" name="work" />
          </q-item-section>

          <q-item-section>Career Management</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          href="https://iris.org.pk/research-publications"
        >
          <q-item-section avatar>
            <q-icon color="primary" name="collections_bookmark" />
          </q-item-section>

          <q-item-section>Research & Publication </q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>
    <RegisterDialog
      :show-dialog="showRegisterDialog"
      v-on:hideRegisterDialog="hideRegisterDialog"
    />
    <LoginDialog
      :show-login-dialog="showLoginDialog"
      v-on:hideLoginDialog="hideLoginDialog"
    />
    <q-dialog v-model="showSignUpAsDialog">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            <h6>Are you a job seeker or an Employer?</h6></span
          >
        </q-card-section>

        <q-card-actions align="around" class="btn">
          <q-btn
            flat
            class="btn"
            label="Job Seeker"
            @click="showRegisterDialog = true"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            class="btn"
            label="Employer"
            @click="showRegisterCompanyDialog = true"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <RegisterCompany
      :show-register-company-dialog="showRegisterCompanyDialog"
      v-on:hideRegisterCompanyDialog="hideRegisterCompanyDialog"
    />
    <q-page-container>
      <router-view />
      <Footer />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import Footer from "src/components/Footer.vue";
import RegisterDialog from "components/RegisterDialog.vue";
import LoginDialog from "src/components/LoginDialog.vue";
import RegisterCompany from "src/components/RegisterCompany.vue";

import { useIrisStore } from "src/stores/iris";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
];

export default defineComponent({
  setup() {
    let router = useRouter();
    const store = useIrisStore();

    const leftDrawerOpen = ref(false);

    let onMainClick = ref(false);
    const logOut = () => {
      store.user = null;
      localStorage.removeItem("user");

      api.defaults.headers.common["Authorization"] = "Bearer ";
      router.push("/");
    };
    return {
      showRegisterCompanyDialog: ref(false),
      showSignUpAsDialog: ref(false),
      logOut,
      store,
      essentialLinks: linksList,
      leftDrawerOpen,
      onMainClick,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  name: "MainLayout",

  components: {
    EssentialLink,
    Footer,
    RegisterDialog,
    LoginDialog,
    RegisterCompany,
  },
  data() {
    return { showRegisterDialog: false, showLoginDialog: false };
  },
  methods: {
    hideRegisterDialog() {
      this.showRegisterDialog = false;
    },

    hideLoginDialog() {
      this.showLoginDialog = false;
    },
    hideRegisterCompanyDialog() {
      this.showRegisterCompanyDialog = false;
    },
    checkToken() {
      api
        .get("user/check")
        .then((res) => {
          console.log(res.data.user);
          this.store.user = res.data.user;
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch((e) => {
          this.logOut();
        });
    },
  },
  mounted() {
    try {
      api.defaults.headers.common["Authorization"] =
        "Bearer " + this.store.user.token;
    } catch (e) {
      console.log(e);
    }
    if (this.store.user) {
      this.checkToken();
    }
  },
});
</script>

<style lang="scss">
h1,
.text-h1 {
  font-size: clamp(2rem, 4vw, 3rem);
}
h2,
.text-h2 {
  font-size: clamp(2rem, 4vw, 3rem);
}
h3,
.text-h3 {
  font-size: clamp(2rem, 4vw, 2.5rem);
}
h4,
.text-h4 {
  font-size: clamp(1.5rem, 3vw, 2rem);
}
h5,
.text-h5 {
  font-size: clamp(1.25rem, 1.3vw, 1.5rem);
}
h6,
.text-h6 {
  font-size: clamp(1.125rem, 1.25vw, 1.25rem);
}
.text-subtitle2 {
  font-size: clamp(0.95rem, 1.15vw, 1.15rem);
  font-weight: 500;
}

.text-subtitle1 {
  font-size: clamp(0.95rem, 1.15vw, 1.15rem);
  font-weight: 300;
}
a {
  font-size: clamp(0.85rem, 1.1vw, 1.15rem);
}
p {
  font-size: clamp(0.85rem, 1.1vw, 1.15rem);
}
.btn {
  font-size: clamp(0.85rem, 1.1vw, 1.15rem);
}

nav ul li {
  list-style-type: none;
  display: inline;

  cursor: pointer;
  margin: auto;

  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: $primary;
    padding: 0.5rem;
  }
}
</style>
