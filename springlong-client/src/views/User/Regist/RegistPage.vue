<template>
  <userCom>
    <div class="regist">
      <h1>注册账号</h1>
      <form class="form">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              type="text"
              placeholder="请输入用户名"
              @blur="usernameVerify"
              v-model="username"
            />
          </div>
          <div class="error">
            <i class="iconfont icon-warning" v-if="isusernameError">{{
              usernameErrorMsg
            }}</i>
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              @blur="passwordVerify"
            />
          </div>
          <div class="error">
            <i class="iconfont icon-warning" v-if="ispasswordError">{{
              passwordErrorMsg
            }}</i>
          </div>
        </div>
        <!-- 重复密码 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input
              type="password"
              placeholder="请确认输入密码"
              v-model="repeatPassword"
              @blur="RepeatpasswordVerify"
            />
          </div>
          <div class="error">
            <i class="iconfont icon-warning" v-if="isRepeatpasswordError">{{
              RepeatpasswordErrorMsg
            }}</i>
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              type="text"
              placeholder="请输入手机号"
              v-model="mobile"
              @blur="mobileVerify"
            />
          </div>
          <div class="error">
            <i class="iconfont icon-warning" v-if="isMobileError">{{
              mobileErrorMsg
            }}</i>
          </div>
        </div>
        <div class="form-item">
          <div class="agree">
            <SprCheckbox v-model="registCheckAgree" />
            <span>我已同意</span>
            <a href="javascript:">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:">《服务条款》</a>
            <span class="no" @click="toLoginPage">已有账号，去登陆</span>
          </div>
          <div class="error">
            <i class="iconfont icon-warning" v-if="isRegistArgeeError">{{
              registCheckErrorMsg
            }}</i>
          </div>
        </div>
        <div class="button">
          <!--  type="submit" -->
          <button class="btn" @click="onRegist">注册账号</button>
        </div>
      </form>
    </div>
  </userCom>
</template>
<script>
import userCom from "../components/userCom.vue";
import { regist } from "@/api/user.js";
import { verify } from "@/utils/verify";
import { ref } from "vue";
import { message } from "ant-design-vue";
import router from "../../../router";
export default {
  name: "RegistPage",
  components: {
    userCom,
  },
  setup() {
    //#region  正则校验——
    // 双向数据绑定 账号名、密码、手机号
    const username = ref("");
    const password = ref("");
    const repeatPassword = ref("");
    const mobile = ref("");
    // 账号密码正则校验判断返回值
    const usernameErrorMsg = ref("");
    const passwordErrorMsg = ref("");
    const RepeatpasswordErrorMsg = ref("");
    const mobileErrorMsg = ref("");
    // 正则判断是否通过
    const registCheckAgree = ref(true);
    const isusernameError = ref(false);
    const ispasswordError = ref(false);
    const isRepeatpasswordError = ref(false);
    const isRegistArgeeError = ref(false);
    const isMobileError = ref(false);
    // 用户名校验
    const usernameVerify = () => {
      const usernameVerifyResult = verify.username(username.value);
      if (!(usernameVerifyResult.toString() === "true")) {
        isusernameError.value = true;
        usernameErrorMsg.value = usernameVerifyResult;
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
    // 重复密码校验
    const RepeatpasswordVerify = () => {
      const repeatPasswordVerifyResult = verify.password({
        pwd: password.value,
        repeatPwd: repeatPassword.value,
        regist: true,
      });
      if (!(repeatPasswordVerifyResult.toString() === "true")) {
        isRepeatpasswordError.value = true;
        RepeatpasswordErrorMsg.value = repeatPasswordVerifyResult;
      } else {
        isRepeatpasswordError.value = false;
      }
    };
    // 手机号校验
    const mobileVerify = () => {
      const mobileVerifyResult = verify.mobile(mobile.value);
      if (!(mobileVerifyResult.toString() === "true")) {
        isMobileError.value = true;
        mobileErrorMsg.value = mobileVerifyResult;
      } else {
        isMobileError.value = false;
      }
    };
    // 注册账号事件
    const registCheckErrorMsg = ref("请阅读并勾选协议");
    const onRegist = () => {
      // 判断用户是否勾选协议，未勾选不能注册
      if (registCheckAgree.value) {
        isRegistArgeeError.value = false;
        // 判断所有的正则校验是否通过
        console.log(isusernameError.value, ispasswordError.value);
        console.log(isRepeatpasswordError.value, isMobileError.value);
        if (
          !isusernameError.value &&
          !ispasswordError.value &&
          !isRepeatpasswordError.value &&
          !isMobileError.value
        ) {
          // 所有的正则校验已经通过 发送注册请求
          const registInfo = {
            username: username.value,
            password: password.value,
            mobile: mobile.value,
          };
          regist({ ...registInfo }).then((data) => {
            console.log(data);
            // status：110用户名已存在 200成功注册用户
            if (data.status === 110) {
              message.warn(`${data.msg}`);
            } else if (data.status === 200) {
              message.success(`${data.msg}`);
              // 注册成功返回跳转登录页面
              router.push("/login");
            }
          });
        } else {
          message.error("请填写完整且正确的注册信息");
        }
      } else {
        isRegistArgeeError.value = true;
      }
    };
    // 跳转到登录页面
    const toLoginPage = () => {
      router.push("/login");
    };
    //#endregion
    return {
      // 双向数据绑定 账户 密码 手机号 注册勾选协议状态
      username,
      password,
      repeatPassword,
      mobile,
      registCheckAgree,
      // 注册页用户正则验证结果  账户 密码 手机号 注册勾选协议状态
      isusernameError,
      ispasswordError,
      isRepeatpasswordError,
      isMobileError,
      isRegistArgeeError,
      // 注册页 正则验证返回结果（文字描述）
      usernameErrorMsg,
      passwordErrorMsg,
      RepeatpasswordErrorMsg,
      mobileErrorMsg,
      registCheckErrorMsg,
      // 正则验证函数 账户 密码 手机号
      usernameVerify,
      passwordVerify,
      RepeatpasswordVerify,
      mobileVerify,
      onRegist,
      // 前往登录页面函数
      toLoginPage,
    };
  },
};
</script>
<style scoped lang="less">
.regist {
  padding: 15px 40px;
  h1 {
    font-size: 26px;
    text-align: center;
    color: gold;
    margin-bottom: 15px;
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
      a:hover {
        color: #02ff89;
      }
      .no {
        position: absolute;
        top: 2px;
        right: -35px;
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
  .error {
    height: 22px;
    width: 100%;
    border-color: @priceColor;
    color: @priceColor;
  }
}
</style>
