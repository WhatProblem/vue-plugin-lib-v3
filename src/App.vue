<template>
  <div>
    <vir-list-v3 v-model="vList" labelName="测试" style="width: 360px" :options="options" />
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'

const vList = ref(null)
const options = ref([
  { label: '111', value: 1 }
])
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
