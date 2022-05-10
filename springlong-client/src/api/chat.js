import { requestWithOutToken, requestWithToken } from "../utils/request";
// 寻找好友
export const searchFriend = function (searchValue, id) {
  // return requestWithToken("chat/search", "get")
  return requestWithOutToken(`chat/search/${searchValue}/${id}`, "get");
};
// 添加好友
export const applyAdditionFriend = (id, myId) => {
  return requestWithToken("/chat/addfriend", "post", { id, myId });
};

// 获取好友申请数据
export const getFriendApplyAdd = (ApplyList) => {
  return requestWithToken("/chat/applylist", "post", ApplyList);
};

// 是否同意好友申请
export const isAgreeApply = ({ id, myId, type }) => {
  return requestWithToken("/chat/isagreeapply", "post", { id, myId, type });
};

// 获取好友列表
export const getGoodFriendsList = (id) => {
  return requestWithToken(`/chat/goodFriends/${id}`, "get");
};

// 删除好友
export const delGoodFriend = (id, myId) => {
  return requestWithToken("/chat/delfriend", "post", { myId, id });
};
