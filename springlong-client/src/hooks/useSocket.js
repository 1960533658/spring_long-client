// 导入 socket.io-client 中的 io
import { io } from "socket.io-client";

export function useSocket(token) {
  // 实例化连接
  const socket = io("http://localhost:3001", {
    reconnectionDelayMax: 10000,
    auth: { token },
  });
  return socket;
}
