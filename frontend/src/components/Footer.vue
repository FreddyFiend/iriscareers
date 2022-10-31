<template>
  <div class="row justify-between items-center footer bg-primary">
    <div class="col-md-4 col-sm-4 col-xs-12">
      <img src="~assets/footer.png" width="250px" alt="" srcset="" />
    </div>
    <div class="col-md-4 col-sm-4 col-xs-12">
      <h6>About us</h6>
      <div class="line"></div>
      <a href="">About</a>
      <a href="">Privacy Policy</a>
      Refund Policy FAQs Our Leadership Our Supporters Our Contributors Careers
      Interships
    </div>

    <div class="col-md-4 col-sm-4 col-xs-12">Contact Us</div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
  padding: 2rem;

  width: 100%;
  background-color: rgb(10, 10, 10);
  color: white;
  text-align: center;
}
.line {
  text-align: center;
  height: 2px;
  width: 100%;
  background-color: white;
}
</style>
