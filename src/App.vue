<template>
  <div id="app">
    <router-view />

    <div class="toolbar">
      <button class="toolbar__open-file" @click="openFile">Open File</button>
      <input
        id="file"
        type="file"
        accept="text/*"
        hidden
        @change="displayFile($event.target.files[0])"
      />
      <router-link tag="button" to="/tabs">{{ tabCount }}</router-link>
    </div>

    <div class="upgrade-dialog" v-if="prompt">
      <div class="upgrade-dialog__message">
        A new version is found. Refresh to load it?
      </div>
      <div
        class="upgrade-dialog__button upgrade-dialog__button--accept"
        @click="upgrade"
      >
        Refresh
      </div>
      <div
        class="upgrade-dialog__button upgrade-dialog__button--cancel"
        @click="prompt = false"
      >
        Later
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },

  computed: mapGetters(["tabCount"]),

  methods: {
    ...mapMutations(["addFile"]),

    async upgrade() {
      this.prompt = false;

      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },

    openFile() {
      this.$el.querySelector("#file").click();
    },

    displayFile(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const id = this.tabCount + 1;
        const name = file.name;
        this.addFile({ id, text, name });
        this.$router.push({ name: "reader", params: { id } });
      };
      reader.readAsText(file);
    }
  },

  data() {
    return {
      prompt: false
    };
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.toolbar {
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #f0f0f0;

  button {
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }

  &__open-file {
    margin-right: 16px;
  }
}

.upgrade-dialog {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px 12px;
  color: white;
  background-color: #2c3e50;
  box-shadow: 0 4px 4px rgba(#2c3e50, 0.4);
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 8px;

  &__message {
    grid-column: 1 / 3;
  }

  &__button {
    padding: 0 8px;
    height: 36px;
    line-height: 36px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;

    &--accept {
      justify-self: end;
    }
  }
}
</style>
