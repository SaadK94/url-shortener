<template>
  <div class="container-outer">
    <div class="container-inner">
      <a class="full-url" :href="fullUrl" target="_blank" data-jest-full-url>{{
        fullUrl
      }}</a>
      <h4 class="short-url" data-jest-short-url>{{ shortUrl }}</h4>
    </div>
    <div class="buttons">
      <button class="copy" @click="copyUrl" data-jest-copy>Copy</button>
      <button class="delete" @click="removeUrl" data-jest-delete>Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteUrl", "showSnackbar"]),
    async removeUrl() {
      await this.deleteUrl(this.id);
      await this.showSnackbar("URL deleted");
    },
    async copyUrl() {
      await navigator.clipboard.writeText(this.shortUrl);
      await this.showSnackbar("URL copied to clipboard");
    },
  },
});
</script>

<style scoped>
.container-outer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f4f5f5;
  border-radius: 8px;
  overflow: auto;
  flex-grow: 1;
}

.buttons {
  display: flex;
  flex-direction: column;
}

.full-url {
  text-decoration: none;
  color: #5bb0b8;
  font-weight: bold;
  margin: auto;
  padding: 16px;
}

.full-url:hover {
  color: #69d1db;
}

.short-url {
  margin: auto;
  color: #27515f;
  padding: 6px;
}

button {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-size: 17px;
  text-align: center;
  background-color: #27515f;
  width: 175px;
  margin: 0 0 4px 16px;
}

button.copy {
  background-color: #5bb0b8;
}

button.delete {
  background-color: #ba3030;
}

button.delete:hover {
  background-color: #e33d3d;
}

button.copy:hover {
  background-color: #a9d5d9;
}

@media (max-width: 768px) {
  .container-outer,
  .container-inner {
    flex-direction: column;
    align-items: stretch;
  }

  .full-url {
    margin: 12px auto;
    padding: 0 6px;
  }
  .short-url {
    margin: auto;
    padding: 10px 0;
  }

  button {
    width: 100%;
    margin: 12px 0 0 0;
  }
}
</style>
