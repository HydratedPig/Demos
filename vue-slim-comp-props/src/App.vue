<script setup lang="ts">
import { ref } from 'vue'
import Comp from './Comp.vue'
import CompBad from './CompBad.vue'
const vif = ref(false)
function handleClickBtn1() {
  vif.value = !vif.value
}
function handleClickBtn1_2(compClick: (n: string) => void, name: string) {
  compClick(`TriggerByApp: ${name}`)
  console.log('AppBtn::', name)
}
const inputV = ref('')
const inputV2 = ref('')
function handleClickInput1() {
  console.log('AppInputV', inputV.value)
}
</script>

<template>
  <Comp>
    <template #button1_1="{ comp }">
      <component :is="comp" name="AppButton1_1" @click="handleClickBtn1" />
    </template>
    <template #button1_2="{ comp, onClick }">
      <component :is="comp" name="AppButton1_2" :vif="vif" @click="handleClickBtn1_2(onClick, 'AppBtn1_2')" />
    </template>
    <template #button2_1="{ comp }">
      <component :is="comp" name="AppBtn2_1" />
    </template>
    <template #input1_1="{ comp }">
      <component :is="comp" v-model="inputV" v-model:model-value2="inputV2" @click="handleClickInput1" />
    </template>
  </Comp>
  <CompBad />

  <div>InputModelValue: {{ inputV }}</div>
  <div>InputModelValue2: {{ inputV2 }}</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
