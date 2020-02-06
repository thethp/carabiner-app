import React, { Component } from 'react';
import { Button, Image, Picker, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import * as Font from 'expo-font';
import Svg, { Defs, G, Path, RadialGradient, Stop, Use } from 'react-native-svg';
import { renderBackButton, renderFormBackground } from './Renderings';
import { getContacts, startHookupTimer, scale, verticalScale } from '../../Utils/Utils';

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

  componentDidMount = () => {
    Font.loadAsync({
      'ostrich-sans-heavy': require('../../assets/Fonts/OstrichSans-Heavy.otf'),
      'league-mono-light': require('../../assets/Fonts/LeagueMono-Light.otf'),
      'league-mono-medium': require('../../assets/Fonts/LeagueMono-Medium.otf')
    })
    .then(() => {
      this.setState({
        isFontLoaded: true,
      })
    });

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

  render() {

    return (
      <SafeAreaView style={{flex: 1 }}>
        {/* TO-DO : make padding so scroll bar is on far right */}

        { renderFormBackground() }

        <TouchableHighlight style={{height: '3%', width: 'auto', marginLeft: 10, marginBottom: 30}} onPress = {() => this.props.navigation.navigate('Home')}>
          <Svg width="100%" height="100%" preserveAspectRatio="xMinYMin meet" viewBox="0 0 45 54" >
            <Path d="M40.826 4.072L4 30.5l36.479 19.344L4 30.5z" stroke="#FFF" strokeWidth="7" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableHighlight>

        <View style={styles.TitleView}>

            <View style={{ flex: 1, width: '35%', height: 'auto'}}>

              <Svg width="100%" height="100%" preserveAspectRatio="xMidYMax meet" viewBox="0 0 315 116">
                <Defs>
                  <RadialGradient cx="50%" cy="0%" fx="50%" fy="0%" r="250.882%" gradientTransform="matrix(0 1 -.49831 0 .5 -.5)" id="b">
                    <Stop stopColor="#3A2DA0" offset="0%"/>
                    <Stop stopColor="#FFF" stopOpacity="0" offset="0%"/>
                    <Stop stopColor="#A52E9F" offset="100%"/>
                  </RadialGradient>
                  <Path d="M113.534 6.878c12.61 0 24.141 4.628 33.045 12.246l5.134 5.082a51.166 51.166 0 0 1 7.916 12.06l2.559 6.42a50.815 50.815 0 0 1 2.297 15.146h.027c0 2.926.382 5.756 1.035 8.49-4.522 2.17-8.868 4.433-13.098 6.65a50.815 50.815 0 0 1-2.297-15.144h-.028c0-2.926-.382-5.757-1.035-8.49a36.44 36.44 0 0 0-2.242-6.562 36.743 36.743 0 0 0-8.566-11.823 36.975 36.975 0 0 0-6.318-4.683c-5.42-3.178-11.706-5.032-18.429-5.032-11.568 0-21.881 5.41-28.59 13.818h-16.92c8.378-16.682 25.606-28.178 45.51-28.178zM55.782 56.29H14.058v.034c-3.958-.003-7.18-3.222-7.18-7.18 0-3.958 3.222-7.177 7.18-7.177v-.034H95.11c13.326 0 25.124-3.291 36.174-7.882a29.91 29.91 0 0 1 9.333 11.606c-13.388 5.942-28.261 10.63-45.504 10.63h-39.33v.003zm100.855 38.453c-14.316 7.463-28.075 14.031-43.103 14.031-26.293 0-47.989-20.014-50.664-45.61h14.505c2.6 17.649 17.8 31.253 36.163 31.253 11.39 0 22.696-5.255 35.383-11.844 1.636-.846 3.284-1.712 4.965-2.593l1.125-.591c4.123-2.163 8.373-4.378 12.782-6.51 2.043-.987 4.123-1.95 6.231-2.889 13.384-5.942 28.261-10.63 45.504-10.63h11.214a29.466 29.466 0 0 1-4.577 14.358h-6.637c-13.326 0-25.125 3.295-36.174 7.879a172.697 172.697 0 0 0-6.998 3.102c-4.564 2.142-9.024 4.44-13.429 6.75l-6.29 3.294zm92.847-21.021l-2.868 6.877c-8.381 16.682-25.606 28.175-45.51 28.175-12.607 0-24.141-4.629-33.045-12.242 4.787-2.494 9.64-4.942 14.616-7.15 5.42 3.181 11.705 5.035 18.428 5.035 11.565 0 21.879-5.41 28.591-13.821a36.56 36.56 0 0 0 4.316-6.878 36.322 36.322 0 0 0 3.607-14.357c.021-.513.076-1.021.076-1.54 0-1.816-.179-3.587-.433-5.338-2.6-17.648-17.8-31.252-36.16-31.252-11.39 0-22.697 5.258-35.383 11.843-2.084-4.374-4.652-8.477-7.716-12.167 14.316-7.462 28.075-14.037 43.099-14.037 26.294 0 47.99 20.018 50.665 45.61l.21 6.877c-.152 5.007-1.001 9.825-2.493 14.365zm39.072 0H256.66a57.481 57.481 0 0 0 2.198-14.358h29.701c-1.265 2.108-2.039 4.543-2.039 7.177 0 2.634.77 5.073 2.036 7.18zm12.019 0c-3.958 0-7.18-3.22-7.18-7.18 0-3.955 3.222-7.178 7.18-7.178 3.958 0 7.18 3.223 7.18 7.177a7.183 7.183 0 0 1-7.18 7.18z" id="a"/>
                </Defs>
                <G fill="none" fill-rule="evenodd">
                  <G transform="translate(.5 -.001)">
                    <Use fill="#9571DC" href="#a"/>
                    <Use fill="url(#b)" href="#a"/>
                  </G>
                  <Path d="M301.075 52.486h-41.91C256.46 23.097 231.69 0 201.605 0c-17.287 0-32.311 7.493-48.044 15.736C143.21 6.006 129.324-.001 114.034-.001c-23.803 0-44.278 14.463-53.137 35.052H14.558v.034C6.807 35.085.5 41.392.5 49.144c0 7.75 6.307 14.058 14.058 14.058v-.035h41.913c2.707 29.389 27.477 52.488 57.56 52.488 17.294 0 32.319-7.497 48.045-15.73 10.354 9.726 24.237 15.73 39.526 15.73 23.804 0 44.279-14.46 53.138-35.053h46.335c7.751 0 14.058-6.307 14.058-14.058 0-7.751-6.307-14.058-14.058-14.058zm-187.04-45.61c12.61 0 24.14 4.629 33.044 12.246l5.134 5.083a51.166 51.166 0 0 1 7.916 12.06l2.559 6.42a50.815 50.815 0 0 1 2.297 15.145h.027c0 2.927.382 5.757 1.035 8.49-4.522 2.17-8.868 4.433-13.098 6.652a50.815 50.815 0 0 1-2.297-15.145h-.028c0-2.927-.382-5.757-1.035-8.49a36.44 36.44 0 0 0-2.242-6.562 36.743 36.743 0 0 0-8.566-11.823 36.975 36.975 0 0 0-6.318-4.684c-5.42-3.177-11.706-5.03-18.429-5.03-11.568 0-21.881 5.408-28.59 13.816h-16.92c8.378-16.682 25.606-28.178 45.51-28.178zM146.81 76.18c-12.111 6.3-22.803 11.362-32.776 11.362-14.56 0-26.685-10.533-29.21-24.375h10.788c18.22 0 33.725-4.8 47.598-10.901.344 1.802.54 3.659.54 5.564h.027c-.003 6.417 1.09 12.573 3.033 18.35zm-23.064-46.404c-8.793 3.164-18.058 5.278-28.137 5.278h-.63c5.162-4.326 11.806-6.94 19.052-6.94 3.408-.003 6.665.603 9.715 1.662zM56.282 56.29H14.558v.034c-3.958-.004-7.18-3.222-7.18-7.18 0-3.959 3.222-7.177 7.18-7.177v-.035H95.61c13.326 0 25.124-3.29 36.174-7.882a29.91 29.91 0 0 1 9.333 11.607c-13.388 5.942-28.261 10.63-45.504 10.63h-39.33v.003zm100.855 38.453c-14.316 7.462-28.075 14.03-43.103 14.03-26.293 0-47.989-20.014-50.664-45.61h14.505c2.6 17.65 17.8 31.253 36.163 31.253 11.39 0 22.696-5.254 35.383-11.843 1.636-.846 3.284-1.713 4.965-2.593.372-.196.75-.396 1.125-.592 4.123-2.163 8.373-4.377 12.782-6.51 2.043-.986 4.123-1.95 6.231-2.888 13.384-5.942 28.261-10.63 45.504-10.63h11.214a29.466 29.466 0 0 1-4.577 14.358h-6.637c-13.326 0-25.125 3.294-36.174 7.878a172.697 172.697 0 0 0-6.998 3.102c-4.564 2.142-9.024 4.44-13.429 6.75l-6.29 3.295zm11.69-55.27c12.11-6.3 22.802-11.362 32.775-11.362 14.56 0 26.682 10.534 29.206 24.375h-10.784c-18.223 0-33.725 4.797-47.597 10.901a29.637 29.637 0 0 1-.54-5.564h-.028c.004-6.417-1.09-12.572-3.033-18.35zm51.83 41.126c-5.162 4.326-11.806 6.943-19.052 6.943-3.404 0-6.664-.605-9.71-1.661 8.792-3.164 18.057-5.279 28.136-5.279h.626V80.6zm29.327-6.878l-2.868 6.878c-8.381 16.682-25.606 28.175-45.51 28.175-12.607 0-24.141-4.63-33.045-12.243 4.787-2.493 9.64-4.941 14.616-7.15 5.42 3.182 11.705 5.035 18.428 5.035 11.565 0 21.879-5.409 28.591-13.82a36.56 36.56 0 0 0 4.316-6.878 36.322 36.322 0 0 0 3.607-14.358c.021-.512.076-1.02.076-1.54 0-1.816-.179-3.587-.433-5.337-2.6-17.649-17.8-31.253-36.16-31.253-11.39 0-22.697 5.258-35.383 11.844-2.084-4.375-4.652-8.477-7.716-12.167 14.316-7.462 28.075-14.038 43.099-14.038 26.294 0 47.99 20.018 50.665 45.61l.21 6.878c-.152 5.007-1.001 9.825-2.493 14.364zm39.072 0H257.16a57.481 57.481 0 0 0 2.198-14.357h29.701c-1.265 2.108-2.039 4.543-2.039 7.177 0 2.634.77 5.072 2.036 7.18zm12.019 0c-3.958 0-7.18-3.219-7.18-7.18 0-3.955 3.222-7.177 7.18-7.177 3.958 0 7.18 3.222 7.18 7.177a7.183 7.183 0 0 1-7.18 7.18z" fill="#362950" fillRule="nonzero"/>
                </G>
              </Svg>
            </View>

            <Text
              title="Meet Someone"
              style={[styles.TitleText, {
                fontFamily: this.state.isFontLoaded ? 'ostrich-sans-heavy' : null
              }]}
            >
              Meet Someone
            </Text>
        </View>

        <ScrollView style={styles.ScrollView}>
          {/* # TO-DO: just use default font for labels/field? */}
          <Text style={[styles.Label, {fontFamily: this.state.isFontLoaded ? 'league-mono-medium' : null}]}>How did you connect?</Text>
          <TextInput
            placeholder='Grindr, Growlr, a bar, etc...'
            value={this.state.hookup.meetingPlace}
            name='meetingPlace'
            onChangeText={(text) => this.updateHookup('meetingPlace', text)}
            style={[styles.Input, {fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null}]}
          />

          <Text style={[styles.Label, {fontFamily: this.state.isFontLoaded ? 'league-mono-medium' : null}]}>What's their name/username?</Text>
          <TextInput
            placeholder='forsureatop6969'
            value={this.state.hookup.username}
            name='username'
            onChangeText={(text) => this.updateHookup('username', text)}
            style={[styles.Input, {fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null}]}
          />

          <Text style={[styles.Label, {fontFamily: this.state.isFontLoaded ? 'league-mono-medium' : null}]}>Where will you be?</Text>
          {/* # TO-DO: Add the option of using your geolocation */}
          {/* # TO-DO: Tie in with google maps autocomplete or similar */}
          <TextInput
            placeholder='1313 Webfoot Walk, Duckburg, Calisota'
            value={this.state.hookup.hookupLocation}
            name='hookupLocation'
            onChangeText={(text) => this.updateHookup('hookupLocation', text)}
            style={[styles.Input, {fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null}]}
          />

          <Text style={[styles.Label, {fontFamily: this.state.isFontLoaded ? 'league-mono-medium' : null}]}>What's their phone number? (optional)</Text>
        {/* # TO-DO: make optional above grey */}
          {/* # TO-DO: Add the option of using your geolocation */}
          {/* # TO-DO: Tie in with google maps autocomplete or similar */}
          <TextInput
            placeholder='525-600-6468'
            value={this.state.hookup.phoneNumber}
            name='phoneNumber'
            onChangeText={(text) => this.updateHookup('phoneNumber', text)}
            style={[styles.Input, {fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null}]}
          />

          <Text style={[styles.Label, {fontFamily: this.state.isFontLoaded ? 'league-mono-medium' : null}]}>We will check in with you after a designated amount of hours to make sure you're ok. When should we do our first check-in?</Text>
          <Picker 
            selectedValue={this.state.hookup.checkInTime}
            name='checkInTime'
            onValueChange={(itemValue, itemIndex) => this.updateHookup('checkInTime', itemValue)} 
            itemStyle={{height: 110}}
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

          <Text style={[styles.Label, {fontFamily: this.state.isFontLoaded ? 'league-mono-medium' : null}]}>If you don’t reply within 30 minutes of a check-in, we will text the details of your rendezvous with a contact.  Which contact should we text?</Text>
          {/* # TO-DO: Only show this as an input if there's more than one contact */}
          {/* # TO-DO: Additional input for "additional details?" */}
          <Picker 
            selectedValue={this.state.hookup.contact}
            name='contact'
            onValueChange={(itemValue, itemIndex) => this.updateHookup('contact', itemValue)}
            itemStyle={{height: 110}} 
          >
            { this.renderPickerOptions() }
          </Picker>

          <TouchableHighlight
            style={styles.SubmitButtonContainer}
            onPress={this.__onPressSubmit}
          >
            <Image 
              style={styles.SubmitButton} 
              source={require('../../assets/SubmitButton.png')} 
            />
          </TouchableHighlight>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  TitleView: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    height: '15%',
    marginTop: 20,
    marginBottom: 12
  },
  TitleText: {
    fontSize: 42,
    color: '#362950',
    flex: 1,
    marginTop: 20,
    alignItems: 'flex-start',
  },
  ScrollView: {
    flex: 4,
    width: '100%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    backgroundColor: '#FFF'
  },
  Label: {
    color: '#000',
    fontSize: 13.6,
    marginBottom: 5,
    marginTop: 15
  },
  Input: {
    marginLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#D8D8D8',
    paddingBottom: 4,
  },
  SubmitButtonContainer: {
    marginLeft: 'auto',
  },
  SubmitButton: {
    width: scale(185),
    height: verticalScale(120),
    resizeMode: 'contain'
  },
});