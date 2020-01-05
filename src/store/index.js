import Vue from 'vue'
import Vuex from 'vuex'
import { getEmployeeList, deleteEmployee , editEmployee , addEmployee } from '../api'
Vue.use(Vuex)
const RESQUEST_TABLELIST = 'RESQUEST_TABLELIST'
const RESQUEST_DELETE = 'RESQUEST_DELETE'
const RESQUEST_ADD = 'RESQUEST_ADD'
const RESQUEST_EDIT = 'RESQUEST_EDIT'

const store = new Vuex.Store({
  state: {
    tableList: [],
  },
  getters: {
    getTableData (state) {
      return state.tableList
    }
  },
  actions: {
    fetchTableData (context) {
      context.commit(RESQUEST_TABLELIST)
    },
    fetchAddData (context, key) {
      context.commit(RESQUEST_ADD, key)
    },
    fetchEditData (context, key) {
      context.commit(RESQUEST_EDIT, key)
    },
    fetchDeleteData (context, key) {
      context.commit(RESQUEST_DELETE, key)
    }
  },

  mutations: {
    [RESQUEST_TABLELIST] (state) {
      getEmployeeList().then(response => {
        state.tableList = response.data
      })
    },
    [RESQUEST_DELETE] (state, key) {
      deleteEmployee(key).then(response => {
        state.tableList = response.data
      })
    },
    [RESQUEST_ADD] (state, key) {
      addEmployee(key).then(response => {
        state.tableList = response.data
      })
    },
    [RESQUEST_EDIT] (state, key) {
      editEmployee(key).then(response => {
        state.tableList = response.data
      })
    }
  }
})

export default store
