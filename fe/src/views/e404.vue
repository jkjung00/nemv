<template>
  <v-container>
    <v-alert type="warning" :value="true">
      {{$route.path}} - Not Found Page.
    </v-alert>
  </v-container>
</template>
