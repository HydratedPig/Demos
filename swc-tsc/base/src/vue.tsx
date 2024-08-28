import { defineComponent, ref, watch, Ref } from "vue";

function renderYesOrNoText(bool?: Boolean | number) {
  if (bool === undefined) return '-'
  return bool ? '是' : '否';
}

const Component1 = defineComponent({
  name: "Component1",
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const mergedValue = ref<boolean>(props.value);
    watch(() => props.value, (value) => {
      mergedValue.value = value;
    })
    const handleClick = () => {
      mergedValue.value = !mergedValue.value;
      emit('update:value', mergedValue.value);
      emit('change', mergedValue.value);
    }
    return () => <div onClick={handleClick}>{renderYesOrNoText(mergedValue.value)}</div>;
  },
})

export default defineComponent({
  name: "MyComponent",
  setup() {
    const selected = ref(false) as Ref<boolean>;
    return () => (
      <div>
        MyComponent is selected: {renderYesOrNoText(selected.value)}<br />
        Click It: <Component1 v-model={[selected.value, 'value']} />
      </div>
    )

  },
})