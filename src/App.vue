<template>
  <div>
    <vir-list-v3 v-model="vList" labelName="测试" style="width: 360px" :options="options">
      <template #default="{item}">
        <span>ceshi{{item.label}}</span>
      </template>
    </vir-list-v3>
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
const options = ref<Array<{label: string, value: any}>>([])
for (let i = 0; i<10000; i++) {
  options.value.push({label: '测试' + i, value: i})
}
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
