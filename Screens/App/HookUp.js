import React, { Component } from 'react';
import { Button, Image, Picker, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Font, Svg } from 'expo';
import { getContacts, startHookupTimer } from '../../Utils/Utils';

const { Defs, G, Path, RadialGradient, Stop } = Svg;

export default class HookUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hookup: {
        meetingPlace: '',
        username:     '',
        hookupLocation: '',
        phoneNumber:  '',
        checkInTime:  '180',
        contact: '',
      },
      contacts: [],
    };
  }

  componentWillMount = () => {
    getContacts((_contacts) => {
      this.setState({contacts: _contacts});
    });
  }

  // # TO-DO : Make all event functions same format
  //#TO-DO : validate fields arent empty
  __onPressSubmit = () => {
    startHookupTimer(this.state.hookup, this.startHookupCallback);
  }

  startHookupCallback = (_isSuccessful, _message: '') => {
    if(_isSuccessful) {
      this.props.navigation.navigate('Home', { hookingUp: true });
    } else {
      //# TO-DO : show to user?
      console.log('Error starting hookup: ', _message);
    }
  }

  renderPickerOptions = () => {
    return this.state.contacts.map((contact, i) => {
      //# TO-DO : if confirmed = true - if none confirmed, then what?
      return (<Picker.Item key={i} label={contact.name} value={contact.uuid} />)
    });
  }

  updateHookup = (key, data) => {
    this.setState({
      hookup: {
        ...this.state.hookup,
        [key]: data
      }
    });
  }

  renderBackground = () => {

    //# TO-DO : animate this nicely

    return (
      <View style={styles.BackgroundView}>
        <Svg width="100%" height="100%">
          <Defs>
              <RadialGradient cx="10%" cy="0%" fx="0%" fy="0%" r="90%" gradientTransform="matrix(0 .5625 -1 0 .5 -.281)" id="a">
                  <Stop stopColor="#FFF" stopOpacity="0" offset="0%"/>
                  <Stop stopColor="#A52E9F" offset="100%"/>
              </RadialGradient>
          </Defs>
          <Path d="M.993 0h900v1600h-900z" transform="translate(-.233 .721)" fill="url(#a)" fillRule="evenodd"/>
        </Svg>
      {/* # TO-DO: Can the mountain range be an svg too? */}
        <Image style={styles.MountainRange} source={require('../../assets/MountainRange2.png')} />
      </View>
    );
  }

  render() {

    return (
      <SafeAreaView style={{flex: 1 }}>
        { this.renderBackground() }

        <TouchableHighlight style={{height: '4%', width: 'auto', marginRight: 10, marginLeft: 20}} onPress={this.__signOut}>
          <Svg width="100%" height="100%" preserveAspectRatio="xMaxYMax meet" viewBox="0 0 56 56">
            <G fill="#FFF" fillRule="nonzero">
              <Path d="M25.682 55.31a7.78 7.78 0 0 0 7.78-7.78v-7.164a2.593 2.593 0 0 0-5.187 0v7.164a2.593 2.593 0 0 1-2.593 2.593H8.18a2.593 2.593 0 0 1-2.593-2.593V8.633A2.593 2.593 0 0 1 8.179 6.04h17.503a2.593 2.593 0 0 1 2.593 2.593v7.26a2.593 2.593 0 0 0 5.187 0v-7.26a7.78 7.78 0 0 0-7.78-7.78H8.18a7.78 7.78 0 0 0-7.78 7.78V47.53a7.78 7.78 0 0 0 7.78 7.78h17.503z"/>
              <Path d="M54.22 26.137L40.606 12.523a2.595 2.595 0 0 0-3.67 3.669l9.303 9.296H17.255a2.593 2.593 0 0 0 0 5.187h28.984l-9.328 9.322a2.593 2.593 0 1 0 3.669 3.643l13.614-13.614a2.593 2.593 0 0 0 0-3.89h.026z"/>
            </G>
          </Svg>
        </TouchableHighlight>

        <ScrollView>
          <Text>Nice! Where'd you meet?</Text>
          <TextInput
            placeholder='Grindr, Growlr, a bar, etc...'
            value={this.state.hookup.meetingPlace}
            name='meetingPlace'
            onChangeText={(text) => this.updateHookup('meetingPlace', text)}
          />

          <Text>What was their name/username?</Text>
          <TextInput
            placeholder='forsureatop6969'
            value={this.state.hookup.username}
            name='username'
            onChangeText={(text) => this.updateHookup('username', text)}
          />

          <Text>Where are you going to be?</Text>
          {/* # TO-DO: Add the option of using your geolocation */}
          {/* # TO-DO: Tie in with google maps autocomplete or similar */}
          <TextInput
            placeholder='1313 Webfoot Walk, Duckburg, Calisota'
            value={this.state.hookup.hookupLocation}
            name='hookupLocation'
            onChangeText={(text) => this.updateHookup('hookupLocation', text)}
          />

          <Text>Optional- whats their phone number?</Text>
          {/* # TO-DO: Add the option of using your geolocation */}
          {/* # TO-DO: Tie in with google maps autocomplete or similar */}
          <TextInput
            placeholder='525-600-6468'
            value={this.state.hookup.phoneNumber}
            name='phoneNumber'
            onChangeText={(text) => this.updateHookup('phoneNumber', text)}
          />

          <Text>We will check in with you after a designated amount of hours to make sure you're ok. When should we do our first check-in?</Text>
          <Picker 
            selectedValue={this.state.hookup.checkInTime}
            name='checkInTime'
            onValueChange={(itemValue, itemIndex) => this.updateHookup('checkInTime', itemValue)} 
          >
            <Picker.Item label="1 hour" value="60" />
            <Picker.Item label="2 hours" value="120" />
            <Picker.Item label="3 hours" value="180" />
            <Picker.Item label="4 hours" value="240" />
            <Picker.Item label="5 hour" value="300" />
            <Picker.Item label="6 hours" value="360" />
            <Picker.Item label="7 hours" value="420" />
            <Picker.Item label="8 hours" value="480" />
            <Picker.Item label="9 hour" value="540" />
            <Picker.Item label="10 hours" value="600" />
            <Picker.Item label="11 hours" value="660" />
            <Picker.Item label="12 hours" value="720" />
          </Picker>

          <Text>You will have 8 hours to respond to our check-in.  After this time, we will text a contact the above information.  Who should we text?</Text>
          {/* # TO-DO: Only show this as an input if there's more than one contact */}
          {/* # TO-DO: Additional input for "additional details?" */}
          <Picker 
            selectedValue={this.state.hookup.contact}
            name='contact'
            onValueChange={(itemValue, itemIndex) => this.updateHookup('contact', itemValue)} 
          >
            { this.renderPickerOptions() }
          </Picker>

          <Button
            title="Let's do this"
            style={{margintop: 10}}
            onPress={this.__onPressSubmit}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  BackgroundView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#9571DC',
    flex: 1,
  },
  MountainRange: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 5,
  },
});