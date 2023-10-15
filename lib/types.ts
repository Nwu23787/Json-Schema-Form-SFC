import { PropType } from "vue";

export enum SchemaTypes {
  "NUMBER" = "number",
  "INTEGER" = "integer",
  "STRING" = "string",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolen",
}

type SchemaRef = { $ref: string };

//定义 schema 类型
export interface Schema {
  /* 数据类型 */
  type: SchemaTypes | string;
  /*  */
  const?: any;
  /* 校验规则 */
  format?: string;
  default?: any;
  /* 子属性 */
  properites?: {
    [key: string]: Schema | { $ref: string };
  };
  /* 数组元素类型 */
  items?: Schema | Schema[] | SchemaRef;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  //   vjsf?: VueJsonSchemaConfig
  required?: string[];
  enum?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;
}

//定义props类型
export type FiledPropsType = {
  schema?: {
    type: Schema;
  };
  value: {
    type: any;
  };
  onChange?: (v: any) => void;
};

export const FiledPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
  },
} as const;
