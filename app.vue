<template>
  <span>{{ timeLabel }}</span>
</template>

<script lang="ts" setup>
import en from './locales/en.json';
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

await new Promise(resolve => setTimeout(resolve, 10))

const timeLabel = computed(() => $i18n.t('general.body.static'))
</script>

