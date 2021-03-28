<template>
  <!-- 提交表单组件 -->
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback label="姓名" prop="name">
      <a-input v-model="ruleForm.name" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="性别">
      <a-radio-group name="radioGroup" :default-value="ruleForm.sex">
        <a-radio :value="0" @click="handleRadio(0)"> 男 </a-radio>
        <a-radio :value="1" @click="handleRadio(1)"> 女 </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item has-feedback label="学号" prop="id">
      <a-input
        v-model="ruleForm.id"
        type="text"
        :disabled="isEdit"
        autocomplete="off"
      />
    </a-form-model-item>
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="ruleForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="年龄" prop="age">
      <a-input v-model.number="ruleForm.age" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="手机号" prop="phone">
      <a-input v-model.number="ruleForm.phone" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="地址" prop="address">
      <a-input v-model.number="ruleForm.address" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button class="btn" type="primary" @click="submitForm('ruleForm')">
        {{ isEdit == true ? "编辑完成" : "添加" }}
        <!-- 添加 -->
      </a-button>
      <a-button
        class="btn"
        style="margin-left: 10px"
        @click="resetForm('ruleForm')"
        v-if="!isEdit"
      >
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
const key = "updatable";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: true,
    },
    ruleForm: {
      type: Object,
      default() {
        return {
          name: "",
          sex: 1,
          age: "",
          id: "",
          email: "",
          phone: "",
          address: "",
        };
      },
    },
    //     ruleForm: {
    //   name: "",
    //   sex: 1,
    //   age: "",
    //   id: "",
    //   email: "",
    //   phone: "",
    //   address: "",
    // },
  },
  data() {
    let checkPending;
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入年龄"));
      }
      if (value < 18) {
        callback(new Error("年龄必须大于18"));
      } else if (value > 100) {
        callback(new Error("年龄不能大于100"));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    let checkID = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入唯一学号"));
      } else if (value.length > 10) {
        callback(new Error("学号不能大于10位数哦"));
      } else {
        callback();
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
      ) {
        callback(new Error("邮箱格式不正确!"));
      } else {
        callback();
      }
    };
    let checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入11位手机号"));
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        callback(new Error("手机号无效!"));
      } else {
        callback();
      }
    };
    let checkAddress = (rule, value, callback) => {
      clearTimeout(checkPending);
      checkPending = setTimeout(() => {
        if (value === "") {
          callback(new Error("请输入地址哦"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      rules: {
        name: [{ validator: validateName, trigger: "change" }],
        id: [{ validator: checkID, trigger: "change" }],
        age: [{ validator: checkAge, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
        phone: [{ validator: checkPhone, trigger: "change" }],
        address: [{ validator: checkAddress, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.openMessage();
          // this.axios
          //   .post("/test/addList.php", {
          //     ...this.ruleForm,
          //   })
          //   .then((res) => {
          //     if (res.data == 1 && res.status == 200) {
          //       this.$message.success("新增学生成功");
          //     } else {
          //       this.$message.warning("新增学生失败 提示:学号要唯一");
          //     }
          //     if (res.status != 200) {
          //       this.$message.error("新增学生失败");
          //     }
          //   });
          this.$emit("submit", this.ruleForm);
        } else {
          this.$message.error("提交信息失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRadio(value) {
      this.ruleForm.sex = value;
    },
  },
};
</script>

<style lang="scss">
.btn {
  -webkit-box-reflect: below 15px -webkit-linear-gradient(top, rgba(0, 0, 0, 0)
        30%, rgba(0, 0, 0, 0.5) 125%);
}
@media screen and (max-width: 480px) {
  .ant-modal-wrap  {
    width: 100vw;
    overflow-x: hidden;
  }
}
</style>