import { requestWithOutToken } from "@/utils/request";
// 后端连接测试
export function getDefault(url) {
  return requestWithOutToken(url, "get");
}

// 登录
export function login({ username, password }) {
  return requestWithOutToken("user/login", "post", { username, password });
}

// 注册
export function regist({ username, password, mobile }) {
  return requestWithOutToken("user/regist", "post", {
    username,
    password,
    mobile,
  });
}
