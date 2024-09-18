import { addtask, getTask, delTask, uncertaintyConfig, conditionConfig, vulnerabilityConfig, resultDownload, cancelTask, runTask, taskConfig } from "@/api/task"

const state = {
  taskId: "",
  taskStatus: false
}

const mutations = {
  SET_TASK: (state, id) => {
    state.taskId = id
  }
}

const actions = {
    addTask({ commit }, data) {
      return new Promise((resolve, reject) => {
          addtask({taskName: data}).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getTaskList({ commit }, data) {
      // console.log(data.taskId)
      return new Promise((resolve, reject) => {
          getTask({curStatus: "", taskId: data.taskId, taskName: ""}).then(response => {
              resolve(response);
          }).catch(error => {
              reject(error);
          })
      });
    },

    delTaskById({ commit }, id) {
      return new Promise((resolve, reject) => {
        delTask({id: id}).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
      });
    },

    cancelTaskById({ commit }, id) {
      return new Promise((resolve, reject) => {
        cancelTask({taskId: id}).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
      });
    },

    startTask({ commit }, data) {
      return new Promise((resolve, reject) => {
        runTask({taskId: data.taskId, taskStage: data.taskStage}).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
      });
    },

    configTaskStep1({ commit }, data) {
      return new Promise((resolve, reject) => {
        uncertaintyConfig(data).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
      });
    },

    configTaskStep2({ commit }, data) {
      return new Promise((resolve, reject) => {
        conditionConfig(data).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
      });
    },

    configTaskStep3({ commit }, data) {
      return new Promise((resolve, reject) => {
        vulnerabilityConfig(data).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
      });
    },

    getConfig({ commit }, data) {
      return new Promise((resolve, reject) => {
        taskConfig(data).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
      });
    },

    getResult({ commit }, data) {
      // console.log(data)
      return new Promise((resolve, reject) => {
        resultDownload({taskId: data.taskId, TaskStage: data.TaskStage}).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
      });
    },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
