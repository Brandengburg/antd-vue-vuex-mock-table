<template>
  <a-modal
    :visible="visible"
    title='添加用户'
    okText='创建'
    cancelText='取消'
    @cancel="cancel()"
    @ok="dialogFormAdd()"
  >
    <a-form
      layout='horizontal'
      :form='form'
    >
      <a-form-item
        label='姓名'
        style="width: 200px"
      >
        <a-input v-decorator="['name',
                {
                rules: [{ required: true, message: '请输入姓名' }],
                }
            ]" />
      </a-form-item>
      <a-form-item label='薪水'>
        <a-input-number v-decorator="['salary',
                {
                rules: [{ required: true, message: '请输入薪水' }],
                }
            ]" />
      </a-form-item>
      <a-form-item label='年龄'>
        <a-input-number v-decorator="['age',
                {
                rules: [{ required: true, message: '请输入年龄' }],
                }
            ]" />
      </a-form-item>
      <a-form-item label='工龄'>
        <a-input-number v-decorator="['seniority',
                {
                rules: [{ required: true, message: '请输入状态' }],
                }
            ]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'addEmployee',
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    ...mapActions({
      AddData: 'fetchAddData'
    }),
    add () {
      this.visible = true
    },
    dialogFormAdd () {
      var data =this.form.getFieldsValue()
      data.id = this.$store.state.tableList.length
      this.AddData(data)
      this.visible = false
      this.form = this.$form.createForm(this)
    },
    cancel () {
      this.visible = false
    }
  }
}
</script>

<style scoped>
</style>
