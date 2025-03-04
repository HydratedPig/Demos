<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'
import { createReusableTemplate } from '@vueuse/core'

const [DefineButton, ReusedButton] = createReusableTemplate<{
  name: string
  onClick: (...args: any[]) => void
  vif?: MaybeRef<boolean>
}>()
const [DefineButton2, ReusedButton2] = createReusableTemplate<{
  name: string
  onClick?: (...args: any[]) => void
}>()
const [DefineInput, ReusedInput] = createReusableTemplate<{
  'modelValue': string
  'modelValue2': string
  'onUpdate:modelValue'?: (value: string) => void
  'onUpdate:modelValue2'?: (value: string) => void
  'onClick'?: (...args: any[]) => void
}>()
function handleButton1Click(name: string) {
  console.log('CompClick', name)
}
</script>

<template>
  <DefineButton v-slot="{ name, onClick, vif = true }">
    <button v-if="vif" @click="onClick">
      {{ name ?? 'DefaultButton' }}
    </button>
  </DefineButton>
  <DefineButton2 v-slot="{ name, onClick }">
    <div>
      这是 button2<br>
      <button @click="onClick">
        {{ name ?? 'DefaultButton2' }}
      </button>
    </div>
  </DefineButton2>
  <DefineInput v-slot="{ onClick, ...opt }">
    <input v-model="opt.modelValue" @update:model-value="opt['onUpdate:modelValue']">
    <input v-model="opt.modelValue2" @update:model-value="opt['onUpdate:modelValue2']">
    <button @click="onClick">
      v-model
    </button>
  </DefineInput>
  <div class="great_comp">
    <div class="great_comp_1">
      Button1:
      <slot name="button1_1" :comp="ReusedButton" @click="handleButton1Click">
        <ReusedButton name="CompBtn1" @click="handleButton1Click('CompBtn1_1')" />
      </slot>
      <slot name="button1_2" :comp="ReusedButton" @click="handleButton1Click">
        <ReusedButton name="CompBtn1_2" @click="handleButton1Click('CompBtn1_2')" />
      </slot>
      <slot name="button1_3" :comp="ReusedButton" @click="handleButton1Click">
        <ReusedButton name="CompBtn1_3" @click="handleButton1Click('CompBtn1_3')" />
      </slot>
    </div>
    <div class="great_comp_2">
      <slot name="button2_1" :comp="ReusedButton2" />
      <slot name="button2_2" :comp="ReusedButton2" />
    </div>
    <div class="great_input_1"> 
      <slot name="input1_1" :comp="ReusedInput" />
    </div>
  </div>
</template>
<style scoped>
.great_comp {
  border: 1px solid rgb(0, 255, 0);
  &_1 {
    background-color: aqua;
  }
  &_2 {
    background-color: bisque;
  }
}
.great_input_1 {
  border: 1px solid rgb(155, 155, 0);
}
</style>
