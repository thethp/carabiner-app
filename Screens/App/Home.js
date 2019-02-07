import React, { Component } from 'react';
import { AsyncStorage, Button, Text, View } from 'react-native';
import { endHookup, getHookUpDetails } from '../../Utils/Utils';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    //# TO-DO : make the check in time an actual time that we can count to in the display
    this.state = {
      hookUpDetails: {
        meetingPlace: '',
        username:     '',
        hookupLocation: '',
        phoneNumber:  '',
        checkInTime:  '180',
        contact: '',
      },
      isHookingUp: false,
    };
  }

  componentWillMount = () => {

    getHookUpDetails((_isHookingUp, _hookUpDetails) => {

      this.setState({
        isHookingUp: _isHookingUp, 
        hookUpDetails: _hookUpDetails,
      });
    });
  }

  __signOut = async () => {
    //# TO-DO : Move to header or utils
    await AsyncStorage.removeItem('uuid');
    this.props.navigation.navigate('Auth');
  }

  __endHookup = () => {
    endHookup((_isSuccessful) => {
      if(_isSuccessful) {
        this.setState({
          isHookingUp: false, 
          hookUpDetails: {},
        });

      } else {
        console.log('Something went wrong');
        //# TO-DO : communicate to user
      }
    });
  }

  renderHookingUp = () => {
    if(this.state.isHookingUp) {
      return (
        <View>
          <Text>You're hooking up with: {this.state.hookUpDetails.username}</Text>
          <Text>At {this.state.hookUpDetails.hookupLocation}</Text>
          {/* #TO-DO : make the below a countdown */}
          <Text>Your check in time is in: </Text>
          {/* contact below is coming through as uuid */}
          <Text>After that we contact: {this.state.hookUpDetails.contact}</Text>

          <Button
            title="I'm safe!"
            onPress={this.__endHookup}
          />

        {/* #TO-DO : add edit button/functionality */}
        </View>
      );

    } else {
      return (
        <Button
          title="I'm Hooking Up"
          onPress = {() => this.props.navigation.navigate('HookUp')}
        />
      );

    }
  }

  render() {

    return (
      <View style={{flex: 1 }}>
        <Text>Home Screen</Text>
        {/* # TO-DO: Onboarding? */}
        {/* # TO-DO: If hooking up, show details and "im done" / "send for help" buttons */}
        {/* # TO-DO: If hooking up, add option to update location */}
        {/* # TO-DO: If no contacts only show an add contact button */}
        {/* # TO-DO: Support */}
        {/* # TO-DO: Ads -> Subscription */}

        { this.renderHookingUp() }

        <Button
          title="Manage My Friends"
          onPress = {() => this.props.navigation.navigate('ManageFriends')}
          style={{margintop: 10}}
        />

      {/* # TO-DO: Move signout into header, get rid of func on this page */}
        <Button
          title="Signout"
          onPress = {this.__signOut}
        />
      </View>
    );
  }
}
