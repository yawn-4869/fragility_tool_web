<template>
    <div class="dashboard-container">
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="参数化建模设置" name="Uncertainty">
                <Ucertainty ref="UncertaintyTab" :taskId="this.taskId" @update-active-name="updateActiveName"/>
            </el-tab-pane>
            <el-tab-pane label="运行工况设置" name="Condition">
                <Condition ref="ConditionTab" :taskId="this.taskId" @update-active-name="updateActiveName"/>
            </el-tab-pane>
            <el-tab-pane label="易损性参数设置" name="Vulnerability">
                <Vulnerability ref="VulnerabilityTab" :taskId="this.taskId" @update-active-name="updateActiveName"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Condition from './components/Condition.vue'
import Vulnerability from './components/Vulnerability.vue'
import Ucertainty from './components/Ucertainty.vue'
export default {
    name: 'Input',
    components:{
        Condition,
        Vulnerability,
        Ucertainty
    },
    data() {
        return {
            activeName: 'Uncertainty',
            taskId: '',
            formData: {
                Uncertainty: {},
                Condition: {},
                Vulnerability: {}
            },
        }
    },
    created() {
        this.activeName = this.$route.query.activeTab || 'Uncertainty';
        this.taskId = this.$route.query.taskId || '0';
        this.$store.dispatch('task/getConfig', {configType: this.activeName, taskId: this.taskId}).then((response) => {
            if(response.data) {
                this.$refs.UncertaintyTab.updateForm(response.data)
            }
        }).catch(() => {
            this.listLoading = false;
        })
    },
    methods: {
        updateActiveName(newActiveName) {
            this.activeName = newActiveName;
        },
        handleClick() {
            this.$store.dispatch('task/getConfig', {configType: this.activeName, taskId: this.taskId}).then((response) => {
                if(response.data) {
                    if(this.activeName == 'Uncertainty') {
                        this.$refs.UncertaintyTab.updateForm(response.data)
                    } else if(this.activeName == 'Condition') {
                        this.$refs.ConditionTab.updateForm(response.data)
                    } else if(this.activeName == 'Vulnerability') {
                        this.$refs.VulnerabilityTab.updateForm(response.data)
                    }
                }
            }).catch(() => {
                
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .dashboard-container {
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