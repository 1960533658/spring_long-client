import { requestWithToken } from "../utils/request";
// 初始化获取好友动态
export const getFriendMoving = (myId) => {
  return requestWithToken(`/chatmoving/getmoving/${myId}`, "get");
};
// 更新好友动态
export const uploadMovingDataAPI = (formdata) => {
  return requestWithToken("/chatmoving/uploadmoving", "post", formdata);
};
