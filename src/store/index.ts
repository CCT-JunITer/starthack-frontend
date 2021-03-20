import Vue from 'vue';
import Vuex from 'vuex';
import { Proposal } from '@/interfaces/Proposal';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    proposals: [
      {
        title: 'pothole',
        description: 'There is a huge pothole, time to fix it !',
        location: [47.4254995925386, 9.377487163874322],
        type: 'pothole',
        votes: 2,
        /* eslint-disable-next-line */
        image: require('@/assets/schlagloch1.jpg'),
        status: 'in progress',
      },
      {
        title: 'plant a tree',
        description: 'make the city greener',
        location: [47.42702387138889, 9.387872677179987],
        type: 'nature',
        votes: 11,
        /* eslint-disable-next-line */
        image: require('@/assets/tree.jpg'),
        status: 'finished',
      },
    ] as Proposal[],
  },
  mutations: {
    addNewProposal(state, proposal: Proposal) {
      state.proposals.push(proposal);
    },
    setSelectedProposal(state, { proposal, selected }: { proposal: Proposal, selected: boolean }) {
      state.proposals = state.proposals.map(
        (p) => (p.title === proposal.title ? { ...proposal, selected } : p),
      );
    },
  },
  actions: {
  },
  modules: {
  },
});
