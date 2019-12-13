<template>
  <div class="code-reader">
    <pre class="code-reader__code hljs" v-if="!loading" v-html="hlText"></pre>

    <loading-spinner class="code-reader__loader" v-else></loading-spinner>
  </div>
</template>

<script>
import Worker from "./code-reader.worker.js";
import LoadingSpinner from "@/components/LoadingSpinner";

export default {
  components: { LoadingSpinner },

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
        this.loading = true;
      },
      immediate: true
    }
  },

  created() {
    this.worker.addEventListener("message", event => {
      this.hlText = event.data;
      this.loading = false;
    });
  },

  data() {
    return {
      hlText: "",
      loading: true,
      worker: new Worker()
    };
  }
};
</script>

<style lang="scss">
@import "~highlight.js/styles/default.css";
@import "~highlight.js/styles/atom-one-dark-reasonable.css";

.code-reader {
  &__code {
    margin: 0;
    padding: 32px 16px;
    font-family: "Ubuntu Mono", monospace;
    font-size: 16px;
    line-height: 1.6;
  }

  &__loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
