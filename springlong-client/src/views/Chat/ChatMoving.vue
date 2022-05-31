<template>
  <div class="page-chat-moving">
    <div class="title">
      <h1>黄汤灌汝口,此物最醒狗。糖高莫上前,不赐一分甜。</h1>
    </div>
    <ChatHead />
    <!-- 布局组件 -->
    <ChatLayout :BGC="BGC">
      <!-- 好友动态 -->
      <div class="friend-moving">
        <!-- 发表动态 -->
        <div class="add" @click="showPublishPopup">
          <PlusCircleOutlined />
        </div>
        <!-- 好友动态渲染 -->
        <div class="firend-moving-box">
          <ul>
            <li
              v-for="item in chatMovingData"
              :key="item.id"
              class="moving-item"
            >
              <div class="user-info clearfix">
                <div class="avatar-box fl">
                  <UserAvatar
                    :username="item.username"
                    :portrait="item.portrait"
                    :isBar="false"
                  />
                </div>
                <div class="name-tiem fl">
                  <p class="username">{{ item.username }}</p>
                  <p class="publish-time">{{ item.create_time }}</p>
                </div>
              </div>
              <div class="moving-content">
                <div class="moving-text">
                  {{ item.publish_text }}
                </div>
                <div class="moving-pic">
                  <img :src="item.publish_pic_access_path" alt="" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </ChatLayout>
    <!-- 传送——添加动态组件 -->
    <teleport to="#popup" v-if="$store.state.searchValuehModle">
      <Popup>
        <div class="publish">
          <!-- <form
            action="http://localhost:3000/chatmoving/uploadmoving"
            enctype="multipart/form-data"
            method="POST"
          ></form> -->
          <form ref="uploadMovingData">
            <textarea
              name="myPublish"
              id="myText"
              cols="30"
              rows="10"
              @blur="handleBlur"
              v-focus
              @input="movingStrSize"
              v-model="movingStr"
            ></textarea>
            <input
              type="file"
              name="myPic"
              @change="handleUpdataMoving($event)"
              ref="movingPic"
            />
            <div class="primary hoverShadow" @click="sendPrimary">
              确认发表动态
            </div>
          </form>
          <img
            :src="proviewPic"
            alt=""
            class="view"
            v-if="proviewPic !== '#'"
          />
        </div>
      </Popup>
    </teleport>
  </div>
</template>

