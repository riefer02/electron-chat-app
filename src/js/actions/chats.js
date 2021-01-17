import * as api from "../api/chats";
import db from "../db/firestore";

// export function fetchChats() {
//   return async function (dispatch) {
//     const chats = await api.fetchChats();
//     dispatch({
//       type: "CHATS_FETCH_SUCCESS",
//       chats,
//     });
//     return chats;
//   };
// }

export const fetchChats = () => (dispatch) =>
  api.fetchChats().then((chats) =>
    dispatch({
      type: "CHATS_FETCH_SUCCESS",
      chats,
    })
  );

export const createChat = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = db.doc(`userProfiles/${userId}`);
  const chatId = await api.createChat(newChat);
  dispatch({type: 'CHATS_CREATE_SUCCESS'});
  await api.joinChat(userId, chatId)
  dispatch({type: 'CHATS_JOIN_SUCCESS'});
  return chatId;
};
