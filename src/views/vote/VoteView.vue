<template>
  <div class="root">
    <div class="backdrop"></div>
    <v-container :style="{ maxWidth: '800px' }">

      <v-row>
        <v-col cols="6">
          <v-btn text>
            <v-icon left>
              mdi-filter-variant
            </v-icon>
            Filter
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex">
          <v-icon left>
            mdi-filter-variant
          </v-icon>
          <v-select
            :items="sort"
            v-model="selectedSort"
            return-object
            dense
          >
          </v-select>
        </v-col>
        <v-col cols="12" v-for="(proposal, i) in sorted" :key="i">
          <proposal-card :proposal="proposal">
          </proposal-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable global-require, no-param-reassign, class-methods-use-this */
import ProposalCard from '@/components/ProposalCard.vue';
import { Proposal } from '@/interfaces/Proposal';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { ProposalCard },
})
export default class VoteView extends Vue {
  sort = [
    {
      text: 'votes ascending',
      filter: <T extends Array<Proposal>>(v: T): T => v.sort((o1, o2) => o1.votes - o2.votes),
    },
    {
      text: 'votes descending',
      filter: <T extends Array<Proposal>>(v: T): T => v.sort((o1, o2) => o2.votes - o1.votes),
    },
  ];

  selectedSort: {
    text: string;
    filter: <T extends Proposal[]>(v: T) => T;
  } = this.sort[0];

  get sorted(): Proposal[] {
    return this.selectedSort.filter(this.$store.state.proposals);
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.root {
  position: relative;
  background-color: map-get($grey, 'lighten-5');
  height: 100%;
  z-index: 1;
}
.backdrop {
  background-color: white;
  height: 200px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
}

</style>
