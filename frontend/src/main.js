import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';

import Vuelidate from 'vuelidate'




library.add(fas, far)
dom.watch();

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.use(router,Vuelidate)
.mount('#app')



// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'

// import { library, dom } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons';

// import Vuelidate from 'vuelidate'
// import 'bulma/css/bulma.css'

// library.add(fas, far)
// dom.watch();

// Vue.config.productionTip = false;

// const app = createApp(App)
// .component("font-awesome-icon", FontAwesomeIcon)
// .use(router,Vuelidate)
// .mount('#app')

// app.config.productionTip = false;







