<template>
    <div class="app-container">
      <div class="button-container">
        <el-button class="filter-item" style="margin-bottom: 10px; float: right" type="primary" icon="el-icon-edit" @click="nameDialogVisible = true">
          创建新任务
        </el-button>
        <el-dialog
          title="创建新任务"
          :visible.sync="nameDialogVisible"
          width="30%">
          <el-input v-model="taskName" placeholder="请输入任务名称" style="margin-bottom: 10px;"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="nameDialogVisible = false">取 消</el-button>
            <el-button type="primary" :loading="createLoading" @click="handleCreate">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" :span-method="objectSpanMethod">

        <el-table-column align="center" label="任务序号" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
  
        <el-table-column  align="center" label="创建时间">
          <template slot-scope="{row}">
            <span>{{ row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="最后更新时间">
          <template slot-scope="{row}">
            <span>{{ row.updateTime }}</span>
          </template>
        </el-table-column>
  
        <!-- <el-table-column class-name="status-col" label="任务状态" width="150" >
          <template slot-scope="{row}">
            <el-tag :type="row.taskStatus | statusFilter">
              {{ row.taskStatus }}
            </el-tag>
          </template>
        </el-table-column> -->

        <el-table-column class-name="status-col" label="参数输入">
          <template slot-scope="{ row, $index }">
            <el-button type="text" @click="handleInput(row, $index)">
              {{ row.stageText }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="计算任务">
          <template slot-scope="{row,$index}">
            <span>{{ ComputeTasks[$index % 5] }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="任务情况" width="200">
          <template slot-scope="{row}">
            <el-tag :type="row.taskStatus | statusFilter">
              {{ row.taskStatus }}
            </el-tag>
          </template>
        </el-table-column>
  
        <el-table-column align="center" label="操作" width="300">
            <template slot-scope="{row,$index}">
                <el-button size="mini" type="primary" @click="handleStart(row, $index)">
                    运行任务
                </el-button>
                <el-button :disabled="row.taskStatus != '任务完成' "  size="mini" type="success" @click="handleDownload(row, $index)">
                    结果下载
                </el-button>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
            <template slot-scope="{row,$index}">
                <el-button size="mini" type="primary" @click="handleChartView(row, $index)">
                    结果查看
                </el-button>
                <el-button size="mini" type="warning" @click="handleCancel(row)">
                    取消任务
                </el-button>
                <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                    删除任务
                </el-button>
            </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

        <el-dialog title="结果图表显示" :visible.sync="dialogFormVisible">
          <!-- <span>这是一段信息</span> -->
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
            <el-tab-pane label="NoE可视化" name="first">
              <div class="chart-container">
                <div class="NoE-chart1">
                  <NoECharts ref="chart1" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_4/NoE/NoE_B.txt`'/>
                </div>
                <div class="NoE-chart2">
                  <NoECharts ref="chart2" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_4/NoE/NoE_N.txt`'/>
                </div>
                <div class="NoE-chart3">
                  <NoECharts ref="chart3" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_4/NoE/NoE_S.txt`'/>
                </div>
                <div class="NoE-chart4">
                  <NoECharts ref="chart4" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_4/NoE/NoE_T.txt`'/>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="PoE可视化" name="second">
              <div class="chart-container">
                <div class="PoE-chart1">
                  <PoECharts ref="chart5" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_4/PoE/Frgl_B.txt`'/>
                </div>
                <div class="PoE-chart2">
                  <PoECharts ref="chart6" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_4/PoE/Frgl_N.txt`'/>
                </div>
                <div class="PoE-chart3">
                  <PoECharts ref="chart7" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_4/PoE/Frgl_S.txt`'/>
                </div>
                <div class="PoE-chart4">
                  <PoECharts ref="chart8" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_4/PoE/Frgl_T.txt`'/>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Vnbl可视化" name="third">
              <div class="chart-container">
                <div class="Vnbl-chart">
                  <VnblChart ref="chart9" :dataPath='`http://localhost:5202/r/${viewTask}/output/Step_5/`'/>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">
              关闭
            </el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              确认
            </el-button>
          </div>
        </el-dialog>
    </div>
  </template>
  
  <script>
  import Pagination from '@/components/Pagination'
  import PoECharts from './components/PoECharts.vue';
  import VnblChart from './components/VnblChart.vue';
  import NoECharts from './components/NoECharts.vue';
  import axios from 'axios'
  
  export default {
    name: 'Dashboard',
    components:{
      Pagination,
      NoECharts,
      PoECharts,
      VnblChart
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          任务完成: 'success',
          等待处理: 'info',
          正在处理: 'primary',
          任务失败: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        activeName: "first",
        dialogFormVisible: false,
        nameDialogVisible: false,
        taskName: '',
        createLoading: false,
        ComputeTasks: [
          '参数化建模', '一体化仿真', 'IDA数据生成', '易脆性分析', '易损性分析'
        ],
        TSMap: {
            "failed": "任务失败",
            "todo": "等待处理",
            "running": "正在处理",
            "done": "任务完成"
        },
        viewTask: '',
      }
    },
    created() {
      this.getList()
    },
    computed: {
      sortedList() {
        return this.list.slice().sort((a, b) => b.id - a.id);
      }
    },
    methods: {
      getList() {
        const taskList = [];
        this.listLoading = true;
        this.$store.dispatch('task/getTaskList', {taskId: ""}).then((response) => {
            response.data.forEach((message, index) => {
            const {taskId, curStage, curStatus, updateTime, createTime} = message
            // const formattedCreateTime = formatDateTime(createTime);
            const date = new Date(createTime);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
            const d = String(date.getDate()).padStart(2, '0');
            const h = String(date.getHours()).padStart(2, '0');
            const i = String(date.getMinutes()).padStart(2, '0');
            const formattedCreateTime = `${y}-${m}-${d} ${h}:${i}`

            const date2 = new Date(updateTime);
            const y2 = date2.getFullYear();
            const m2 = String(date2.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
            const d2 = String(date2.getDate()).padStart(2, '0');
            const h2 = String(date2.getHours()).padStart(2, '0');
            const i2 = String(date2.getMinutes()).padStart(2, '0');
            const formattedUpdateTime = `${y2}-${m2}-${d2} ${h2}:${i2}`
            for(let i = 0; i < 5; ++i) {
              let stageStatus = ''
              if(curStage > i + 1) {
                stageStatus = '任务完成'
              } else if(curStage == i + 1) {
                stageStatus = this.TSMap[curStatus]
              } else {
                stageStatus = '等待处理'
              }
              taskList.push({
                  id: index + 1,
                  taskId: taskId, 
                  taskStatus: stageStatus,
                  stageText: '',
                  computeText: '',
                  createTime: formattedCreateTime,
                  updateTime: formattedUpdateTime
              })
            }
            this.total = index + 1;
            });

            const start = (this.listQuery.page - 1) * this.listQuery.limit * 5;
            const end = start + this.listQuery.limit * 5;
            // console.log(start, end)
            // console.log(this.total);
            this.list = taskList.slice(this.total*5-end < 0 ? 0 : this.total*5-end, this.total*5-start).sort((a, b) => b.id - a.id);
            // this.list[0].taskStatus = '任务完成';
            this.listLoading = false;
        }).catch(() => {
            this.listLoading = false;
        })
      },
      handleCreate() {
        this.createLoading = true;
        this.$store.dispatch('task/addTask', this.taskName).then((response) => {
          this.createLoading = false;
          this.nameDialogVisible = false;
          
          // 确保 response.data 有效
          const taskId = response.data;
          if (taskId) {
            this.$router.push({ 
              path: '/input',
              query: { 
                activeTab: '',
                taskId: taskId
              }
            });
          } else {
            this.$message.error('创建任务失败：无效的任务ID');
          }
        }).catch((error) => {
          this.createLoading = false;
          this.$message.error('创建任务失败：' + error.message);
        });
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if(columnIndex == 4) {
          if(rowIndex % 5 == 0) {
            row.stageText = '参数化建模设置';
          } else if( rowIndex % 5 == 1) {
            row.stageText = '运行工况设置';
          } else {
            row.stageText = '易损性参数设置';
          }
        }
        if (columnIndex < 3) {
          if (rowIndex % 5 == 0) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        } else if (columnIndex == 3) {
          if(rowIndex % 5 < 2) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if(rowIndex % 5 == 2) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        } else if(columnIndex < 7) {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else {
          if (rowIndex % 5 == 0) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      handleInput(row, index) {
        // console.log(index)
        let tabname = '';
        if(index % 5 == 0) {
          tabname = 'Uncertainty'
        } else if(index % 5 == 1) {
          tabname = 'Condition'
        } else {
          tabname = 'Vulnerability'
        }
        // console.log(tabname)
        this.$router.push({ 
          path: '/input',
          query: { 
            activeTab: tabname,
            taskId: row.taskId
          }
        });
      },
      handleChartView(row, $index) {
        this.viewTask = row.taskId;
        this.dialogFormVisible = true;
        // console.log(this.viewTask)
      },
      handleStart(row, index) {
        console.log(row.taskStatus);
        if(row.taskStatus !== "等待处理") {
          if(!confirm('点击将重置本阶段及后续阶段的任务状态，是否确定')) {
            return;
          }
        }
        const param = {taskId: Number(row.taskId), taskStage: index % 5 + 1}
        this.$store.dispatch('task/startTask', param).then((response) => {
            this.$message({
                message: '计算任务已运行',
                type: 'success',
            })
            this.$store.dispatch('task/getTaskList', param).then((response) => {
              row.taskStatus = this.TSMap['running']
            });
        }).catch(() => {

        })
      },
      handleCancel(row) {
        this.$confirm('是否取消任务？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$store.dispatch('task/cancelTaskById', row.taskId).then((response) => {
                this.$message({
                    message: '任务已取消',
                    type: 'success',
                })
            }).catch(() => {
                this.$message({
                    message: '任务取消失败',
                    type: 'error',
                })
            })
        });
      },

      handleDownload(row, index) {
        let query = {taskId: row.taskId, TaskStage: index % 5 + 1, useZip: false}
        this.$store.dispatch('task/getResult', query).then((response) => {
        // let blob = new Blob([response], { type: 'application/zip' });
        
        // let currentTime = new Date().toISOString().slice(0, 19).replace(/[-T]/g, '').replace(/:/g, '');
        
        if (confirm('将导出任务' + row.taskId + ' ' + this.ComputeTasks[index % 5] + '阶段的结果, 是否确定')) {
          // let downloadLink = document.createElement('a');
          // downloadLink.href = URL.createObjectURL(blob);
          
          // downloadLink.download = currentTime + '.zip';
          
          // downloadLink.click();
          // URL.revokeObjectURL(downloadLink.href);
          let taskId = row.taskId;
          let stage = index % 5 + 1;
          const filepath = `http://localhost:5202/r/${taskId}/output/Step_${stage}.zip`;
          axios.get(filepath, {
            responseType: 'blob'
          }).then((response) => {
            let blob = new Blob([response.data], { type: 'application/zip' });

            let downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);

            downloadLink.download = `step_${stage}.zip`;

            downloadLink.click();

            // 释放 URL 对象
            URL.revokeObjectURL(downloadLink.href);
          });
        }
      }).catch((error) => {
        this.$message({ message: '下载失败', type: 'error' });
        console.error('下载失败：', error);
      });

      },
      handleDelete(row, index) {
        this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$store.dispatch('task/delTaskById', this.list[index].taskId).then((response) => {
                this.$message({
                    message: '删除成功',
                    type: 'success',
                })
                this.list.splice(0, 5)
                this.total -= 1;
            }).catch(() => {
                this.$message({
                    message: '删除失败',
                    type: 'error',
                })
            })
        }).catch(() => {
            this.$message({
                message: '已取消删除',
                type: 'info',
            })
        })
      },
      handleTabClick(tab) {
        // 等待下一次DOM更新循环后调用resize
        this.$nextTick(() => {
          if (this.$refs.chart1) this.$refs.chart1.resize();
          if (this.$refs.chart2) this.$refs.chart2.resize();
          if (this.$refs.chart3) this.$refs.chart3.resize();
          if (this.$refs.chart4) this.$refs.chart4.resize();
          if (this.$refs.chart5) this.$refs.chart5.resize();
          if (this.$refs.chart6) this.$refs.chart6.resize();
          if (this.$refs.chart7) this.$refs.chart7.resize();
          if (this.$refs.chart8) this.$refs.chart8.resize();
          if (this.$refs.chart9) this.$refs.chart9.resize();
        });
      }

    }
  }
  </script>
  
  <style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .chart-container {
    height: 600px;
    display: flex;
    flex-direction: column; /* 垂直排列子元素 */
    justify-content: center; /* 垂直居中 */
    align-items: center; /* 水平居中 */
  }

  .chart-container > div {
      height: 200px; /* 每个子元素平分可用空间 */
      width: 100%; /* 确保图表组件宽度占满父容器 */
      margin: 0 10px; /* 为每个子元素设置水平间距 */
  }
  .Vnbl-chart {
    height: 400px !important
  }

  .stage-container{
    width: 100%;
    height: 100%;
    border: none;
    td{
      width: 100%;
      padding: 5px;
      border-right: none;
      text-align: center;
      vertical-align: middle;
    }
  }
  tr:last-child{
    td{
      border-bottom: none;
    }
  }
  </style>
  