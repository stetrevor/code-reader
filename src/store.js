import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    files: {
      /*
       id: tab number,
       text: file content,
       name: file name,
       */
    },

    wrapText: false // If reader wrap text
  },

  getters: {
    fileNames(state) {
      return Object.keys(state.files).map(id => ({
        id,
        name: state.files[id].name
      }));
    },

    tabCount(state) {
      return Object.keys(state.files).length;
    }
  },

  mutations: {
    addFile(state, { id, text, name }) {
      Vue.set(state.files, id, { text, name });
    },

    removeFile(state, { id }) {
      Vue.delete(state.files, id);
    },

    updateWrapText(state, { wrapText }) {
      state.wrapText = wrapText;
    }
  },
  actions: {}
});
