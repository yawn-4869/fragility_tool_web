<template>
    <div class="item-wrapper">
      <!-- <el-row> -->
        <p style="white-space: nowrap; margin-right: 10px; min-width: 140px;">{{ labelText }}</p>
        <el-select v-model="localSelect" placeholder="请选择" style="margin-right: 10px; min-width: 130px" @change="handleSelectChange">
          <el-option label="常数" value="1"></el-option>
          <el-option label="均匀分布" value="2"></el-option>
          <el-option label="正态分布" value="3"></el-option>
          <el-option label="对数正态分布" value="4"></el-option>
          <el-option label="威布尔分布" value="5"></el-option>
        </el-select>
        <el-input :placeholder="getPlaceholderText1()" v-model="localInput1" required style="margin-right: 10px;" @input="handleInputChange1"></el-input>
        <el-input :placeholder="getPlaceholderText2()" :disabled="this.localSelect == 1" :reuired="this.localSelect != 1" v-model="localInput2" @input="handleInputChange2"></el-input>
      <!-- </el-row> -->
    </div>
</template>

<script>
export default {
  name: 'SelectItem',
  props: {
    id: String,
    labelText: String,
    select: Number,
    input1: String,
    input2: String,
  },
  data() {
    return {
      localSelect: this.select,
      localInput1: this.input1,
      localInput2: this.input2,
      placeholders: {
        '1': '常数值',
        '2': '无',
        '3': '上限',
        '4': '下限',
        '5': '均值',
        '6': '方差',
        '7': '均值',
        '8': '方差',
        '9': '形状',
        '10': '尺度'
      }
    };
  },
  methods: {
    getPlaceholderText1() {
      return this.placeholders[this.localSelect * 2 - 1] || '参数1';
    },
    getPlaceholderText2() {
      return this.placeholders[this.localSelect * 2] || '参数2';
    },
    // validate() {
    //   let valid = true;
    //   if (!this.localInput1) {
    //     valid = false;
    //     this.$message.error(labelText + '第一个参数不能为空');
    //   }
    //   if (this.localSelect != 1 && !this.localInput2) {
    //     valid = false;
    //     this.$message.error(labelText + '第二个参数不能为空');
    //   }
    //   return valid;
    // },
    handleSelectChange(value) {
      this.$emit('update:select', { id: this.id, value });
    },
    handleInputChange1() {
      this.$emit('update:input1', { id: this.id, value: this.localInput1 });
    },
    handleInputChange2() {
      this.$emit('update:input2', { id: this.id, value: this.localInput2 });
    }
  },
  watch: {
    select(newVal) {
      this.localSelect = newVal;
    },
    input1(newVal) {
      this.localInput1 = newVal;
    },
    input2(newVal) {
      this.localInput2 = newVal;
    }
  }
};
</script>
<style lang="scss" scoped>
// .item-wrapper {
//     display: flex;
//     align-items: center;
//     margin-bottom: 10px;
// }
</style>  