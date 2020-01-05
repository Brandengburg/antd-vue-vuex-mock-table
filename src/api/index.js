import axios from 'axios'

export function getEmployeeList (params) {
  return axios.request({
    url: '/employee/list',
    method: 'get',
    data: params
  })
}

export function editEmployee(params) {
  return axios.request({
    url: '/employee/edit',
    method: 'post',
    data: params
  })
}

export function addEmployee(params) {
  return axios.request({
    url: '/employee/add',
    method: 'put',
    data: params
})
}

export function deleteEmployee(params) {
  return axios.request({
    url: '/employee/delete',
    method: 'delete',
    data: params
  })
}