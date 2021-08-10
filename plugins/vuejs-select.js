import Vue from "vue";
import vSelect from "vue-select";

import "vue-select/dist/vue-select.css";

export default () => {
  Vue.component("v-select", vSelect);
}