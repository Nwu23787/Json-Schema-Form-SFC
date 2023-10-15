<script setup lang="ts">
import SchemaItem from "./SchemaItem.vue";
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>

<template>
  <div>这是表单</div>
  <SchemaItem v-bind="attrs"></SchemaItem>
</template>

<style scoped></style>
