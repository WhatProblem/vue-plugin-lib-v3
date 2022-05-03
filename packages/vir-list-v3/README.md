### vue3 插件 vir-list-v3

#### 插件的安装

```bash
npm i vir-list-v3
```

#### 引入插件

```bash
import virListV3Plugin from 'vir-list-v3';
import 'vir-list-v3/index.css';

app.use(virListV3Plugin);
```

#### 基本用法

```vue
<vir-list-v3 vmodel="demo" :options="options" labelName="名称" @change="onChange" />

<vir-list-v3 vmodel="demo" :options="options" labelName="名称">
    <template #default="{item}">
        <span>{{item.label}}</span>
        <span>{{item.value}}</span>
    </template>
</vir-list-v3>

export default {
    data() {
        demo: 1,
        options: [
            { label: 'xxxx', value: 1 },
            { label: 'yyyy', value: 2 }
        ]
    }
}
```

#### API 说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | :--- | :--- | :---: |
| v-model | 双向绑定变量 | 基本类型 | - |
| change  | 切换回调函数 | Function | - |
| options | 接口返回的下拉数据列表 | 对象数组 Array<Object> | [] |
| labelName | label 绑定的文案名称 | String | '' |
| labelWidth | 文案宽度(px) | String | '72' |
| labelPositon | 文案位置(text-align) | String | 'right' |
| placeholder | placeholder | String | '请选择内容' |
| headerHeight | 选择框高度(px) | String | '30' |
| lineHeight | line-height | String | '30' |
| showNum | 下拉框显示的条数 | Number | 10 |
