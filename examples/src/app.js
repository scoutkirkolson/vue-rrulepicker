import Vue from 'vue'
import App from './App.vue'

/* *** Use `umd` version *** */
// import '../../dist/min.css'
// import Datatable from '../../dist/min.js'

/* *** Use `module` version *** */
import skoRRulePicker from '../../src/sko-rrulepicker.vue'

Vue.use(skoRRulePicker);

new Vue({
    el: '#app'
    , render: h => h(App)
});
