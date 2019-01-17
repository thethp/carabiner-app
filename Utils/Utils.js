import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const that = this;

//DISPLAY RELATED THINGS
export const getColor = (_str) => {
  let hash = 5381;
  for (let i = 0; i < _str.length; i++) {
    hash = ((hash << 5) + hash) + _str.charCodeAt(i);
  }
  
  let r = (hash & 0xFF0000) >> 16;
  let g = (hash & 0x00FF00) >> 8;
  let b = hash & 0x0000FF;
  
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}



// TIMER RELATED THINGS
export const startHookupTimer = () => {
  setTimeout(() => {that.sendAlert()}, 15000);
}

sendAlert = () => {
  //# TODO : make this an actual notification
  //# TODO : add correct imagery to this icon
  //# TODO : should this all be from an API? what happens if they close the app?
  this.sendMessage('OK');
}



//NOTIFICATION RELATED THINGS
const API_BASE  = 'http://carabiner.xyz';

export const registerForPushNotificationsAsync = async (handleNotification) => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if(status !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  //#TO-DO : make post etc fetches into functions

  return fetch(API_BASE + '/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      token: {
        value: token,
      },
      user: {
        username: 'tillertest',
        name: 'Todd Page',
      }

    }),
  });

  this.notificationSubscription = Notifications.addListener(handleNotification);
}

sendMessage = async (messageText) => {
  fetch(API_BASE + '/message', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      message: messageText

    }),
  });
}

