<template>
  <div class="code-reader">
    <pre
      class="code-reader__code"
      :class="{ 'code-reader__code--wrap-text': wrapText }"
      >{{ text }}</pre
    >
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },

    wrapText: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.code-reader {
  &__code {
    margin: 0;
    padding: 48px 16px 64px;
    font-family: "Ubuntu Mono", monospace;
    font-size: 16px;
    line-height: 1.6;
    color: #5c6370;
    background-color: #ffffff;

    &--wrap-text {
      white-space: pre-wrap;
    }
  }
}
</style>
