import React, { Component } from 'react';
import { AsyncStorage, Button, Text, View } from 'react-native';

export default class HomeScreen extends React.Component {

  signOut = async () => {
    //# TO-DO : Move to header or utils
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }

  render() {

    return (
      <View style={{flex: 1 }}>
        <Text>Home Screen</Text>
        {/* # TO-DO: Onboarding? */}
        {/* # TO-DO: check props for hooking up, check api? database? for hooking up */}
        {/* # TO-DO: If hooking up, show details and "im done" / "send for help" buttons */}
        {/* # TO-DO: If no contacts only show an add contact button */}
        {/* # TO-DO: Support */}
        {/* # TO-DO: Ads -> Subscription */}

        <Button
          title="I'm Hooking Up"
          onPress = {() => this.props.navigation.navigate('HookUp', { username: 'Carl' })}
        />

        <Button
          title="Manage My Friends"
          onPress = {() => this.props.navigation.navigate('ManageFriends', { username: 'Carl' })}
          style={{margintop: 10}}
        />

      {/* # TO-DO: Move signout into header, get rid of func on this page */}
        <Button
          title="Signout"
          onPress = {this.signOut}
        />
      </View>
    );
  }
}
