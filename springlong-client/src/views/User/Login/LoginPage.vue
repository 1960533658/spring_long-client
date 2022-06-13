<template>
  <userCom>
    <div class="toggle">
      <button
        @click="onToggleLogin('username')"
        :class="{ active: !isMsgLogin }"
      >
        <i></i>用账号登录
      </button>
      <button @click="onToggleLogin('mobile')" :class="{ active: isMsgLogin }">
        <i></i>用手机登录
      </button>
    </div>
    <!-- 账号登陆 -->
    <template>
      <div class="form">
        <div>
          <form>
            <div class="form-item" v-show="!isMsgLogin">
              <div class="input">
                <i class="iconfont icon-user"></i>
                <input
                  type="text"
                  placeholder="请输入用户名"
                  @blur="usernameVerify('username')"
                  v-model="username"
                  v-focus
                />
              </div>
              <div class="error">
                <i class="iconfont icon-warning" v-if="isusernameError">{{
                  usernameErrorMsg
                }}</i>
              </div>
            </div>
            <div class="form-item" v-show="!isMsgLogin">
              <div class="input">
                <i class="iconfont icon-lock"></i>
                <input
                  type="password"
                  placeholder="请输入密码"
                  v-model="password"
                  @blur="passwordVerify('password')"
                />
              </div>
              <div class="error">
                <i class="iconfont icon-warning" v-if="ispasswordError">{{
                  passwordErrorMsg
                }}</i>
              </div>
            </div>
            <div class="form-item" v-show="isMsgLogin">
              <div class="input">
                <i class="iconfont icon-user"></i>
                <input
                  type="text"
                  placeholder="请输入手机号"
                  v-model="mobile"
                />
              </div>
              <div class="error">
                <i class="iconfont icon-warning" v-if="isMobileError"></i>
              </div>
            </div>
            <div class="form-item" v-show="isMsgLogin">
              <div class="input">
                <i class="iconfont icon-code"></i>
                <input
                  type="password"
                  placeholder="请输入验证码"
                  v-model="code"
                />
                <span class="code">发送验证码</span>
              </div>
              <div class="error">
                <i class="iconfont icon-warning" v-if="isCodeError"></i>
              </div>
            </div>
            <div class="form-item">
              <div class="agree">
                <SprCheckbox v-model="userCheckAgree" />
                <span>我已同意</span>
                <a href="javascript:">《隐私条款》</a>
                <span>和</span>
                <a href="javascript:">《服务条款》</a>
                <span class="no" @click="toRegist">无账号？点我注册</span>
              </div>
              <div class="error">
                <i class="iconfont icon-warning" v-if="isUserArgeeError">{{
                  isUserArgeeErrorMsg
                }}</i>
              </div>
            </div>
            <div class="button">
              <!--  type="submit" -->
              <button class="btn" @click="onLogin">登录</button>
            </div>
          </form>
        </div>
      </div>
    </template>
    <!-- 手机号登录 -->
    <!-- <template v-else>
      <form>
        <div class="form-item">
          <div class="agree">
            <SprCheckbox />
            <span>我已同意</span>
            <a href="javascript:">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:">《服务条款》</a>
          </div>
          <div class="error">
            <i class="iconfont icon-warning" v-if="isMobileArgeeError"></i>
          </div>
        </div>
        <button type="submit" class="btn">登录</button>
      </form>
    </template> -->
  </userCom>
