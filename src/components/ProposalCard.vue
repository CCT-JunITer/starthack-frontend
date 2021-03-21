<template>
  <v-card v-bind="$attrs">

    <v-img
      class="white--text align-end"
      height="200"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="proposal.image"
    >
      <v-card-title v-if="!edit">{{ proposal.title }}</v-card-title>
      <v-text-field dark v-else v-model="proposal.title"></v-text-field>
    </v-img>

    <upload-photo v-model="proposal.image" v-if="edit" :noPreview="true">
    </upload-photo>

    <v-card-actions>
      <div v-if="!edit" class="overline subtitle ml-2">
        {{ proposal.type }}
      </div>
      <v-text-field v-else v-model="proposal.type" class="subtitle"></v-text-field>

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
      <v-text-field dense v-model="proposal.status" v-if="edit" shaped></v-text-field>
      <span v-else>{{ proposal.status }}</span>
    </v-chip>
    </v-card-actions>

    <v-card-text v-if="!edit">
      <div v-for="line in proposal.description.split('\n')" :key="line">
        {{ line }}
      </div>
    </v-card-text>
    <v-textarea v-else v-model="proposal.description"></v-textarea>

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
          <span class="subheading mr-2" v-if="!edit">{{ proposal.votes }}</span>
          <v-text-field
            :value="'' + proposal.votes"
            @input="proposal.votes = +$event"
            v-else
            type="number">
          </v-text-field>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */
import { Proposal } from '@/interfaces/Proposal';
import { Vue, Component, Prop } from 'vue-property-decorator';
import UploadPhoto from './UploadPhoto.vue';

@Component({
  components: { UploadPhoto },
})
export default class ProposalCard extends Vue {
  @Prop()
  public proposal!: Proposal;

  @Prop({ required: false })
  public hideLocationButton!: boolean;

  get edit(): boolean {
    return this.$store.getters.isDeveloper;
  }

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
