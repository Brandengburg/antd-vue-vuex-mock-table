import Mock from 'mockjs'

const Random = Mock.Random
const count = 50
let List = []

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i,
    name: Random.cname(),
    salary: Random.natural(8000, 15000),
    age: Random.natural(30, 65),
    seniority: Random.natural(10, 30)
  }))
}
export { List }

Mock.mock('/employee/list', 'get', function (options) {
  return List
})
Mock.mock('/employee/add', 'put', function (options) {
  var data = JSON.parse(options.body)
  List.push(data)
  return List
})
Mock.mock('/employee/edit', 'post', function (options) {
  var data = JSON.parse(options.body)
  List = data
  return List
})
Mock.mock('/employee/delete', 'delete', function (options) {
  var data = JSON.parse(options.body)
  var tableList = List.filter(item => item.id != data.id)
  List = tableList
  return List
})
