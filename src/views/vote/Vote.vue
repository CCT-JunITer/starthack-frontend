<template>
  <v-container>

    <v-card-actions dense>
      <div class="subtitle-2 subtitle">
        Test
      </div>
      <v-spacer></v-spacer>
      <v-chip
        color="teal"
        text-color="white"
      >
        Abgeschlossen
        <v-icon right>
          mdi-check
        </v-icon>
      </v-chip>
    </v-card-actions>

    <v-card-subtitle>
      {{ investment.title }}
    </v-card-subtitle>
    <v-card-text>{{ investment.text }}</v-card-text>

    <v-chip
      color="teal"
      text-color="white"
      v-if="investment.status == 'finished'"
    >
      Abgeschlossen
      <v-icon right>
        mdi-check
      </v-icon>
    </v-chip>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class Vote extends Vue {
    investment = {
      title: 'Schlagloch',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      status: 'finished',
    };
}
</script>

<style lang="scss">

@import '~vuetify/src/styles/styles.sass';
.subtitle {
  color: map-get($purple, 'base');
}
</style>
