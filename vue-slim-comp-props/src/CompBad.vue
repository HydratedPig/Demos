<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'
import { createReusableTemplate } from '@vueuse/core'

defineProps<{
  btn1_1Opt?: {
    name?: string
    click?: (...args: any[]) => void
  }
  btn1_2Opt?: {
    name?: string
    click?: (...args: any[]) => void
  }
  btn1_3Opt?: {
    name?: string
    click?: (...args: any[]) => void
  }
}>()

const [DefineButton, ReusedButton] = createReusableTemplate<{
  name: string
  onClick: (...args: any[]) => void
  vif?: MaybeRef<boolean>
}>()
function handleButton1Click(name: string) {
  console.log('CompBadClick', name)
}
</script>

<template>
  <DefineButton v-slot="{ name, onClick, vif = true }">
    <button v-if="vif" @click="onClick">
      {{ name ?? 'DefaultButton' }}
    </button>
  </DefineButton>
  <div class="bad_comp">
    BadButtons:
    <ReusedButton :name="btn1_1Opt?.name ?? 'CompBadBtn1'"
      @click="(btn1_1Opt?.click ?? handleButton1Click)('CompBadBtn1_1')" />
    <ReusedButton :name="btn1_2Opt?.name ?? 'CompBadBtn1_2'"
      @click="(btn1_2Opt?.click ?? handleButton1Click)('CompBadBtn1_2')" />
    <ReusedButton :name="btn1_3Opt?.name ?? 'CompBadBtn1_3'"
      @click="(btn1_3Opt?.click ?? handleButton1Click)('CompBadBtn1_3')" />
  </div>
</template>
<style scoped>
.bad_comp {
  border: 1px solid red;
}
</style>