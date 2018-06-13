<template>
  <div>
      <form-schema 
        ref='form' 
        :schema="schema" 
        v-model="model" 
        @submit.prevent="submit">
        <el-button @click="submit">submit</el-button>
      </form-schema>

      <el-button @click="submit">sync</el-button>
  </div>
</template>

<script>
  import FormSchema from 'vue-json-schema'
  import {
    Form,
    FormItem,
    Input,
    Radio,
    Checkbox,
    Switch,
    Select,
    Option
  } from 'element-ui'
  import newsletter from './newsletter.json'

  FormSchema.setComponent('form', Form, (vm) => {
    // const labelWidth = '120px'
    // const model = vm.data
    // const rules = {}

    // vm.fields.forEach((field) => {
    //   rules[field.name] = {
    //     required: field.required,
    //     message: field.title
    //   }
    // })

    // return { labelWidth, rules, model }
  })

  FormSchema.setComponent('label', FormItem)
  FormSchema.setComponent('email', Input)
  FormSchema.setComponent('text', Input)
  FormSchema.setComponent('textarea', Input)
  FormSchema.setComponent('checkbox', Checkbox)
  FormSchema.setComponent('checkbox', Switch)
  FormSchema.setComponent('radio', Radio)
  FormSchema.setComponent('select', Select)
  FormSchema.setComponent('option', Option)

  export default {
    components: {
      FormSchema
    },
    data () {
      return {
        model: {},
        schema: newsletter
      }
    },
    created () {
      console.log(this.schema)
    },
    methods: {
      submit () {
        console.log(JSON.parse(JSON.stringify(this.model)))
      }
    }
  }
</script>