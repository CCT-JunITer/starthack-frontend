import Vue from 'vue';
import Vuex from 'vuex';
import { Proposal } from '@/interfaces/Proposal';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    proposals: [
      {
        title: 'This is a test title',
        description: 'This is a test description',
        location: [47.42500299887883, -350.6236595328665],
        type: 'Schlagloch',
        votes: 2,
        /* eslint-disable-next-line */
        image: require('@/assets/schlagloch1.jpg'),
      },
      {
        title: 'Second proposal',
        description: 'Second test description',
        location: [47.42666881366304, -350.6105150113581],
        type: 'Test',
        votes: 10,
        /* eslint-disable-next-line */
        image: require('@/assets/schlagloch1.jpg'),
      },
    ] as Proposal[],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
