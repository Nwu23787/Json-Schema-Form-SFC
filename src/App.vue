<template>
  <div class="container">
    <div class="menu">
      <h1>表单自动生成器</h1>
      <div class="menus">
        <button
          v-for="(item, index) in 2"
          :key="index"
          class="menuButton menuSelected"
        >
          按钮
        </button>
      </div>
    </div>
    <div class="content">
      <div class="code">
        <MonacoEditor
          :code="demo.schemaCode"
          :onChange="handleSchemaChange"
          title="Schema"
          class="codePanel"
        ></MonacoEditor>
        <div class="uiAndValue">
          <MonacoEditor
            :code="demo.uiSchemaCode"
            :onChange="handleUISchemaChange"
            title="UISchema"
            class="codePanel"
          ></MonacoEditor>
          <MonacoEditor
            :code="demo.dataCode"
            :onChange="handleDataChange"
            title="Value"
            class="codePanel"
          ></MonacoEditor>
        </div>
      </div>
      <div class="form">
        <SchemaForm
          :schema="demo.schema"
          :value="demo.data"
          :onChange="handleChange"
        ></SchemaForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, reactive, ref, shallowRef, watchEffect } from "vue";
import MonacoEditor from "./components/MonacoEditor";
//导入测试数据对象
import demos from "./demos";

//导入表单
import SchemaForm from "../lib/SchemaForm.vue";

// 传给 monac 的schema格式化函数
const toJson = (data: any) => {
  return JSON.stringify(data, null, 2);
};

// 当前选择的demo测试数据
const selectedRef: Ref<number> = ref(0);

// 主界面的数据对象
const demo: {
  schema: any;
  //对应value
  data: any;
  uiSchema: any | null;
  schemaCode: string;
  dataCode: string;
  uiSchemaCode: string;
  customValidate?: ((d: any, e: any) => void) | undefined;
} = reactive({
  schema: null,
  data: {},
  uiSchema: {},
  schemaCode: "",
  dataCode: "",
  uiSchemaCode: "",
  customValidate: undefined,
});

const uiSchema = shallowRef({});

watchEffect(() => {
  //根据选择的demo数据的不同，初始化不同的数据
  const index = selectedRef.value;
  const d: any = demos[index];
  demo.schema = d.schema as any;
  demo.data = d.default;
  // demo.uiSchema = d.uiSchema
  uiSchema.value = d.uiSchema;
  demo.schemaCode = toJson(d.schema);
  demo.dataCode = toJson(d.default);
  demo.uiSchemaCode = toJson(d.uiSchema);
  demo.customValidate = d.customValidate;
});

// 用于处理表单值变化导致的value变化
// eslint-disable-next-line
const handleChange = (v: any) => {
  demo.data = v;
  demo.dataCode = toJson(v);
};

// 处理输入schema数据变化的回调函数
function handleCodeChange(
  filed: "schema" | "data" | "uiSchema",
  value: string
) {
  try {
    //尝试解析jsno
    const json = JSON.parse(value);
    demo[filed] = json;
    (demo as any)[`${filed}Code`] = value;
  } catch (err) {
    console.log(err);
  }
}

//三个输入的处理变化的回调
const handleSchemaChange = (v: string) => handleCodeChange("schema", v);
const handleDataChange = (v: string) => handleCodeChange("data", v);
const handleUISchemaChange = (v: string) => handleCodeChange("uiSchema", v);
</script>

<style>
.codePanel {
  min-height: 400px;
  margin-bottom: 20px;
}

body {
  margin: 0px;
  padding: 0px;
}
* {
  box-sizing: border-box;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px;
  margin: 0 auto;
}
.menu {
  margin-bottom: 20px;
  background-color: #3fb983;
  padding-top: 20px;
  min-width: 1200px;
}
.menu > h1 {
  text-align: center;
  color: #fff;
  font-size: 40px;
}
.code {
  width: 700px;
  flex-shrink: 0;
}
.codePanel {
  min-height: 400px;
  margin-bottom: 20px;
}
.uiAndValue {
  display: flex;
  justify-content: space-between;
}
.uiAndValue > * {
  width: 46%;
}
.content {
  display: flex;
}
.form {
  padding: 0 20px;
  flex-grow: 1;
}
.menuButton {
  appearance: none;
  border-width: 0;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  padding: 10px;
  color: #fff;
  border-radius: 5px;
}
.menuButton + .menuButton {
  margin-left: 15px;
}
.menuButton:hover {
  background: #fff;
  color: #3fb983;
}
.menuSelected {
  background: #fff;
  color: #3fb983;
}
.menuSelected:hover {
  background: #fff;
  color: #3fb983;
}
.menus {
  width: 1200px;
  padding: 20px;
  margin: 0 auto;
}
</style>
