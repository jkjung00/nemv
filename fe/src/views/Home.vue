<template>
  <div id="app">
    <v-btn>
      <v-icon @click="test()">change</v-icon>
    </v-btn>
    {{$store.state.token}}
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    test () {
      this.$store.state.token = 444
    }
  }
}
</script>
