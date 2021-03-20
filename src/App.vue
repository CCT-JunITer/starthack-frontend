<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app temporary>
      <v-list dense nav>
        <v-list-item
          color="red"
          v-for="(item, i) in menuItems"
          exact
          :key="i"
          :to="item.path">
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{item.title}}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      color="#e00025"
      dark
    >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>St. Gallen</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon>
            {{ item.icon }}
          </v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-img
        alt="Vuetify Logo"
        class="shrink"
        contain
        src="@/assets/wappen.svg"
        transition="scale-transition"
        width="27"
      />

    </v-app-bar>

    <v-main style="z-index: 0">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  menuItems = [
    {
      path: '/',
      title: 'Map',
      icon: 'mdi-map-marker',
    },
    {
      path: '/vote',
      title: 'Vote',
      icon: 'mdi-crane',
    },
  ];

  sidebar = false;
}
</script>

<style lang="scss">

</style>
