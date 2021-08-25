<template>
  <UrlItem
    v-for="url in urls"
    :key="url.id"
    :id="url.id"
    :fullUrl="url.fullUrl"
    :shortUrl="url.shortUrl"
    class="item"
    data-jest-item
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UrlItem from "./UrlItem.vue";

export default defineComponent({
  components: {
    UrlItem,
  },
  props: {
    urls: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped>
.item {
  margin-bottom: 16px;
}
</style>
