### 环境配置说明

开发环境配置文件为 `env.development`
部署环境配置文件为 `env.production`

### 运行

```
npm install
npm run dev
```

### build

```
npm build:prod
```

### 注意
在install后第一次运行前需要修改node_modules/dropzone/dist/dropzone.js的源代码

```
第1428行：
原代码：
return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
修改：        
return "" + this.options.paramName;
```