<template>
  <form @submit.prevent="shortenUrl">
    <input
      type="text"
      placeholder="Paste your URL here"
      :class="invalidUrl ? 'error' : ''"
      v-model="url"
      data-jest-input
    />
    <button
      type="submit"
      :class="!url ? 'disabled' : ''"
      :disabled="!url"
      data-jest-button
    >
      Shorten
    </button>
  </form>
  <p class="error" v-if="invalidUrl" data-jest-message>
    Invalid URL entered, please provide a valid URL
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  data() {
    return {
      url: "",
      invalidUrl: false,
    };
  },
  watch: {
    url() {
      this.invalidUrl = false;
    },
  },
  methods: {
    ...mapActions(["submitUrl"]),
    isValidUrl(str: string) {
      try {
        new URL(str);
        return true;
      } catch (_) {
        return false;
      }
    },
    async shortenUrl() {
      const isValidUrl = this.isValidUrl(this.url);
      if (isValidUrl) {
        this.invalidUrl = false;
        await this.submitUrl(this.url);
        this.url = "";
      } else {
        this.invalidUrl = true;
      }
    },
  },
});
</script>

<style scoped>
form {
  display: flex;
}

input {
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #f4f5f5;
  border: none;
  font-size: 20px;
  margin-right: 16px;
  flex-grow: 1;
}

input.error {
  background-color: rgba(241, 15, 1, 0.12);
  color: #f10f01;
}

input:focus {
  outline: none;
}

p.error {
  color: #f10f01;
}

button {
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-size: 20px;
  text-align: center;
  background-color: #27515f;
  width: 175px;
}

button:hover {
  background-color: #048b97;
}

button.disabled {
  background-color: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.38);
  cursor: default;
}

@media (max-width: 576px) {
  form {
    flex-direction: column;
    align-items: stretch;
  }

  input {
    margin: 0 0 10px 0;
  }

  button {
    width: 100%;
    margin-bottom: 12px;
  }
}
</style>
