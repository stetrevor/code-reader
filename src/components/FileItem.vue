<template>
  <div class="file-item">
    <div class="file-item__name">{{ item.name }}</div>

    <button class="file-item__remove" @click="$emit('file-item-remove')">
      X
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.file-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 48px;

  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  &__name {
    margin-right: auto;
  }
  &__remove {
    margin-top: auto;
    margin-bottom: auto;
  }
}
</style>
