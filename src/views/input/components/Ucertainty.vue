<template>
    <!-- <div class="uncertainty-input-container"> -->
        <el-form ref="uncertaintyForm" :model="uncertaintyForm" label-position="top" label-width="180px">
            <el-row>
                <el-col :xs="24" :sm="8" :lg="6">
                    <el-form-item label="样本（模型）数量">
                        <el-input v-model="uncertaintyForm.num_S" placeholder="请输入样本（模型）数量"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">塔筒几何参数</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="顶部高度 m" :model="uncertaintyForm" field="twrTH" defaultText="顶部高度"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="底部外径 m" :model="uncertaintyForm" field="twrBD" defaultText="底部外径"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="底部厚度 m" :model="uncertaintyForm" field="twrBT" defaultText="底部厚度"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="顶部外径 m" :model="uncertaintyForm" field="twrTD" defaultText="顶部外径"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="顶部厚度 m" :model="uncertaintyForm" field="twrTT" defaultText="顶部厚度"></custom-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">单桩几何参数</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="平台高度 m" :model="uncertaintyForm" field="subTH" defaultText="顶部高度"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="水深 m" :model="uncertaintyForm" field="watDep" defaultText="水深"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="一致外径 m" :model="uncertaintyForm" field="subUD" defaultText="外径"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="一致厚度 m" :model="uncertaintyForm" field="subUT" defaultText="厚度"></custom-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">材料参数</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="屈服强度 Pa" :model="uncertaintyForm" field="matStr" defaultText="屈服强度"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="弹性模量 Pa" :model="uncertaintyForm" field="matMod" defaultText="弹性模量"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="密度 kg/m^3" :model="uncertaintyForm" field="matDen" defaultText="密度"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="泊松比" :model="uncertaintyForm" field="matPoR" defaultText="泊松比"></custom-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">轮毂-机舱参数</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="轮毂质量 kg" :model="uncertaintyForm" field="hubMass" defaultText="轮毂质量"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="机舱质量 kg" :model="uncertaintyForm" field="nacMass" defaultText="机舱质量"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="轮毂高度 m" :model="uncertaintyForm" field="hubH" defaultText="轮毂高度"></custom-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">阻尼</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="叶片阻尼比" :model="uncertaintyForm" field="blDR" defaultText="叶片阻尼比"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="结构阻尼比" :model="uncertaintyForm" field="stDR" defaultText="结构阻尼比"></custom-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">风况</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="平均风速 m/s" :model="uncertaintyForm" field="windSpd" defaultText="平均风速"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="风向 deg" :model="uncertaintyForm" field="windDir" defaultText="风向"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="湍流强度" :model="uncertaintyForm" field="turbC" defaultText="湍流强度"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="地面粗糙度" :model="uncertaintyForm" field="z0" defaultText="地面粗糙长度"></custom-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">海况</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="极值波高 m" :model="uncertaintyForm" field="waveHs" defaultText="极值波高"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="峰值周期 s" :model="uncertaintyForm" field="waveTp" defaultText="峰值周期"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="入流方向 deg" :model="uncertaintyForm" field="waveDir" defaultText="入流方向"></custom-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">地震参数</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="PGA g" :model="uncertaintyForm" field="seisPGA" defaultText="PGA"></custom-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="6">
                    <custom-form-item label="入射方向 deg" :model="uncertaintyForm" field="seisDir" defaultText="入射方向"></custom-form-item>
                </el-col>
            </el-row>
            <el-form-item style="float: right;">
                <el-button type="primary" :loading="loading" @click="onSubmit">提交输入</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    <!-- </div> -->
</template>

<script>
import CustomFormItem from './CustomFormItem.vue';
export default {
    name: 'Uncertainty',
    components: {
        CustomFormItem
    },
    props: {
      taskId: {
        type: String,
        required: true
      },
    },
    data() {
    return {
        uncertaintyForm: {
            num_S: '2',
            twrTH: '87.6',
            twrBD: '6',
            twrBT: '0.027',
            twrTD: '3',
            twrTT: '0.019',
            subTH: '10',
            watDep: '20',
            subUD: '6',
            subUT: '0.06',
            matStr: '',
            matStrMean: '355000000',
            matStrVariance: '0.05',
            matMod: '210000000000',
            matDen: '8500',
            matPoR: '0.3',
            hubMass: '56780',
            nacMass: '240000',
            hubH: '90',
            blDR: '0.477465',
            stDR: '1',
            windSpd: '0',
            windDir: '',
            windDirMin: '-15',
            windDirMax: '15',
            turbC: '0.14',
            z0: '0.04',
            waveHs: '4',
            waveTp: '6',
            waveDir: '0',
            seisPGA: '0',
            seisDir: '0',
            taskId: this.taskId
        },
        loading: false
    }
    },
    methods: {
        onSubmit() {
            this.loading = true
            this.$store.dispatch('task/configTaskStep1', this.uncertaintyForm).then(() => {
                this.$message({
                    message: '提交成功',
                    type: 'success',
                })
                // this.$emit('update-active-name', 'Condition');
                this.$router.push({ path: '/dashboard'});
                this.loading = false
            }).catch(() => {
                this.$message({
                    message: '提交失败',
                    type: 'error',
                })
                this.loading = false
            })
            // console.log(this.uncertaintyForm)
        },
        updateForm(newData) {
            this.uncertaintyForm = { ...newData };
            // console.log(this.uncertaintyForm);
        }
    }
}
</script>

<style lang="scss" scoped>
    .uncertainty-input-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);
        position: relative;
        height: 100%;
    }
    .title {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .title::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 20px;
        background-color: blue;
        margin-right: 8px;
    }
</style>