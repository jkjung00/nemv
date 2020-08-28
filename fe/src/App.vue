<template>
  <v-app>
    <v-navigation-drawer
      permanent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      disable-resize-watcher
      fixed
      app
    >
      <v-list class="py-0">
        <v-list-item-group>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon" color="primary"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar absolute dense dark width="calc(100% - 256px)" height="56px" style="margin-left: 256px;">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-text="miniVariant ? 'fas fa-chevron-right' : 'fas fa-chevron-left'" />
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="rightDrawer = !rightDrawer" />
    </v-app-bar>
    <v-main style="margin-top: 56px;">
      <router-view />
    </v-main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-item-group>
          <v-list-item @click="right = !right">
            <v-list-item-icon>
              <v-icon>compare_arrows</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    items: [
      {
        icon: 'fa-home',
        title: 'Home',
        to: {
          path: '/'
        }
      },
      {
        icon: 'fa-user',
        title: 'User',
        to: {
          path: '/user'
        }
      }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'jeffrey'
  })
}
</script>
