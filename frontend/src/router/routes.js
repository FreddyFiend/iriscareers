const routes = [
  {
    path: "/career",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Career.vue") }],
  },
  {
    path: "/signup",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Signup.vue") }],
  },
  {
    path: "/addprofession",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/AddProfession.vue") },
    ],
  },
  {
    path: "/addeducation",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/AddEducation.vue") },
    ],
  },
  {
    path: "/learnmore",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/career/LearnMore.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/CareerDashboard.vue") },
    ],
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: ":slug", component: () => import("pages/career/MyProfile.vue") },
    ],
  },
  {
    path: "/postjob",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/PostJob.vue") },
    ],
  },

  {
    path: "/editprofile",
    props: true,
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "editProfile",
        path: "",
        component: () => import("pages/career/EditProfile.vue"),
      },
    ],
  },

  {
    path: "/addaddress",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/AddAddress.vue") },
    ],
  },

  {
    path: "/addexperience",
    props: true,
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/AddExperience.vue") },
    ],
  },
  {
    path: "/jobsapplied",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/JobsApplied.vue") },
    ],
  },

  {
    path: "/receivedproposals",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/JobApplicants.vue") },
    ],
  },
  {
    path: "/jobpost",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: ":slug", component: () => import("pages/career/JobPost.vue") },
    ],
  },
  {
    path: "/hotjobs",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/career/HotJobs.vue") },
    ],
  },
  {
    path: "/posthotjob",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/career/admin/PostHotJob.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