</template>
<script>
import userCom from "../components/userCom.vue";
import { ref, reactive } from "vue";
import { getDefault, login } from "@/api/user";
import { verify } from "@/utils/verify";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import router from "../../../router";
// import axios from "axios";
export default {
  name: "LoginPage",
  components: {
    userCom,
  },
  setup() {
    // 判断使用什么方式登录
    const isMsgLogin = ref(false);

    // 登录条款是否勾选
    const userCheckAgree = ref(true);
    const username = ref("");
    const password = ref("");
    const mobile = ref("");
    const code = ref("");
    // 切换登录方式
    const onToggleLogin = (type) => {
      type === "mobile"
        ? (isMsgLogin.value = true)
        : (isMsgLogin.value = false);
    };
    //#region  正则校验——
    // 账号密码正则校验判断返回值
    const usernameErrorMsg = ref("");
    const passwordErrorMsg = ref("");
    // 正则判断是否通过
    const isusernameError = ref(false);
    const ispasswordError = ref(false);
    const isUserArgeeError = ref(false);
    const isMobileError = ref(false);
    const isCodeError = ref(false);
    const isMobileArgeeError = ref(false);
    // 用户名校验
    const usernameVerify = () => {
      const usernameVerifyResult = verify.username(username.value);
      if (!(usernameVerifyResult.toString() === "true")) {
        isusernameError.value = true;
        usernameErrorMsg.value = usernameVerifyResult;
      } else {
        isusernameError.value = false;
      }
    };
    // 密码校验
    const passwordVerify = () => {
      const passwordVerifyResult = verify.password({ pwd: password.value });
      if (!(passwordVerifyResult.toString() === "true")) {
        ispasswordError.value = true;
        passwordErrorMsg.value = passwordVerifyResult;
      } else {
        ispasswordError.value = false;
      }
    };
    //#endregion
    //#region  后端连接测试
    const testDate = reactive([]);
    getDefault("/gridlist").then((data) => {
      if (data.status === 200) {
        testDate.push(data.userInfo);
      }
    });
    // axios.get("http://127.0.0.1:3000/gridlist").then((res) => {
    //   console.log(res);
    // });
    //#endregion
    const store = useStore();
    //#region  登录——账号登录
    const isUserArgeeErrorMsg = ref("");
    const onLogin = () => {
      isUserArgeeError.value = false;
      isUserArgeeErrorMsg.value = "";
      // 如果勾选了协议就进行登录
      if (userCheckAgree.value) {
        const user = {
          username: username.value,
          password: password.value,
        };
        // 如果勾选了协议 登录和注册正则校验通过 就发送请求数据
        if (
          userCheckAgree.value &&
          !isusernameError.value &&
          !ispasswordError.value
        ) {
          login(user).then((data) => {
            // 如果status=200 登录成功持久化存储vuex 并弹出消息框
            if (data.status === 200) {
              store.commit("user/setUser", data.userInfo);
              message.success(`${data.msg}`);
              // 登录成功清空输入框
              password.value = "";
              // 跳转到登录页面
              router.push("/");
            } else {
              message.error(`${data.msg},请检查账号和用户名`);
            }
          });
        } else {
          message.error("格式错误，无法登录");
        }
      } else {
        isUserArgeeError.value = true;
        isUserArgeeErrorMsg.value = "请阅读并勾选协议";
      }
    };
    //#endregion

    //#region  前往注册页面
    const toRegist = () => {
      router.push("/regist");
    };
    //#endregion

    return {
      // 是否手机登录
      isMsgLogin,
      // 点击切换登录方式函数
      onToggleLogin,
      // 选中用户协议复选框
      userCheckAgree,
      // 双向数据绑定账户和密码
      username,
      password,
      mobile,
      code,
      //#region
      // 正则校验——用户名称失焦校验函数
      usernameVerify,
      // 正则校验——密码失焦校验函数
      passwordVerify,
      // 正则校验——用户名正则校验返回结果（文字）
      usernameErrorMsg,
      // 正则校验——密码正则校验返回结果（文字）
      passwordErrorMsg,
      // 正则校验——是否勾选协议（文字）
      isUserArgeeErrorMsg,
      // 正则校验——用户名正则校验返回结果（布尔值）
      isusernameError,
      // 正则校验——密码正则校验返回结果（布尔值）
      ispasswordError,
      // 是否同意用户协议条款
      isUserArgeeError,
      // 手机号正则校验（布尔值）
      isMobileError,
      // 验证码正则校验返回结果（布尔值）
      isCodeError,
      // 手机号登录用户隐私协议
      isMobileArgeeError,
      //#endregion
      // 后端测试连接
      testDate,
      // login
      onLogin,
      toRegist,
    };
  },
};
</script>
<style scoped lang="less">
.page-login {
  .toggle {
    padding: 15px 40px;
    button {
      background-color: transparent;
      padding-bottom: 5px;
      border: 0;
      border-bottom: 3px solid transparent;
      cursor: pointer;
    }
    .active {
      color: #358660;
      border-bottom: 3px solid @sucColor;
    }
  }
  form {
    padding: 0 40px;
    .input {
      position: relative;
      height: 36px;
      i {
        width: 34px;
        height: 34px;
        color: green;
        position: absolute;
        left: 1px;
        top: 1px;
        text-align: center;
        line-height: 34px;
        font-size: 18px;
      }
      height: 36px;
      input {
        padding-left: 35px;
        border: 1px solid #cfcdcd;
        height: 36px;
        line-height: 36px;
        width: 100%;
        border-radius: 5px;

        &.active,
        &:focus {
          border-color: @xtxColor;
          box-shadow: 0 1px 4px @xtxColor;
        }
      }

      .code {
        position: absolute;
        right: 0px;
        top: 0px;
        border-left: 1px solid #ccc;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        width: 90px;
        height: 36px;
        background: @warnColor;
        cursor: pointer;
      }
    }
    .agree {
      position: relative;
      .no {
        position: absolute;
        top: 0;
        right: 0;
        color: gold;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .btn {
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
}

.error {
  height: 22px;
  width: 100%;
  border-color: @priceColor;
  color: @priceColor;
}
</style>