<script>
import ChatHead from "./components/ChatHead.vue";
import ChatLayout from "./components/ChatLayout.vue";
import { PlusCircleOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { onBeforeMount, ref, watch } from "vue-demi";
import { getFriendMoving, uploadMovingDataAPI } from "../../api/moving";
import { message } from "ant-design-vue";
import reSetTime from "../../utils/reSetTime";
import { useRouter } from "vue-router";
export default {
  name: "ChatMoving",
  components: {
    ChatHead,
    ChatLayout,
    PlusCircleOutlined,
  },
  setup() {
    // 内容部分背景色
    const BGC = "rgba(82, 189, 32, 0.5)";
    const router = useRouter();
    const store = useStore();
    const myId = store.state.user.profile.id;
    //#region  初始化渲染获取好友与自己的动态
    // 图片渲染
    const imgSrc = ref("#");
    // 页面在加载之前获取好友动态数据
    const chatMovingData = ref([]);
    onBeforeMount(() => {
      getFriendMoving(myId).then((response) => {
        console.log(response);
        if (response.status === 200) {
          chatMovingData.value = response.moving.filter((item) => {
            item.create_time = reSetTime(item.create_time);
            return item;
          });
        } else if (response.tokenVerify === false) {
          message.warn(response.msg);
          router.push("/login");
        }
      });
    });
    //#endregion

    //#region  formData 上传表单数据
    // 显示弹窗
    const showPublishPopup = () => {
      store.commit("showModle", true);
    };
    const uploadMovingData = ref(null);
    const proviewPic = ref("#");
    let formdata = new FormData();
    // 文件上传元素绑定 input:file
    const movingPic = ref(null);
    // 限制用户数据字符长度
    const movingStr = ref("");
    const movingStrSize = () => {
      // 输入的字符长度不能大于150 不能有前后空格
      if (movingStr.value.length > 150) {
        movingStr.value = movingStr.value.slice(0, 150);
        message.error("字符长度不能大于150");
      }
    };
    // 当用户输入完毕 修改 formdata 数据
    const handleBlur = () => {
      formdata = new FormData(uploadMovingData.value);
      // formdata.set(e.target.name, e.target.value)
      // console.log(formdata.get(e.target.name))
      // console.log(formdata.get("myPublish"));
    };
    // 发表图片 修改 formdata 数据
    const handleUpdataMoving = (event) => {
      formdata = new FormData(uploadMovingData.value);
      // console.log(formdata.get("myPublish"));
      console.log(formdata.get("myPic"));

      // 必要步骤 使用内置对象 解析 input:file 的文件对象的解析路径
      const imgURL = URL.createObjectURL(event.target.files[0]);
      // 给图片预览同步更新图片地址
      proviewPic.value = imgURL;
    };

    // 向后端发送 formdata 数据
    const sendPrimary = () => {
      // 当发送动态的文字或者 图片都不存在 不发送数据
      if (
        (!!formdata.get("myPublish") || !!formdata.get("myPic").name) === false
      ) {
        message.warn("发表动态必须输入字符或者图片");
        return;
      }
      // 获取数据之前添加自己的Id
      formdata.set("myId", myId);
      uploadMovingDataAPI(formdata).then((response) => {
        console.log(response);

        // 当数据发送成功清空formdata表单
        movingStr.value = "";

        uploadMovingData.value.reset();
        proviewPic.value = "#";
        if (response.status == 200) {
          message.success(response.msg);
          response.newMoving.portrait = store.state.user.profile.portrait;
          response.newMoving.username = store.state.user.profile.username;
          const newMoving = response.newMoving;

          chatMovingData.value.unshift(newMoving);
        }
      });
    };

    // 监听弹窗是否关闭 如果关闭就清空form表单
    console.log(store.state.searchValuehModle);
    watch(
      () => store.state.searchValuehModle,
      () => {
        movingStr.value = "";
        uploadMovingData.value?.reset();
        proviewPic.value = "#";
      },
      { deep: true }
    );

    //#endregion
    return {
      BGC,
      chatMovingData,
      showPublishPopup,
      handleUpdataMoving,
      movingStr,
      movingPic,
      imgSrc,
      movingStrSize,
      handleBlur,
      proviewPic,
      uploadMovingData,
      sendPrimary,
    };
  },
};
</script>

<style scoped lang="less">
.page-chat-moving {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 105, 180, 0.4);

  .title {
    padding-top: 100px;
    margin-bottom: 20px;

    h1 {
      text-align: center;
      font-size: 36px;
      font-weight: 700;
      color: #1cd4b4;
    }
  }

  .friend-moving {
    position: relative;
    height: 100%;
    .add {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 30px;
      cursor: pointer;
    }
    .add:hover {
      transform: scale(1.1);
      transition: 0.3s all linear;
    }
    .firend-moving-box {
      width: 100%;
      height: 100%;
      padding: 40px 10px 0;
      background-color: #efefef;
      border-radius: 8px;
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

      .moving-item {
        background-color: #fff;
        border-radius: 5px;
        padding: 10px 10px 0;
        margin-bottom: 10px;
        .user-info {
          margin-bottom: 10px;
          .name-tiem {
            margin-top: 5px;
          }
        }
        .moving-content {
          margin-bottom: 20px;
          .moving-text {
            margin-bottom: 10px;
            font-size: 16px;
          }
          img {
            width: 200px;
          }
        }
      }
    }
  }
}
.publish {
  padding-left: 20px;
  form {
    position: relative;
    textarea {
      background-color: rgba(239, 239, 239, 0.7);

      width: 100%;
      height: 150px;
      bottom: 0;
      right: 0;
      font-size: 20px;
      border: 1px solid #ccc;
      outline: none;
      resize: none;
    }

    .primary {
      position: absolute;
      bottom: 0;
      right: 50%;
      transform: translateY(50%);
      width: 150px;
      height: 40px;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      background-color: #ccc;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: @sucColor;
        box-shadow: 0px 1px 9px 2px rgb(158, 185, 152);
      }
    }
  }
  .view {
    width: 100px;
    margin: 10px 0;
  }
}
</style>
