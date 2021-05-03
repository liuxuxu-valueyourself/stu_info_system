import axios from "axios";

// 请求所有数据
export async function getData() {
  let res = await axios({
    method: "post",
    url: "/test/index.php",
    data: {
      type: "all"
    }
  });
  // window.localStorage.setItem('stuInfo',res.data);
  return res;
}

// 请求学号数据
export async function getDataNum(id) {
  let res = await axios({
    method: "post",
    url: "/test/index.php",
    data: {
      type: "num",
      id
    }
  });
  return res;
}

// 根据名字查询数据
export async function getDataName(name) {
  let res = await axios({
    method: "post",
    url: "/test/index.php",
    data: {
      type: "name",
      name
    }
  });
  return res;
}

// 根据性别查询数据
export async function getDataSex(sex) {
  let res = await axios({
    method: "post",
    url: "/test/index.php",
    data: {
      type: "sex",
      sex
    }
  });
  return res;
}

// 提交修改数据
export async function editData(option) {
  let res = await axios({
    method: "post",
    url: "/test/edit.php",
    data: {
      ...option
    }
  });
  return res;
}

// 登录
export async function login(option) {
  let res = await axios({
    method: "post",
    url: "/test/sign.php",
    data: {
      ...option,
      type: 1
    }
  });
  return res;
}

// 注册
export async function register(option) {
  let res = await axios({
    method: "post",
    url: "/test/sign.php",
    data: {
      ...option,
      type: 2
    }
  });
  return res;
}
