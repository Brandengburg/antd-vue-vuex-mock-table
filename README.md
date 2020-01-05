<p align="center">
  <img width="100" src="https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg"/>
  <img width="100" src="http://cn.vuejs.org/images/logo.png"/>
</div>

# vue-project

> 该项目是对 Ant Design Vue 部分组件的相关实践，包括表格关联mock数据，数据分类筛选等

* 基于 Vue 2.0 [Vue 2.0 中文文档](http://cn.vuejs.org/v2/guide/)
* 基于 Ant Design Vue 1.4 [Ant Design Vue 中文文档](https://www.antdv.com/docs/vue/introduce/)

## 安装与引入
```bash
npm install antd-vue --save
```

```js
import Antd from 'ant-design-vue'

Vue.use(Antd)
```

### 编译热加载调试
```
npm run serve
```

### 编译产品化
```
npm run build
```

### 自定义配置
[Configuration Reference](https://cli.vuejs.org/config/).

## 目录结构

```
vue-project/
|--node_modules/            
|--public/    
|--src/                         组件
|--|--api/                      接口
|--|--|--index.js               接口js文件
|--|--assets/
|--|--components/               组件
|--|--|--table/                 表格组件
|--|--|--|--addEmployee.vue     addEmployee.vue文件
|--|--|--|--editEmployee.vue    editEmployee.vue文件
|--|--mock/                     数据模拟工具
|--|--|--index.js               数据模拟.js文件
|--|--store/                    状态管理工具
|--|--|--index.js               状态管理.js文件
|--|--view/                     界面文件夹
|--|--|--table.vue              表格文件
|--|--App.vue                   主页面.vue文件
|--|--main.js                   配置文件
```