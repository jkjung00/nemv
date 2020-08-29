<template>
  <v-app>
    <v-navigation-drawer permanent disable-resize-watcher fixed app>
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
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>fas fa-ellipsis-v</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="!$store.state.token" @click="$router.push('sign')">
            <v-list-item-title>로그인</v-list-item-title>
          </v-list-item>
          <v-list-item v-else @click="signOut()">
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main style="margin-top: 56px;">
      <router-view />
    </v-main>
    <v-footer fixed app>
      <span>&copy; 2020 {{$store.state.token}}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      items: [
        {
          icon: 'fa-home',
          title: 'LV0',
          to: {
            path: '/'
          }
        },
        {
          icon: 'fa-home',
          title: 'LV1',
          to: {
            path: '/lv1'
          }
        },
        {
          icon: 'fa-home',
          title: 'LV2',
          to: {
            path: '/lv2'
          }
        },
        {
          icon: 'fa-home',
          title: 'LV3',
          to: {
            path: '/lv3'
          }
        },
        {
          icon: 'fa-user',
          title: '사용자관리',
          to: {
            path: '/user'
          }
        },
        {
          icon: 'fa-book',
          title: '페이지관리',
          to: {
            path: '/page'
          }
        }
      ],
      title: this.$apiRootPath
    }
  },
  methods: {
    signOut () {
      this.$store.commit('delToken')
      this.$router.push('/', () => {})
    }
  }
}
</script>
