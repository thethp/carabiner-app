import React, { Component } from 'react';
import { AsyncStorage, Dimensions } from 'react-native';
import { Permissions, Notifications } from 'expo';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


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

const guidelineBaseWidth = 900;
const guidelineBaseHeight = 1600;

export const scale = (size) => {
  return SCREEN_WIDTH / guidelineBaseWidth * size;
};

export const verticalScale = (size) => {
  return SCREEN_HEIGHT / guidelineBaseHeight * size;
}

export const moderateScale = (size, factor = 0.5) => {
  return (size + ( scale(size) - size )) * factor;
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

//End Hookup
export const endHookup = async (_callback) => {
  let uuid = await AsyncStorage.getItem('uuid');

  fetch(API_BASE + '/endHookup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      uuid: uuid

    }),
  })
  .then((response) => response.json())
  .then((response) => {
    console.log('We got a response: ', response.success);
    _callback(response.success);
  });
}

// Get Contact
export const getContact = async (_contactUuid, _callback) => {
  let uuid = await AsyncStorage.getItem('uuid');

  fetch(API_BASE + '/getContacts/' + uuid + '/specificContact/' + _contactUuid)
  .then((response) => response.json())
  .then((response) => {
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

// Get Hookup Details
export const getHookUpDetails = async (_callback) => {
  //#TO-DO : should these all be promises? :-/
  //# TO-DO :make Up caps in all uses of hookup
  let uuid = await AsyncStorage.getItem('uuid');

  fetch(API_BASE + '/getHookupDetails/' + uuid)
  .then((response) => response.json())
  .then((response) => {
    if(response.success) {
      _callback(response.isHookingUp, response.hookUpDetails);
    } else {
      console.log("Couldn't fetch hookup details: ", _response.message);
    }
  });
}


export const sendMessage = async (_callback) => {
  let uuid = await AsyncStorage.getItem('uuid');

  fetch(API_BASE + '/sendMessage', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      uuid: uuid

    }),
  })
  .then((response) => response.json())
  .then((response) => {
    if(response.success) {
      //# TO-DO : show message sent confirmation
      //# TO-DO : send with uuid so we can tell the person who their text is for
      //_callback(response.isHookingUp, response.hookUpDetails);
    } else {
      //console.log("Couldn't fetch hookup details: ", _response.message);
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
