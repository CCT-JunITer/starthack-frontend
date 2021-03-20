<template>
  <v-card v-bind="$attrs">

    <v-img
      class="white--text align-end"
      height="200"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="proposal.image"
    >
      <v-card-title>{{ proposal.title }}</v-card-title>
    </v-img>

    <v-card-actions>
      <div class="overline subtitle ml-2">
        {{ proposal.type }}
      </div>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!hideLocationButton"
        text
        small
        rounded
        class="mx-1"
        @click="jumpToProposal(proposal)">
        <v-icon>
          mdi-map-marker
        </v-icon>
        Go to location
      </v-btn>
    <v-chip
      small
      text-color="white"
      :color="{
          'none': 'red',
          'in progress': 'cyan',
          'finished': 'green',
          'created': 'grey',
        }[proposal.status || 'none']">
      <v-icon small left>
        {{
          {
            'none': 'mdi-none',
            'in progress': 'mdi-timer-sand',
            'finished': 'mdi-flag-checkered',
            'created': 'mdi-creation',
          }[proposal.status || 'none']
        }}
      </v-icon>
      {{ proposal.status }}
    </v-chip>
    </v-card-actions>

    <v-card-text>{{ proposal.description }}</v-card-text>

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
          <v-btn icon @click="toggleHeart(proposal)">
            <v-icon :color="proposal.voted ? 'red' : ''">
              mdi-heart
            </v-icon>
          </v-btn>
          <span class="subheading mr-2">{{ proposal.votes }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */
import { Proposal } from '@/interfaces/Proposal';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class ProposalCard extends Vue {
  @Prop()
  public proposal!: Proposal;

  @Prop({ required: false })
  public hideLocationButton!: boolean;

  jumpToProposal(proposal: Proposal): void {
    this.$store.commit('setSelectedProposal', { proposal, selected: true });
    this.$router.push('/');
  }

  // eslint-disable-next-line class-methods-use-this
  toggleHeart(proposal: Proposal): void {
    proposal.voted = !proposal.voted;
    proposal.votes += (proposal.voted ? 1 : -1);
  }
}
</script>

<style lang="scss">
.subtitle {
  color: map-get($purple, 'base');
}
</style>
