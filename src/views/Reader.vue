<template>
  <div class="reader">
    <code-reader :text="text"></code-reader>
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
    }
  })
};
</script>

<style lang="scss"></style>
