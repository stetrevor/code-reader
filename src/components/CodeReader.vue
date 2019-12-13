<template>
  <div class="code-reader">
    <pre v-html="hlText"></pre>
  </div>
</template>

<script>
import Worker from "./code-reader.worker.js";

export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },

  watch: {
    text: {
      handler(val) {
        this.worker.postMessage(val);
      },
      immediate: true
    }
  },

  created() {
    this.worker.addEventListener("message", event => {
      this.hlText = event.data;
    });
  },

  data() {
    return {
      hlText: "",
      worker: new Worker()
    };
  }
};
</script>

<style></style>
