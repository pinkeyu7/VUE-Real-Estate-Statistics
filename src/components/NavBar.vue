<template>
  <div class="">
    <router-link to="/">Statistics</router-link>
    <router-link to="/total-price">Total Price</router-link>
    <router-link to="/house-price">House Price</router-link>
    <router-link to="/car-price">Car Price</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  props: {
    title: String,
  },
  setup(props) {
    return { props };
  },
});
</script>

<style scoped>
a {
  padding-left: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-decoration: none;
  color: #555555;
  font-size: 20px;
  cursor: pointer;
  font-weight: 500;
}
a:hover {
  color: #333333;
}

a.router-link-active {
  color: #333333;
}
</style>
