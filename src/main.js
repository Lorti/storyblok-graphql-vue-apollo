import Vue from 'vue';

import ApolloClient from 'apollo-boost';

import VueApollo from 'vue-apollo';
import StoryblokVue from 'storyblok-vue';

import Page from '@/components/Page.vue';
import Grid from '@/components/Grid.vue';
import Feature from '@/components/Feature.vue';
import Teaser from '@/components/Teaser.vue';
import App from './App.vue';

const apolloClient = new ApolloClient({
  uri: 'https://gapi.storyblok.com/v1/api',
  headers: {
    token: 'WDkGgfwKuvctflMZTbjhNQtt',
    version: 'draft',
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);
Vue.use(StoryblokVue);

Vue.component('page', Page);
Vue.component('grid', Grid);
Vue.component('feature', Feature);
Vue.component('teaser', Teaser);

new Vue({
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
