import * as api from '../api/connection';

export const checkUserConnection = (userId) => (dispatch) =>
  api.onConnectionChanged((isConnected) => {
    api.setUserOnlineStatus(userId, isConnected);
    dispatch({ type: 'CONNECTION_USER_STATUS_CHANGED' });
  });
