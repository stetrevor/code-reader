<template>
  <div class="tabs">
    <file-item
      v-for="item in fileNames"
      :key="item.id"
      :item="item"
      @click.native.self="
        $router.push({ name: 'reader', params: { id: item.id } })
      "
      @file-item-remove="removeFile(item)"
    ></file-item>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import FileItem from "@/components/FileItem";

export default {
  name: "tabs",

  components: { FileItem },

  computed: mapGetters(["fileNames"]),

  methods: mapMutations(["removeFile"])
};
</script>

<style lang="scss">
.tabs {
  margin: 1em;
}
</style>
