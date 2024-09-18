<template>
    <!-- <div class="condition-input-container"> -->
        <el-form ref="conditionForm" :model="conditionForm" label-position="top" label-width="180px">
            <el-row gutter="20">
                <el-col :xs="24" :sm="24" :lg="6">
                    <span class="title">分析类型</span>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="6" :lg="12">
                            <el-form-item label="分析方式">
                                <el-select v-model="conditionForm.anaTy" placeholder="分析方式">
                                    <el-option label="IDA" value="1"></el-option>
                                    <el-option label="随机模拟" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="8" :lg="12">
                            <el-form-item label="风场数量">
                                <el-input v-model="conditionForm.numF" placeholder="请输入随机风场数量"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="18">
                    <span class="title">IDA设置</span>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="4" :lg="3">
                            <el-form-item label="风速强度输入方法">
                                <el-select v-model="conditionForm.imimpM" placeholder="风速强度输入方法">
                                    <el-option label="等差数列" value="1"></el-option>
                                    <el-option label="用户定义的文件" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="5" :lg="6">
                            <el-form-item label="轮毂风速强度 m/s">
                                <el-input v-model="conditionForm.windSpd" placeholder="请输入风速强度 m/s"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="4" :lg="3">
                            <el-form-item label="波浪参数输入方法">
                                <el-select v-model="conditionForm.wpinpM" placeholder="波浪参数输入方法">
                                    <el-option label="静水" value="1"></el-option>
                                    <el-option label="风浪耦合" value="2"></el-option>
                                    <el-option label="自定义" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="5" :lg="6">
                            <el-form-item label="极值波高 m">
                                <el-input v-model="conditionForm.waveHsF" :disabled="conditionForm.wpinpM != 3" placeholder="请输入对应文件所有内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="5" :lg="6">
                            <el-form-item label="峰值周期 s">
                                <el-input v-model="conditionForm.waveTpF" :disabled="conditionForm.wpinpM != 3" placeholder="请输入对应文件所有内容"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="6">
                    <span class="title">运行工况设置</span>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="6" :lg="12">
                            <el-form-item label="风机运行模式">
                                <el-select v-model="conditionForm.om" placeholder="风机运行模式">
                                    <el-option label="正常运行" value="1"></el-option>
                                    <el-option label="停机" value="2"></el-option>
                                    <el-option label="启动" value="3"></el-option>
                                    <el-option label="空转" value="4"></el-option>
                                    <el-option label="正常停机" value="5"></el-option>
                                    <el-option label="紧急停机" value="6"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="12">
                            <el-form-item label="制动开始时间 s">
                                <el-input v-model="conditionForm.shutT" :disabled="conditionForm.om < 4" placeholder="请输入制动停机开始时间 s"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="18">
                    <span class="title">模拟设置</span>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="5" :lg="6">
                            <el-form-item label="模拟时间 s">
                                <el-input v-model="conditionForm.simT" placeholder="请输入每个工况模拟时间 s"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="5" :lg="6">
                            <el-form-item label="分析步长 s">
                                <el-input v-model="conditionForm.openFastDT" placeholder="请输入OpenFAST分析步长 s"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="4" :lg="4">
                            <el-form-item label="叶片模拟方法">
                                <el-select v-model="conditionForm.bldSimM" placeholder="叶片模拟方法">
                                    <el-option label="铁木辛柯梁" value="1"></el-option>
                                    <el-option label="几何精确梁" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row><span class="title">风场模拟设置</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :lg="3">
                    <el-form-item label="湍流模型">
                        <el-select v-model="conditionForm.turbModel" placeholder="湍流模型">
                            <el-option label="IECKAI" value="IECKAI"></el-option>
                            <el-option label="IECVKM" value="IECVKM"></el-option>
                            <el-option label="GP_LLJ" value="GP_LLJ"></el-option>
                            <el-option label="NWTCUP" value="NWTCUP"></el-option>
                            <el-option label="SMOOTH" value="SMOOTH"></el-option>
                            <el-option label="WF_UPW" value="WF_UPW"></el-option>
                            <el-option label="WF_07D" value="WF_07D"></el-option>
                            <el-option label="WF_14D" value="WF_14D"></el-option>
                            <el-option label="TIDAL" value="TIDAL"></el-option>
                            <el-option label="API" value="API"></el-option>
                            <el-option label="USRINP" value="USRINP"></el-option>
                            <el-option label="TIMESR" value="TIMESR"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="3">
                    <el-form-item label="IEC 湍流类型">
                        <el-select v-model="conditionForm.iec_WindType" placeholder="IEC 湍流类型">
                            <el-option label="NTM" value="NTM"></el-option>
                            <el-option label="1ETM" value="1ETM"></el-option>
                            <el-option label="2ETM" value="2ETM"></el-option>
                            <el-option label="3ETM" value="3ETM"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="3">
                    <el-form-item label="风剖面类型">
                        <el-select v-model="conditionForm.windProfileType" placeholder="风剖面类型">
                            <el-option label="LOG" value="LOG"></el-option>
                            <el-option label="PL" value="PL"></el-option>
                            <el-option label="JET" value="JET"></el-option>
                            <el-option label="H2L" value="H2L"></el-option>
                            <el-option label="API" value="API"></el-option>
                            <el-option label="USR" value="USR"></el-option>
                            <el-option label="TS" value="TS"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item label="风剖面幂指数">
                        <el-input v-model="conditionForm.plexp" placeholder="请输入风剖面幂指数或default"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :lg="3">
                    <el-form-item label="尾流模型">
                        <el-select v-model="conditionForm.wakeMod" placeholder="尾流模型">
                            <el-option label="none" value="0"></el-option>
                            <el-option label="BEMT" value="1"></el-option>
                            <el-option label="DBEMT" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row><span class="title">OpenSees模拟设置</span></el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item label="风速强度">
                        <el-input v-model="conditionForm.im_Model" placeholder="请输入风强集合或All或none"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item label="第N个强度开始计算">
                        <el-input v-model="conditionForm.im_Nth" placeholder="请输入OpenSees计算数值"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item label="结构阻尼比">
                        <el-input v-model="conditionForm.dampR" placeholder="请输入结构阻尼比数值"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item label="分析步长 s">
                        <el-input v-model="conditionForm.openSeesDt" placeholder="请输入分析步长数值"></el-input>
                    </el-form-item>
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
export default {
    name: 'Condition',
    props: {
      taskId: {
        type: String,
        required: true
      },
    },
    data() {
    return {
        conditionForm: {
            anaTy: '1',
            numF: '20',
            imimpM: '1',
            windSpd: '[10,15,1]',
            wpinpM: '1',
            waveHsF: '',
            waveTpF: '',
            om: '1',
            shutT: '',
            simT: '3',
            openFastDT: '0.005',
            bldSimM: '1',
            turbModel: 'IECKAI',
            iec_WindType: 'NTM',
            windProfileType: 'PL',
            plexp: 'default',
            wakeMod: '0',
            im_Model: 'All',
            im_Nth: '1',
            dampR: '0.03',
            openSeesDt: '0.05',
            taskId: this.taskId
        },
        loading: false,
        isSubmit: false
    }
    },
    methods: {
        onSubmit() {
            this.loading = true
            this.$store.dispatch('task/configTaskStep2', this.conditionForm).then(() => {
                this.$message({
                    message: '提交成功',
                    type: 'success',
                })
                // this.$emit('update-active-name', 'Vulnerability');
                this.$router.push({ path: '/dashboard'});
                this.loading = false
                this.isSubmit = true;
            }).catch(() => {
                this.$message({
                    message: '提交失败',
                    type: 'error',
                })
                this.loading = false
            })
        },
        updateForm(newData) {
            this.conditionForm = { ...newData };
        }
    }
}
</script>

<style lang="scss" scoped>
    .condition-input-container {
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