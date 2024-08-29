<template>
  <div class="content-top">{{ props.title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageTitle",
  props: {
    title: String,
  },
  setup(props) {
    return { props };
  },
});
</script>

<style scoped>
.content-top {
  padding-top: 50px;
  padding-left: 30px;
  padding-bottom: 15px;
  font-size: 36px;
  background-color: #ffffff;
}
</style>
