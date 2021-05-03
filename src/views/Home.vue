<template>
  <div class="home">
    <div class="select">
      <a-dropdown class="drop-down">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          {{ type === "" ? "请先选择查询类型" : type }} <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="handleType(0)">按学号查询</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="handleType(1)">按姓名查询</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="handleType(2)">按姓别查询</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="handleType(3)">按班级查询</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-input-search
        class="input-search"
        :placeholder="placeholder"
        style="width: 200px"
        @search="onSearch"
        @change="onChange"
        v-model="seachValue"
      />
    </div>
    <div v-if="dataItem.length === 0" class="no-data">当前没有数据哦</div>
    <table v-else class="table-content">
      <tr>
        <th :style="{ background: themeColor.background }">学号</th>
        <th :style="{ background: themeColor.background }">姓名</th>
        <th :style="{ background: themeColor.background }">性别</th>
        <th :style="{ background: themeColor.background }">班级</th>
        <th :style="{ background: themeColor.background }">邮箱</th>
        <th :style="{ background: themeColor.background }">年龄</th>
        <th :style="{ background: themeColor.background }">手机号</th>
        <th :style="{ background: themeColor.background }">住址</th>
        <th :style="{ background: themeColor.background }">添加时间</th>
        <th :style="{ background: themeColor.background }">
          操作 <br />
          <span>(仅管理可删除)</span>
        </th>
      </tr>
      <tr v-for="item in showItem" :key="item.id">
        <td :style="{ background: themeColor.background }">{{ item.id }}</td>
        <td :style="{ background: themeColor.background }">{{ item.name }}</td>
        <td :style="{ background: themeColor.background }">
          {{ item.sex == 0 ? "男" : "女" }}
        </td>
        <td :style="{ background: themeColor.background }">{{ item.class }}</td>
        <td :style="{ background: themeColor.background }">{{ item.email }}</td>
        <td :style="{ background: themeColor.background }">{{ item.age }}</td>
        <td :style="{ background: themeColor.background }">{{ item.phone }}</td>
        <td :style="{ background: themeColor.background }">
          {{ item.address }}
        </td>
        <td :style="{ background: themeColor.background }">{{ item.time }}</td>
        <td :style="{ background: themeColor.background }">
          <a-button type="primary" @click="edit(item)"> <a-icon type="form" /> </a-button>
          <a-button
            type="danger"
            @click="showDeleteConfirm(item.id, item.name)"
            :disabled="!root"
          >
            <a-icon type="delete" />
          </a-button>
        </td>
      </tr>
    </table>

    <a-modal
      v-model="visible"
      :dialog-style="{ top: '20px', color: themeColor.color }"
      title="编辑"
      ok-text=""
      cancel-text=""
      @ok="hideModal"
      :footer="null"
    >
      <a-input-group>
        <FormVal @submit="handleSubmit" :isEdit="true" :ruleForm="ruleForm" />
      </a-input-group>
    </a-modal>
    <Page
      :now="now"
      :allData="allData"
      :capacity="capacity"
      @nowChange="Change"
      class="home-page"
    />
  </div>
</template>

<script>
import Page from "../components/Pages.vue";
import {
  getData,
  editData,
  getDataNum,
  getDataName,
  getDataSex,
  getClassByInfo
} from "../api/index.js";
import FormVal from "../components/FormValidation.vue";
import { mapState } from "vuex";

