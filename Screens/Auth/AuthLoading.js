import React, { Component } from 'react';
import { AsyncStorage, Text, View } from 'react-native';

export default class AuthLoading extends React.Component {
	constructor(props) {
    super(props);
    this.checkForToken();
  }

  //# TO-DO : is this secure enough?
  checkForToken = async () => {
  	const userToken = await AsyncStorage.getItem('userToken');
  	const firstLaunch = await AsyncStorage.getItem('firstLaunch');

  	if(userToken) {
  		this.props.navigation.navigate('App');
  	} else {
  		this.props.navigation.navigate('Auth', { firstLaunch: firstLaunch });
  	}
  }

  render() {

    return (
      <View style={{flex: 1 }}>
        <Text>Loading...</Text>
        {/* # TO-DO: Cute little figure 8 knot animation? */}

      </View>
    );
  }
}
