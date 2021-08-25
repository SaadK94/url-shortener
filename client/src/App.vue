<template>
  <h1>URL Shortener</h1>
  <div class="input">
    <UrlInput />
  </div>
  <div v-if="urlList.length">
    <UrlList :urls="urlList" />
  </div>
  <h3 v-else>You haven't shortened any URLs</h3>
  <SnackbarModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import UrlInput from "./components/UrlInput.vue";
import UrlList from "./components/UrlList.vue";
import SnackbarModal from "./components/SnackbarModal.vue";

export default defineComponent({
  name: "App",
  components: {
    UrlInput,
    UrlList,
    SnackbarModal,
  },
  computed: {
    ...mapState(["urlList"]),
  },
  methods: {
    ...mapActions(["getUrls"]),
  },
  async beforeMount() {
    await this.getUrls();
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 30px;
}

h1,
h3 {
  color: #048b97;
}

.input {
  margin-bottom: 3%;
}
</style>
