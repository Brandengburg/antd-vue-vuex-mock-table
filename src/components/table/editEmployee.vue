<template>
  <a-modal
    :visible="visible"
    title='编辑资料'
    okText='提交'
    cancelText='取消'
    @cancel="handleEditCancel"
    @ok="dialogFormEdit"
  >
    <a-form
      layout='horizontal'
      :form='form'
    >
      <a-form-item label='姓名'>
        <a-input v-decorator="[ 'name', {initialValue: record.name,
            rules: [{ required: true, message: '请输入姓名', whitespace: true}]} ]" />
      </a-form-item>
      <a-form-item label='薪水'>
        <a-input-number v-decorator="[ 'salary', {initialValue: record.salary,
            rules: [{ type:'number', required: true, message: '请输入薪水', whitespace: true}]} ]" />
      </a-form-item>
      <a-form-item label='年龄'>
        <a-input-number v-decorator="['age', {initialValue: record.age,
            rules: [{ type:'number', required: true, message: '请输入年龄',  whitespace: true}]} ]" />
      </a-form-item>
      <a-form-item label='工龄'>
        <a-input-number v-decorator="['seniority',{initialValue: record.seniority,
            rules: [{  type:'number', required: true, message: '请输入工龄',  whitespace: true}]} ]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'editEmployee',
  data () {
    return {
      record: [],
      form: this.$form.createForm(this),
      visible: false
    }
  },
  methods: {
    dialogFormEdit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values = { ...values, id: this.record.id }
          setTimeout(() => {
            this.visible = false
            this.$emit('handleEdit', values)
          }, 100)
        }
      })
      this.form = this.$form.createForm(this)
    },
    edit (values) {
      this.visible = true
      this.record = values
    },
    handleEditCancel () {
      this.visible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
