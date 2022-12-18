import React from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
const ENDPOINT = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';

// let socket: any;
export const socket = socketIOClient(ENDPOINT);

let listUser: Array<any> = [];
let statistical: any = {};
export const SocketContext = React.createContext({
  socket,
  listUser,
  statistical,
});