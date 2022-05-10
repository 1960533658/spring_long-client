// 信息标签页
<template>
  <ul>
    <li
      v-for="item in data"
      :key="item.id"
      class="clearfix"
      @contextmenu.prevent="rightClick(item.id, $event)"
    >
      <slot></slot>
      <!-- 头像 -->
      <div class="fl">
        <div class="portrait">
          {{ item.username.slice(0, 1) }}
        </div>
      </div>
      <span class="fl">用户名：{{ item.username }}</span>
      <span class="fl">性别：{{ item.sex ? item.sex : "暂无" }}</span>
      <span
        class="fl"
        :class="
          $store.state.popUpWindowType === '好友搜索'
            ? 'item-sign'
            : 'item-sign-default'
        "
      >
        个性签名：
        <span class="sign">
          {{ item.sign ? item.sign : "暂无" }}
        </span>
      </span>
      <span class="fl" v-if="$store.state.popUpWindowType === '好友搜索'">
        <i class="add" @click="searchItem(item.id)">+</i>
      </span>
      <span
        class="fl myapply-agree"
        v-if="$store.state.popUpWindowType === '好友申请列表'"
      >
        <div class="await-box" v-if="mineApply === 'mineApply'">
          正在等待对方同意
        </div>
        <div class="agree-box" v-else>
          <div class="agree" @click="iAgree(item.id, 'agree')">同意</div>
          <div class="refuse" @click="iAgree(item.id, 'refuse')">拒绝</div>
        </div>
      </span>
    </li>
    <li
      class="clear empty"
      v-if="!data.length && $store.state.popUpWindowType === '好友申请列表'"
    >
      <div class="fl">无申请列表</div>
    </li>
  </ul>
</template>

<script>
import { message } from "ant-design-vue";
// import { watch } from "vue";
import { useStore } from "vuex";
import { applyAdditionFriend, isAgreeApply } from "../../api/chat";
export default {
  name: "ItemTag",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    mineApply: {
      type: String,
      default: "",
    },
  },
  setup() {
    // 获取电击添加的id
    const store = useStore();
    const myId = store.state.user.profile.id;
    const searchItem = (id) => {
      // 向后端申请添加好友
      applyAdditionFriend(id, myId).then((resposen) => {
        if (resposen.status === 206) {
          message.warn(resposen.msg);
        } else if (resposen.status === 200) {
          message.success(resposen.msg);
        }
      });
    };
    // watch(
    //   store.state,
    //   () => {
    //     console.log(store.state);
    //     console.log(store.state.tagData2);
    //   },
    //   { deep: true }
    // );
    // 是否同意对方的好友申请
    const iAgree = (id, type) => {
      // 获取操作返回结果
      isAgreeApply({ id, myId, type }).then((response) => {
        console.log(response);
        console.log(id);
        if (response.status === 200) {
          message.success(response.msg);
          store.commit("delTagData2One", id);
          // 更新 vuex中的user模块好友数据
          store.commit("user/setUserApplyList", {
            // 更新vuex好友申请列表的数据
            apply_list: response.data.mainApplyList,
            // 更新Vuex 好友泪飙数据
            id: id,
          });
          if (type === "agree") store.dispatch("disPatchGetGoodFriend", myId);
        }
      });
    };
    const rightClick = (id, event) => {
      console.log(id);
      const rightMenuPosition = {
        x: event.x - 100,
        y: event.y - 100,
      };
      store.commit("showRightMenu", {
        isShow: true,
        id,
        rightMenuPosition,
      });
    };
    return {
      searchItem,
      iAgree,
      rightClick,
    };
  },
};
</script>

<style scoped lang="less">
ul {
  margin-bottom: 10px;
  li {
    display: flex;
    justify-content: space-between;
    width: calc(100% - 20px);
    height: 80px;
    margin: 10px 0px 0 20px;
    line-height: 80px;
    background-color: gold;
    border-radius: 10px;
    padding-right: 20px;
    cursor: pointer;
    .portrait {
      margin: 0 auto;
      width: 50px;
      height: 50px;
      margin-top: 15px;
      text-align: center;
      line-height: 50px;
      background-color: skyblue;
      border-radius: 50px;
      font-size: 30px;
      font-weight: 700;
    }

    .fl {
      flex: 1;
      font-weight: 700;

      .sign {
        line-height: 20px;
        display: inline-block;
        height: fit-content;
        width: fit-content;
      }
    }

    .item-sign {
      flex: 1.5;
    }
    .item-sign-default {
      flex: 1 !important;
      font-weight: 700 !important;
      font-size: 14px !important;
      text-align: justify !important;
    }
    .fl:last-child {
      text-align: right;
      flex: 0.5;
      font-size: 20px;
      cursor: pointer;
      font-weight: 700;

      i {
        border: 1px solid greenyellow;
        padding: 0 5.5px;
      }
    }
    // 同意按钮
    .myapply-agree {
      text-align: justify;
      .await-box {
        font-size: 15px;
        color: #918686;
      }
      .agree-box {
        display: block;
        .agree {
          display: inline-block;
          width: 50%;
        }
        .refuse {
          width: 50%;
          display: inline-block;
        }
        .agree:hover {
          color: greenyellow;
        }
        .refuse:hover {
          display: inline-block;
          color: rgb(255, 47, 99);
        }
      }
    }
    .myapply-agree:last-child {
      text-align: center;
    }
  }
  li:hover {
    box-shadow: 0px 1px 9px 2px #ccc;
    transition: linear 0.05s;
    // 元素缩放
    transform: scaleX(1.009);
  }
  .empty {
    display: block;
    background-color: hotpink;
    height: 40px;
    line-height: 40px;
    .fl:first-child {
      cursor: default;
      width: 100%;
      text-align: center;
    }
  }
  .empty:hover {
    box-shadow: none;
    // 元素缩放
    transform: none;
    transition: none;
  }
}
</style>
