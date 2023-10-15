<!-- 用于分发不同类型的组件 -->

<script setup lang="ts">
import { Schema, SchemaTypes } from "./types";
import StringField from "./Field/StringField.vue";
import NumberField from "./Field/NumberField.vue";
import { watch } from "vue";

const props = defineProps<{
  schema?: Schema;
  value?: any;
  onChange?: (v: any) => void;
}>();

let myComponent: any = null;

switch (props.schema?.type) {
  case SchemaTypes.STRING: {
    myComponent = StringField;
    break;
  }
  case SchemaTypes.NUMBER: {
    myComponent = NumberField;
    break;
  }
  default: {
    console.warn(`${props.schema?.type} is not supported`);
  }
}

// watch(
//   () => props.schema.type,
//   () => {
//     console.log(123);
//   }
// );

console.log("收到了", props.value);
</script>

<template>
  <myComponent v-bind="props"></myComponent>
</template>

<style scoped></style>
