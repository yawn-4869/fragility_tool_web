<template>
    <el-form-item :label="label">
      <el-row :gutter="10">
        <el-col :xs="6" :sm="6" :lg="6">
          <el-select v-model="selectedValue" placeholder="请选择" @change="handleSelectChange">
            <el-option label="常数" value="1"></el-option>
            <el-option label="均匀分布" value="2"></el-option>
            <el-option label="正态分布" value="3"></el-option>
            <el-option label="对数正态分布" value="4"></el-option>
            <el-option label="威布尔分布" value="5"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="9" :sm="9" :lg="9">
          <el-input v-model="model[field+suffix1Map[selectedValue]]" :placeholder = "defaultText + '参数1'"></el-input>
        </el-col>
        <el-col :xs="9" :sm="9" :lg="9">
          <el-input v-model="model[field+suffix2Map[selectedValue]]" :disabled="isParam2Disabled" :placeholder = "defaultText + '参数2'"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
  </template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        required: true
      },
      model: {
        type: Object,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      defaultText:{
        type: String,
        required: true,
        default: ""
      }
    },
    data() {
      return {
        selectedValue: '1', // 用于存储选择的值
        param1:  '', // 参数1
        param2:  '', // 参数2
        isParam2Disabled: false, // 控制 param2 是否禁用
        suffix1Map: {
          '1' : '',
          '2' : 'Min',
          '3' : 'Mean',
          '4' : 'Mean',
          '5' : 'Shape'
        },
        suffix2Map: {
          '1' : 'none',
          '2' : 'Max',
          '3' : 'Variance',
          '4' : 'Variance',
          '5' : 'Scale'
        }
      };
    },
    created() {
      if (this.field === 'matStr') {
        this.selectedValue = '4';
        this.param1 = this.model[this.field + 'Mean'];
        this.param2 = this.model[this.field + 'Variance'];
      } else if (this.field === 'windDir') {
        this.selectedValue = '2';
        this.param1 = this.model[this.field + 'Min'];
        this.param2 = this.model[this.field + 'Max'];
      } else {
        this.selectedValue = '1';
        this.isParam2Disabled = true;
        this.param1 = this.model[this.field]
      }
    },
    methods: {
      handleSelectChange(value) {
        // 当 el-select 的值为 1 时，禁用 param2 输入框
        this.isParam2Disabled = (value == 1);
        this.selectedValue = value;
  
        // 更新 model
        this.updateModel();
      },
      updateModel() {
        if (this.isParam2Disabled) {
          // 当 param2 禁用时，只保存 param1 的值
          this.model[this.field] = this.param1;
        } else {
          // 否则，保存 param1 和 param2 的值
          if(this.selectedValue == 2) {
            this.model[this.field + 'Min'] = this.param1;
            this.model[this.field + 'Max'] = this.param2;
          } else if(this.selectedValue == 3 || this.selectedValue == 4) {
            this.model[this.field + 'Mean'] = this.param1;
            this.model[this.field + 'Variance'] = this.param2;
          }
        }
      }
    },
    watch: {
      // 监听 param1 和 param2 的变化，动态更新 model
      param1() {
        this.updateModel();
      },
      param2() {
        this.updateModel();
      }
    }
  };
  </script>
  