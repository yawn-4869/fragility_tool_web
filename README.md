### 运行

```
npm install
npm run dev
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

@echo off
START "Fragility_tool-backend" javaw -jar D:\Fragility_tool\Software\BackEnd\Fragility_tool-backend.jar
exit