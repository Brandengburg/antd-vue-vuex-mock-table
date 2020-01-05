/* eslint-disable no-unused-vars */
<template>
  <div class="table">
    <div>
      <a-collapse
        :bordered="false"
        style="width: 80%; height: 100px; margin-left: 10%;margin-top: 20px"
      >
        <template v-slot:expandIcon="props">
          <a-icon
            type="caret-right"
            :rotate="props.isActive ? 90 : 0"
          />
        </template>
        <a-collapse-panel
          header="分类筛选"
          key="1"
          :style="customStyle"
        >
          <div
            class="left-items"
            style="float: left;"
          >
            <a-input-group compact>
              <a-select
                defaultValue="Salary"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="salary">Salary</a-select-option>
                <a-select-option value="age">Age</a-select-option>
                <a-select-option value="seniority">Seniority</a-select-option>
              </a-select>
              <a-input-number
                v-model="minData"
                style="width: 120px;text-align: center"
                placeholder="Minimum"
              />
              <a-input
                style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                placeholder="~"
                disabled
              />
              <a-input-number
                v-model="maxData"
                style="width: 120px;text-align: center"
                placeholder="Maximum"
              />
            </a-input-group>
          </div>
          <div
            class="right-items"
            style="float: right;"
          >
            <a-button @click="handleSort(minData, maxData,classification)">查询</a-button>
            <a-button
              style="text-align: right;margin-bottom: 15px"
              @click="handleReset()"
            >重置</a-button>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="add">
      <a-button
        type="primary"
        style="margin-bottom: 10px;margin-left: 85%"
        @click="$refs.addEmployee.add()"
      >添加</a-button>
    </div>
    <div class="table">
      <a-table
        :columns="columns"
        :dataSource="tableList"
        :rowKey="record => record.id"
        bordered
        style="width: 80%; margin-left: 10%"
      >
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="c => searchInput = c"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm)"
            style="width: 188px; margin-bottom: 8px; display: block;"
          />
          <a-button
            type="primary"
            @click="() => handleSearch(selectedKeys, confirm)"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
          >Search</a-button>
          <a-button
            @click="() => searchReset(clearFilters)"
            size="small"
            style="width: 90px"
          >Reset</a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <span
          slot="tags"
          slot-scope="tags"
        >
          <a-tag
            v-for="tag in tags"
            :color="tag==='loser' ? 'volcano' : (tag.length > 5 ? 'geekblue' : 'green')"
            :key="tag"
          >{{tag.toUpperCase()}}</a-tag>
        </span>
        <span
          slot="action"
          slot-scope="text, record"
        >
          <a-divider type="vertical" />
          <a
            type="primary"
            @click="$refs.editEmployee.edit(record)"
          >编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="Sure to delete?"
            @confirm="() => onDelete(record)"
          >
            <a type="primary">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
      <a-form-item>
        <addEmployee
          ref="addEmployee"
        />
      </a-form-item>
      <a-form-item>
        <editEmployee
          ref="editEmployee"
          @handleEdit="handleEdit"
        />
      </a-form-item>
    </div>
  </div>
</template>

<script>
import addEmployee from '../components/table/addEmployee'
import editEmployee from '../components/table/editEmployee'
import { mapGetters, mapActions } from 'vuex'
export default {

  data () {
    return {
      classification: 'salary',
      customStyle: 'background: #1E90FF;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      searchText: '',
      searchInput: null,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          key: 'salary'
        },
        {
          title: 'Age',
          key: 'age',
          dataIndex: 'age',
          sorter: (a, b) => a.age - b.age
        },
        {
          title: 'Seniority',
          key: 'seniority',
          dataIndex: 'seniority'
        },
        {
          title: 'Action',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      minData: '',
      maxData: '',
    }
  },
  components: {
    addEmployee,
    editEmployee
  },
  mounted: function () {
    this.fetchData()
  },
  computed: {
    tableList () {
        return this.$store.state.tableList
    }
  },
  methods: {
    handleSearch (selectedKeys, confirm) {
      confirm();
      this.searchText = selectedKeys[0];
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      )
    },
    ...mapActions({
      fetchData: 'fetchTableData',
      DeleteData: 'fetchDeleteData',
      EditData: 'fetchEditData'
    }),
    handleReset () {
      this.fetchData()
      this.minData = null
      this.maxData = null
    },
    searchReset (clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    handleSort (mixData, maxData, key) {
      const sortData = []
      if (key == 'salary') {
        this.$store.state.tableList.forEach((a) => {
          if (a.salary >= mixData && a.salary <= maxData) {
            sortData.push(a)
          }
        })
        this.$store.state.tableList = sortData
      }
      if (key == 'age') {
        this.$store.state.tableList.forEach((a) => {
          if (a.age >= mixData && a.age <= maxData) {
            sortData.push(a)
          }
        })
        this.$store.state.tableList = sortData
      }
      if (key == 'seniority') {
        this.$store.state.tableList.forEach((a) => {
          if (a.seniority >= mixData && a.seniority <= maxData) {
            sortData.push(a)
          }
        })
        this.$store.state.tableList = sortData
      }
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    handleEdit (record) {
      const tableList = [...this.$store.state.tableList]
      tableList.forEach(function (value, index) {
        if (value.id === record.id) {
          tableList[index] = record
        }
      })
      this.EditData(tableList)
    },
    handleChange (value) {
      this.classification = `${value}`
    },
    onDelete (key) {
      this.DeleteData(key)
    }
  }
}
</script>

<style>
</style>
