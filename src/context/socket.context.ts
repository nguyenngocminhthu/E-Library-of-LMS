import React from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:4000';

export const socket = socketIOClient(ENDPOINT);
let listUser: Array<any> = [];
export const SocketContext = React.createContext({
  socket,
  listUser,
});