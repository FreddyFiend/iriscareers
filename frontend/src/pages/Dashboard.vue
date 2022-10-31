<template>
  <q-page class="q-pa-md dashboard">
    <div class="row justify-around rounded-borders shadow-4">
      <div class="row justify-center col-md-6 col-sm-12">
        <div
          class="q-pa-lg cards row col-md-6 col-sm-6 col-xs-12 justify-between bg-white"
          v-for="(card, idx) in cards"
          :key="idx"
        >
          <div class="justify-center items-center">
            <div class="text-h6">total income</div>
            <div class="text-h4">{{ card.title }}</div>
            <div class="text-subtitle2">{{ card.caption }}</div>
            <div class="text-subtitle">{{ card.progress }}% increased.</div>
          </div>
          <div class="knob col-5">
            <q-knob
              readonly
              v-model="card.progress"
              show-value
              size="90px"
              :thickness="0.22"
              color="blue-5"
              track-color="blue-2"
              class="text-blue-5 q-ma-md"
            />
          </div>
        </div>
      </div>
      <div class="q-pa-md col-md-6 col-sm-12 bg-white">
        <BarChart class="q-ma-md" :chart-data="chartData" />
      </div>
    </div>
    <!-- New Courses -->
    <div class="row justify-center">
      <div class="col-12">
        <div class="q-mt-md row q-col-gutter-md justify-center">
          <div class="col-3" v-for="(v, idx) in [1, 2, 3, 4]" :key="idx">
            <div class="bg-white q-pa-md rounded- shadow-4">
              <img
                src="https://cdn.quasar.dev/img/mountains.jpg"
                style="width: 100%"
              />

              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle text-bold">21 April</div>
              <div class="text-subtitle1">Professor: John Doe</div>
              <div class="text-subtitle2">Duration: 12 months</div>
              <div class="text-subtitle2">Students: 120+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- teachers -->
    <div class="q-mt-md row justify-between">
      <div class="col-4 bg-white">
        <q-list class="" style="max-width: 350px">
          <q-item-label header>Teacers</q-item-label>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Janet</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">Available</span>
                English
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">John</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">Not Available</span>
                Chemistry
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-7">
        <q-editor v-model="editor" min-height="8rem" />
      </div>
    </div>
    <!-- Another Section  -->

    <q-card class="q-mt-md shadow-4">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="toppers" label="Exam Toppers" />
        <q-tab name="new" label="new students" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="toppers">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-right">Name</th>
                <th class="text-right">Marks Percentage</th>
                <th class="text-right">Subject</th>
                <th class="text-right">Teacher</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">43</td>
                <td class="text-right">Greedo</td>
                <td class="text-right">98%</td>
                <td class="text-right">Math</td>
                <td class="text-right">Ghulam Hussain Umrani</td>
              </tr>
              <tr>
                <td class="text-left">43</td>
                <td class="text-right">Greedo</td>
                <td class="text-right">98%</td>
                <td class="text-right">Math</td>
                <td class="text-right">Ghulam Hussain Umrani</td>
              </tr>
              <tr>
                <td class="text-left">43</td>
                <td class="text-right">Greedo</td>
                <td class="text-right">98%</td>
                <td class="text-right">Math</td>
                <td class="text-right">Ghulam Hussain Umrani</td>
              </tr>
              <tr>
                <td class="text-left">43</td>
                <td class="text-right">Greedo</td>
                <td class="text-right">98%</td>
                <td class="text-right">Math</td>
                <td class="text-right">Ghulam Hussain Umrani</td>
              </tr>
              <tr>
                <td class="text-left">43</td>
                <td class="text-right">Greedo</td>
                <td class="text-right">98%</td>
                <td class="text-right">Math</td>
                <td class="text-right">Ghulam Hussain Umrani</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-tab-panel>

        <q-tab-panel name="new">
          <div class="text-h6">New Students</div>
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-right">Name</th>
                <th class="text-right">SUBJECT</th>
                <th class="text-right gt-sm">Assigned Professor</th>
                <th class="text-right">Fees</th>
                <th class="text-right gt-xs">Date of admit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">01</td>
                <td class="text-right">adil</td>
                <td class="text-right">biochemistry</td>
                <td class="text-right gt-sm">Jalal</td>
                <td class="text-right">Rs.200</td>
                <td class="text-right gt-xs">14 July 2022</td>
              </tr>
              <tr>
                <td class="text-left">01</td>
                <td class="text-right">adil</td>
                <td class="text-right">biochemistry</td>
                <td class="text-right gt-sm">Jalal</td>
                <td class="text-right">Rs.200</td>
                <td class="text-right gt-xs">14 July 2022</td>
              </tr>
              <tr>
                <td class="text-left">01</td>
                <td class="text-right">adil</td>
                <td class="text-right">biochemistry</td>
                <td class="text-right gt-sm">Jalal</td>
                <td class="text-right">Rs.200</td>
                <td class="text-right gt-xs">14 July 2022</td>
              </tr>
              <tr>
                <td class="text-left">01</td>
                <td class="text-right">adil</td>
                <td class="text-right">biochemistry</td>
                <td class="text-right gt-sm">Jalal</td>
                <td class="text-right">Rs.200</td>
                <td class="text-right gt-xs">14 July 2022</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import BarChart from "components/BarChart.vue";

import { defineComponent } from "vue";
const cards = [
  { title: "83", caption: "New Students", icon: "home", progress: 47 },
  { title: "12", caption: "New Courses", icon: "home", progress: 36 },
  { title: "Rs. 67K", caption: "Fees Collection", icon: "home", progress: 56 },
  { title: "466", caption: "Total Students", icon: "home", progress: 35 },
];

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      editor: "",
      cards,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      tab: "toppers",
      chartData: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Expense",
            backgroundColor: "#1036a0",
            data: [40, 20, 12, 40, 20, 12],
          },
          {
            label: "Income",
            backgroundColor: "#209e63",
            data: [44, 30, 62, 44, 4, 56],
          },
        ],
      },
    };
  },
  components: {
    BarChart,
  },
});
</script>
<style lang="scss" scoped>
.dashboard {
  background-color: rgb(223, 223, 223);
}
</style>
