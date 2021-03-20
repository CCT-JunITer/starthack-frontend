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
        location: [47.4254995925386, 9.377487163874322],
        type: 'Schlagloch',
        votes: 2,
        /* eslint-disable-next-line */
        image: require('@/assets/schlagloch1.jpg'),
      },
      {
        title: 'Second proposal',
        description: 'Second test description',
        location: [47.42702387138889, 9.387872677179987],
        type: 'Test',
        votes: 10,
        /* eslint-disable-next-line */
        image: require('@/assets/schlagloch1.jpg'),
      },
    ] as Proposal[],
  },
  mutations: {
    addNewProposal(state, proposal: Proposal) {
      state.proposals.push(proposal);
    },
    setSelectedProposal(state, { proposal, selected }: { proposal: Proposal, selected: boolean }) {
      const filteredProposals = state.proposals.filter((p) => p.title === proposal.title);
      if (filteredProposals.length >= 0) {
        filteredProposals[0].selected = selected;
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
