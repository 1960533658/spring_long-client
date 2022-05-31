<template>
  <div class="page-chat-friend">
    <h1 class="">这里是您的联系人，与你共同度过这似水年华的人</h1>
    <SearchAdd v-model="searchValue" @keyup.enter="keyEnter" />
    <ChatHead />
    <ChatLayout :BGC="BGC">
      <div class="option">
        <div class="option-item">
          <span @click="showFriendApplyModel">好友申请</span>
          <MessageCount :count="friendApplyCount" />
        </div>
        <div class="option-item">
          <span>还不知道</span>
        </div>
      </div>
      <div class="friend-list">
        <h2>好友列表</h2>
        <ItemTag :data="$store.state.goodFriendsListData"></ItemTag>
      </div>
      <!-- 自定义右键选项菜单 -->
      <CustomMenu v-if="$store.state.rightMenuIsShow">
        <!-- 具名插槽 -->
        <template #chatFriend>
          <div class="chat-item" @click="openChat">打开聊天</div>
          <div class="chat-item" @click="delFriend">删除好友</div>
        </template>
      </CustomMenu>
    </ChatLayout>
    <!-- 传送——好友搜索组件弹窗 -->
    <teleport to="#popup" v-if="store.state.searchValuehModle">
      <!-- 好友搜索弹窗组件 -->
      <Popup>
        <div class="tag">
          <h3 v-if="$store.state.popUpWindowType === '好友申请列表'">
            我的好友申请
          </h3>
          <ItemTag
            :data="$store.state.tagData1"
            :mineApply="
              $store.state.popUpWindowType === '好友申请列表' ? 'mineApply' : ''
            "
          >
          </ItemTag>
          <h3 v-if="$store.state.popUpWindowType === '好友申请列表'">
            发给我的好友申请
          </h3>
          <ItemTag :data="$store.state.tagData2" />
        </div>
      </Popup>
    </teleport>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import {
  delGoodFriend,
  getFriendApplyAdd,
  getGoodFriendsList,
  searchFriend,
  updataGoodFriendsList,
} from "../../api/chat";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ChatLayout from "./components/ChatLayout.vue";
import ChatHead from "./components/ChatHead.vue";
export default {
  name: "ChatFriend",
  setup() {
    const BGC = "rgba(66, 185, 131, 0.5)";
    // 搜索字符
    const searchValue = ref("");
    // 通过store获取弹窗是否显示
    const store = useStore();
    const id = store.state.user.profile.id;
    const user = store.state;
    console.log(user);
    // 键盘Enter键触发
    const keyEnter = () => {
      // 查询空格无效
      if (!searchValue.value.trim()) {
        message.error("无效字符");
        return;
      }
      // 获取搜索到的用户
      searchFriend(searchValue.value, id)
        .then((data) => {
          if (data.status === 200) {
            message.success("搜索成功");
            // 传递弹窗类型
            store.commit("updataPopUpWindowType", "好友搜索");
            // 搜索成功显示弹窗
            store.commit("showModle", true);
            // 获取到的数据更新到Vuex中
            store.commit("updataTagData", data.searchUser);
          }
        })
        .catch(() => {
          message.error("数据获取失败");
        });
    };
    // 获取vuex中保存的好友 使用用计算属性计算申请的个数
    const friendApplyCount = computed(() => {
      let count = 0;
      count += store.state.user.profile.apply_list.myApply.length;
      count += store.state.user.profile.apply_list.apllyToMe.length;
      return count;
    });
    //#region  好友申请弹窗
    // 好友申请弹窗的显示类型
    const showFriendApplyModel = () => {
      store.commit("showModle", true);
      // 通过vuex中的好友申请获取信息列表
      const apply = {
        apply_list: store.state.user.profile.apply_list,
      };
      console.log(apply);
      // 获取数据
      getFriendApplyAdd(apply).then((response) => {
        console.log(response);
        // 操作申请成功 更新好友列表
        if (response.status === 200) {
          store.commit("updataPopUpWindowType", "好友申请列表");
          const data = response.data;
          data.type = "apply";
          store.dispatch("dispatchUpdataTagData", data);
        }
      });
    };
    //#endregion
    //#region  已经确定是好友的列表
    //  在 onBeforeMount 之前获取好友列表数据
    // 定义变量就收好友列表参数
    const goodFriendsListData = ref([]);
    onBeforeMount(() => {
      // 通过vuex进行数据的初始化获取
      getGoodFriendsList(id).then((response) => {
        // 当数据获取陈工 将好友数据更新到vuex中
        if (response.status === 200) {
          store.commit("getGoodFriend", response.data);
          // 当token验证过期或没有 就跳转到登录页面
        } else if (response.status === 100) {
          message.warn(response.msg);
          router.push("/login");
        }
      });
    });
    //#endregion
    onMounted(() => {
      document.addEventListener("click", () => {
        store.commit("showRightMenu", {
          id: null,
          isShow: false,
          rightMenuPosition: {
            x: 0,
            y: 0,
          },
        });
      });
    });
    //#region  跳转到聊天列表界面 向后端更改好友聊天列表数据
    const router = useRouter();
    const openChat = () => {
      // 获取右键项目的 好友id
      const otherId = store.state.rightMenuUserId;
      updataGoodFriendsList(otherId, id).then((response) => {
        console.log(response);
        if (response.status === 200) {
          router.push(`/chatlist?id=${otherId}`);
        }
      });
    };
    //#endregion
    //#region  删除好友
    const delFriend = () => {
      // 获取右键项目的 好友id
      const otherId = store.state.rightMenuUserId;
      // 删除好友向后端发送请求
      delGoodFriend(otherId, store.state.user.profile.id).then((response) => {
        // 当请求状态为200 删除本地的当前id
        if (response.status === 200) {
          store.commit("deleteGoodFriend", otherId);
        }
      });
    };
    //#endregion
    return {
      BGC,
      searchValue,
      keyEnter,
      store,
      friendApplyCount,
      showFriendApplyModel,
      goodFriendsListData,
      openChat,
      delFriend,
    };
  },
  components: { ChatLayout, ChatHead },
};
</script>

<style scoped lang="less">
.page-chat-friend {
  position: relative;
  width: calc(100% - 200px);
  height: calc(100% - 200px);
  margin: 100px;

  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
  }
  .option {
    display: flex;
    width: 100%;
    justify-content: space-evenly;

    .option-item {
      position: relative;
      span {
        display: inline-block;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        padding: 10px 20px;
        background-color: gold;
        border-radius: 5px;
        cursor: pointer;
      }
      span:hover {
        transform: scale(1.1);

        + .count {
          transform: scale(1.1);
        }
      }
    }
  }

  .friend-list {
    h2 {
      text-align: center;
      font-weight: 700;
      font-size: 30px;
      color: #eed80a;
    }
  }

  //  右键菜单插槽样式
  .chat-item {
    text-align: center;
    padding: 0 5px;
    color: #fff;
    cursor: pointer;
  }
  .chat-item:hover {
    background-color: rgb(100, 230, 88);
    transform: scale(1.1);
    transition: linear 0.3;
  }
}

h3 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
</style>
