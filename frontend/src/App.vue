<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");

* {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
  text-decoration: none;
}
body::-webkit-scrollbar {
  width: 6px; /* width of the entire scrollbar */
}
body::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}
body::-webkit-scrollbar-thumb {
  background-color: #2954c9;
}
</style>
