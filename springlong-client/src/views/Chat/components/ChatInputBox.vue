<template>
  <div class="chat-input-box">
    <div class="chat-msg">
      <ul>
        <li
          v-for="(item, index) in chatRecordsData.chat_records"
          :key="index"
          class="clearfix"
        >
          <div
            class="msg-history clearfix"
            :class="item.from === main.id ? 'fr' : 'fl'"
          >
            <div
              class="msg-from-user"
              :class="item.from === main.id ? 'fr' : 'fl'"
            >
              <!-- {{ selectedPortrait }} -->
              {{
                item.from === main.id ? main.username[0] : selectedUsername[0]
              }}
            </div>
            <div class="msg-info" :class="item.from === main.id ? 'fr' : 'fl'">
              <span
                class="msg-send-time"
                :class="item.from === main.id ? 'tar' : ''"
              >
                {{ item.sendTime }}
              </span>
              <!-- flex-item-end -->
              <div
                class="send-msg-box"
                :class="item.from === main.id ? '' : 'flex-item-start'"
              >
                <p
                  class="send-msg"
                  v-height5
                  :ref="(el) => (msgHistory[index] = el)"
                >
                  {{ item.msg }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <textarea
      cols="30"
      rows="5"
      autofocus
      @keydown.enter="sendMessage"
      v-model="inputStr"
      @input="handleInput"
    ></textarea>
    <div class="option">
      <div class="close">关闭(C)</div>
      <div class="send" @click="sendMessage">发送(S)</div>
    </div>
  </div>
</template>

<script>
// getCurrentInstance
import { computed, nextTick, onMounted, ref, watch } from "vue-demi";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { useSocket } from "../../../hooks/useSocket";
export default {
  name: "ChatInputBox",
  props: {
    dataLength: {
      type: Number,
      default: 0,
    },
    chatRecordsData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    // 获取全局挂载的proxy
    // const { proxy } = getCurrentInstance();
    // const socket = proxy.$socket;

    // 获取store
    const store = useStore();
    // 获取vuex中自己的Id
    const myId = store.state.user.profile.id;
    const myUsername = store.state.user.profile.username;
    const myPortrait = store.state.user.profile.portrait;
    const main = {
      id: myId,
      username: myUsername,
      portrait: myPortrait,
    };
    const token = store.state.user.profile.token;
    const socket = useSocket(token);
    // 监听连接事件
    socket.on("connect", () => {
      console.log("connect" + new Date().getTime());
    });
    // 定义变量 双向数据绑定输入的聊天内容
    const inputStr = ref("");
    //#region  当用户输入时限制输入内容的最大长度
    const handleInput = () => {
      // 输入的字符长度不能大于150
      if (inputStr.value.length > 150) {
        inputStr.value = inputStr.value.slice(0, 150);
        message.error("字符长度不能大于150");
      }
    };
    //#endregion

    //#region  聊天历史记录显示控制
    const msgHistory = ref([]);
    //#endregion
    //#region  发送消息
    //  使用 计算属性 监听vuex的 窗口选择的用户id
    const to = computed(() => store.state.chatList.chatWindow.selectedId);
    // 使用计算属性监听 vuex/chatList 模块中的 窗口选择的用户聊天房间名 chatRoom
    const chatRoom = computed(() => store.state.chatList.chatWindow.chatRoom);
    // 使用计算属性监听 vuex/chatList 模块中的 窗口选择的用户名称
    const selectedUsername = computed(
      () => store.state.chatList.chatWindow.title
    );
    const selectedPortrait = computed(
      () => store.state.chatList.chatWindow.portrait
    );
    const sendMessage = () => {
      // 如果输入内容不为空 不发送内容
      if (inputStr.value.trim() !== "") {
        // 去除前后空格
        inputStr.value = inputStr.value.trim();
        // 触发 websocket 中的 消息发送事件 发送给后端
        socket.emit("sendMsg", {
          from: myId,
          msg: inputStr.value,
          to: to.value,
          chatRoom: chatRoom.value,
        });
        // 发送完成清空输入框
        inputStr.value = "";
      } else {
        message.error("请勿发送空内容");
      }
    };
    //#endregion

    //#region  监听 他人发送消息给自己 的事件
    socket.on(`msg${myId}`, (data) => {
      // 回调函数发送的数据返回给自己
      // 当他人发送消息被接收到 向本地保存数据
      console.log(data);
      const chatRecordsData = props.chatRecordsData;
      // 当 聊天数据为空数据 设置初始化聊天记录为空数据
      if (chatRecordsData.chat_records === undefined)
        chatRecordsData.chat_records = [];
      // 给聊天记录添加 新的聊天记录
      chatRecordsData.chat_records.push(data.sendData);
      emit("update:chatRecordsData", chatRecordsData);
    });
    //#endregion

    //#region  自己发送消息时 后端返回给自己的回执
    socket.on(`msgInfo`, (data) => {
      // 回调函数发送的数据返回给自己
      const chatRecordsData = props.chatRecordsData;
      // 当 聊天数据为空数据 设置初始化聊天记录为空数据
      if (chatRecordsData.chat_records === undefined)
        chatRecordsData.chat_records = [];
      // 给聊天记录添加 新的聊天记录
      chatRecordsData.chat_records.push(data.sendData);
      emit("update:chatRecordsData", chatRecordsData);
      console.log(data);
    });
    //#endregion
    // 当页面初始化加载完毕之后 让滚动条自动至最底部
    onMounted(() => {
      nextTick(() => {
        var chatBox = document.getElementsByClassName("chat-msg")[0];
        chatBox.scrollTop = chatBox.scrollHeight;
      });
    });
    // 当双向数据绑定的 chatRecordsData 发生了更新 在数据加载完毕之后 让滚动条自动至最底部
    watch(
      () => props.chatRecordsData,
      () => {
        nextTick(() => {
          // 通过nextTick 获取到真实DOM元素 控制滚动条
          var chatBox = document.getElementsByClassName("chat-msg")[0];
          chatBox.scrollTop = chatBox.scrollHeight;
        });
      },
      { deep: true }
    );

    return {
      inputStr,
      sendMessage,
      handleInput,
      main,
      selectedUsername,
      selectedPortrait,
      msgHistory,
    };
  },
};
</script>

<style scoped lang="less">
.chat-input-box {
  width: 100%;
  height: 100%;
  .chat-msg {
    width: 100%;
    height: calc(100% - 150px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 7px;
      border-radius: 7px;
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /* 滚动条中的 小滑块 小方块 */
      width: 1px;
      border-radius: 7px;
      background-color: skyblue;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }

    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ededed;
      border-radius: 7px;
    }
    ul {
      padding: 20px 20px 0px;

      li {
        text-align: left;
        padding-bottom: 20px;
        .msg-from-user {
          width: 30px;
          border-radius: 50%;
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          background-color: green;
          color: #fff;
        }
        .msg-info {
          padding: 0 10px;
          span.msg-send-time {
            display: block;
            margin-bottom: 5px;
          }
          .send-msg-box {
            position: relative;
            display: flex;
            justify-content: flex-end;
            .send-msg {
              font-size: 16px;
              background-color: #fff;
              padding: 5px;
              border-radius: 5px;
              width: fit-content;
              // max-width: 500px;
            }
          }
        }
      }
    }
  }
  textarea {
    width: 100%;
    height: 150px;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 20px;
    border: 1px solid #ccc;
    outline: none;
    resize: none;
    &.unHas {
      text-align: center;
      line-height: 125px;
      color: @warnColor;
    }
  }
  .option {
    display: flex;
    width: 200px;
    position: absolute;
    right: 0;
    bottom: 8px;
    justify-content: space-evenly;
    .close,
    .send {
      width: 70px;
      height: 30px;
      border: 1px solid #ccc;
      line-height: 30px;
      cursor: pointer;
    }
    .send {
      background-color: @helpColor;
      color: #fff;
    }
  }
}
.tar {
  text-align: right;
}
.flex-item-start {
  justify-content: flex-start !important;
}
</style>
