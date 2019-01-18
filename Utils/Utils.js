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
  //# TO-DO : This should be happening in the server
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
// Register or Sign In User
export const authUser = async (_signInType, _username, _password, _callback) => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if(status !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  //#TO-DO : make post etc fetches into functions

  let apiURLExtension = (_signInType == "registration") ? '/register' : '/login';

  fetch(API_BASE + apiURLExtension, {
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
        username: _username,
        password: _password,
      }

    }),
  })
  .then((response) => response.json())
  .then(async (response) => {
    console.log('We got a response: ', response.uuid);
    //# TO-DO : Should tokens time out? How does that work
    //# TO-DO : make uuid you're setting, the actual uuid we're getting from the api
    // # TO-DO : signup goes to contact creation
    await AsyncStorage.setItem('uuid', response.uuid);
    //# TO-DO : If registration, go to new user stuff, maybe use a token
    //#TO-DO : v must be done in callback or at least some component
    //this.props.navigation.navigate('App');
  }).catch((_error) => { _callback(_error)});

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

