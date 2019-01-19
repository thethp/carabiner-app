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


//API RELATED THINGS
const API_BASE  = 'http://carabiner.xyz';

// Add or Edit Contact
export const addEditContact = async (_contactDetails, _callback) => {
  let uuid = await AsyncStorage.getItem('uuid');

  fetch(API_BASE + '/addEditContact', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      uuid: uuid,
      contactDetails: _contactDetails

    }),
  })
  .then((response) => response.json())
  .then(async (response) => {

    if(response.success) {
      _callback(true);
    } else {
      _callback(false, response.message);
    }
  });
}

// Register or Sign In User
export const authUser = async (_signInType, _username, _password, _callback) => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if(status !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

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

    if(response.success) {
      await AsyncStorage.setItem('uuid', response.uuid);
      _callback(true);
    } else {
      _callback(false, response.message);
    }
    //# TO-DO : Should tokens time out? How does that work
  });
}

// Get Contact
export const getContact = async (_contactUuid, _callback) => {
  let uuid = await AsyncStorage.getItem('uuid');

  fetch(API_BASE + '/getContacts/' + uuid + '/specificContact/' + _contactUuid)
  .then((response) => response.json())
  .then((response) => {
    console.log('We got a response: ', response);
    _callback(response);
  });
}

// Get Contacts
export const getContacts = async (_callback) => {
  let uuid = await AsyncStorage.getItem('uuid');

  fetch(API_BASE + '/getContacts/' + uuid)
  .then((response) => response.json())
  .then((response) => {
    if(response.success) {
      _callback(response.contacts);
    } else {
      _callback([]);
    }
  });
}

export const startHookupTimer = async (_hookupDetails, _callback) => {
  let uuid = await AsyncStorage.getItem('uuid');

  fetch(API_BASE + '/startHookup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      uuid: uuid,
      hookupDetails: _hookupDetails,

    }),
  })
  .then((response) => response.json())
  .then(async (response) => {

    if(response.success) {
      _callback(true);
    } else {
      _callback(false, response.message);
    }
  });
}

sendAlert = () => {
  //# TODO : make this an actual notification
  //# TODO : add correct imagery to this icon
  //# TODO : should this all be from an API? what happens if they close the app?
  this.sendMessage('OK');
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
