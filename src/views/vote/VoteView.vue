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
        <v-col cols="6">
          <v-select
            :items="sort"
            v-model="selectedSort"
            return-object
            dense
          >
          </v-select>
        </v-col>
        <v-col cols="12" v-for="(submission, i) in sorted" :key="i">

          <v-card>

            <v-img
              class="white--text align-end"
              height="200"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="submission.image"
            >
              <v-card-title>{{ submission.title }}</v-card-title>
            </v-img>

            <v-card-actions>
              <div class="overline subtitle ml-2">
                {{ submission.type }}
              </div>
              <v-spacer></v-spacer>
              <v-btn text small rounded class="mx-1" @click="jumpToProposal(submission)">
                <v-icon>
                  mdi-map-marker
                </v-icon>
                Go to location
              </v-btn>
            <v-chip>
              <v-icon color="purple">
                mdi-timer-sand
              </v-icon>
              in progress
            </v-chip>
            </v-card-actions>

            <v-card-text>{{ submission.description }}</v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Evan You</v-list-item-title>
                </v-list-item-content>

                <v-row
                  align="center"
                  justify="end"
                >
                  <v-btn icon @click="toggleHeart(submission)">
                    <v-icon :color="submission.voted ? 'red' : ''">
                      mdi-heart
                    </v-icon>
                  </v-btn>
                  <span class="subheading mr-2">{{ submission.votes }}</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable global-require, no-param-reassign, class-methods-use-this */
import { Proposal } from '@/interfaces/Proposal';
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class VoteView extends Vue {
  toggleHeart(submission: Proposal): void {
    submission.voted = !submission.voted;
    submission.votes += (submission.voted ? 1 : -1);
  }

  sort = [
    {
      text: 'Votes aufsteigend',
      filter: <T extends Array<Proposal>>(v: T): T => v.sort((o1, o2) => o1.votes - o2.votes),
    },
    {
      text: 'Votes absteigend',
      filter: <T extends Array<Proposal>>(v: T): T => v.sort((o1, o2) => o2.votes - o1.votes),
    },
    {
      text: 'Neuste zuerst',
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

  jumpToProposal(submission: Proposal): void {
    this.$store.commit('setSelectedProposal', { proposal: submission, selected: true });
    this.$router.push('/map');
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

.subtitle {
  color: map-get($purple, 'base');
}
</style>
