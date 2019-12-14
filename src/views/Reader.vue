<template>
  <div class="reader">
    <code-reader :text="text" :wrap-text="wrapText"></code-reader>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CodeReader from "@/components/CodeReader";

export default {
  name: "reader",

  components: { CodeReader },

  computed: mapState({
    text(state) {
      return state.files[this.$route.params.id].text;
    },

    wrapText(state) {
      return state.wrapText;
    }
  })
};
</script>

<style lang="scss"></style>