export default {
  components: {
    Page,
    FormVal
  },
  data() {
    return {
      // root: true,
      ruleForm: {
        name: "",
        sex: 1,
        age: "",
        id: "",
        email: "",
        phone: "",
        address: ""
      },
      type: "",
      now: 1, // 当前页数
      allData: 10, // 总数据量
      capacity: 10, // 一页显示的数据量
      dataItem: [], // 所有的学生信息
      showItem: [], // 当前页展示的学生信息
      placeholder: "默认按学号类型查询",
      index: 0, // 当前选择的查询类型 0-学号 1-姓名 2-性别
      visible: false, // 是否弹出编辑框
      seachValue: ""
    };
  },
  mounted() {
    this.getAllData();
  },
  computed: {
    ...mapState(["root", "themeColor"])
  },
  methods: {
    async getAllData() {
      let res = await getData();
      res.data.sort((a,b)=> {
        let aTime = new Date(a.time).getTime();
        let bTime = new Date(b.time).getTime();
        return bTime - aTime;
      })
      this.allData = res.data.length;
      this.dataItem = res.data;
      this.getNowData(this.now);
    },
    handleType(index) {
      if (index === 0) {
        this.type = "当前按学号查询";
        this.placeholder = "请输入 学号 进行查询";
        this.index = 0;
      }
      if (index === 1) {
        this.type = "当前按姓名查询";
        this.placeholder = "请输入 姓名 进行查询";
        this.index = 1;
      }
      if (index === 2) {
        this.type = "当前按性别查询";
        this.placeholder = "请输入 男/女 进行查询";
        this.index = 2;
      }
      if (index === 3) {
        this.type = "当前按班级查询";
        this.placeholder = "请输入 班级 进行查询";
        this.index = 3;
      }
    },
    onChange() {
      if (this.seachValue === "") {
        this.getAllData();
      }
    },
    async onSearch(value) {
      // console.log(this.index, value);
      if (this.index === 0) {
        // 按学号查询
        let res = value.replace(/\D+/g, "");
        if (res !== "") {
          let d = await getDataNum(res);
          if (d.data.length === 0) {
            this.$message.error(`没有查询到学号为: ${res} 的学生信息!`);
          }
          this.setShowInfo(d);
        } else {
          this.$message.warning(`按学号查询必须且只能输入数字查询哦!`);
        }
      } else if (this.index === 1) {
        // 按姓名查询
        let d = await getDataName(value);
        if (d.data.length === 0) {
          this.$message.error(`没有查询到 ${value} 的学生信息!`);
        }
        this.setShowInfo(d);
      } else if (this.index === 2) {
        // 按性别查询
        if (value === "男") {
          let d = await getDataSex("0");
          this.setShowInfo(d);
        } else if (value === "女") {
          let d = await getDataSex("1");
          this.setShowInfo(d);
        } else {
          this.$message.warning(`按性别查询只能输入 男 / 女 !`);
        }
      }else if(this.index === 3) {
        // 按班级进行查询
        let d = await getClassByInfo(value);
        if (d.data.length === 0) {
          this.$message.error(`没有查询到班级为： ${value} 的学生信息!`);
        }
        this.setShowInfo(d);
      }
    },
    setShowInfo(d) {
      this.allData = d.data.length;
      this.dataItem = d.data;
      this.getNowData(this.now);
    },
    Change(n) {
      this.now = n;
      this.getNowData(n);
    },
    getNowData(n) {
      // this.showItem
      // 1 0-9
      // 2 10-19      (n-1)*10  (n-1)*10+10
      // 3 20-29
      this.showItem = this.dataItem.slice((n - 1) * 10, (n - 1) * 10 + 10);
    },
    // 弹出确定删除数据询问框
    showDeleteConfirm(id, name) {
      let _this = this;
      this.$confirm({
        title: `确定要删除${name}的学生信息吗?`,
        content: "删除操作不可撤销哦",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          _this.remove(id, name);
        }
      });
    },
    // 删除学生
    remove(id, name) {
      this.axios({
        method: "post",
        url: "/test/removeList.php",
        data: {
          id
        }
      }).then(async res => {
        if (res.data == 1) {
          await this.getAllData();
          await this.Change(this.now);
          this.$message.success(`删除${name}成功!`);
        }
      });
    },
    edit(item) {
      this.ruleForm = item;
      this.showModal();
    },
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
    async handleSubmit(option) {
      // console.log(option);        // 根据修改过后的数据 发起请求 修改
      let res = await editData(option);
      this.hideModal();
      if (res.data == "1") {
        this.$message.success(`修改成功!`);
      } else {
        this.$message.error("修改信息失败");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: calc(100vh - 45px);
  width: calc(100% - 200px);
  .drop-down {
    margin-left: 20px;
    margin-top: 10px;
  }
  .input-search {
    margin-left: 20px;
    margin-top: 10px;
  }
  .table-content {
    width: calc(100vw - 200px);
    margin-top: 20px;
    tr {
      height: 2.7rem;
    }
    th,
    td {
      text-align: center;
      border: 1px solid #ccc;
    }
    th {
      font-weight: 700;
      background: rgb(202, 208, 214);
      span {
        font-size: 12px;
        color: #008c8c;
      }
    }
    td {
      background: rgba(236, 238, 240, 0.218);
    }
  }
}
.no-data {
  margin-top: 66px;
  text-align: center;
  font-size: 20px;
  text-shadow: 1px 1px 2px #ccc;
}
@media screen and (max-width: 480px) {
  div.home {
    width: 100vw;
    // overflow-x: auto;
    .table-content {
      width: 250vw;
      overflow-x: auto;
      margin-top: 10px;
    }
    div.home-page {
      height: 15vh;
    }
    .ant-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>
