<template>
  <span>{{ timeLabel }}</span>
</template>

<script lang="ts" setup>
import en from './locales/en.json';
// import { useLogger } from '@nuxt/kit'
const useInit = () => {
  const _message = ref(en);
  const messages = computed(() => _message.value);
  const t = (s: string) => {
    const sArr = s.split('.');
    const res = sArr.reduce((cur: string | object | any[], i: any) => {
      if (typeof cur !== 'string' && (cur as any)[i]) {
        return (cur as any)[i]
      }
      return cur
    }, messages.value)
    return typeof res === 'string' ? res : '--'
  }
  return {
    t
  }
}

const $i18n = useInit();

const instance = getCurrentInstance()
await new Promise(resolve => setTimeout(resolve, 1000))
const instance2 = getCurrentInstance()
// if (!process.client) {
//   const logger = useLogger('./my-module')
//   logger.info(instance?.uid + '___' + instance2?.uid)
// }

console.log(instance?.uid + '___' + instance2?.uid)

const timeLabel = computed(() => $i18n.t('general.body.static'))
</script>

