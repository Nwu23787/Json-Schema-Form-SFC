<script setup lang="ts">
import { Schema } from "./types";
const props = defineProps<{
  schema?: Schema;
  value?: any;
  onChange?: (v: any) => void;
}>();

const handleChange = (e) => {
  props.onChange(e.target.value);
};
</script>

<template>
  <input type="text" :value="props.value" @input="handleChange" />
</template>

<style scoped></style>
