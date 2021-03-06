import React, { Component } from 'react';
import { AsyncStorage, Button, Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import * as Font from 'expo-font';
import Svg, { Defs, G, Path, RadialGradient, Stop } from 'react-native-svg';
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
      isFontLoaded: false,
      isHookingUp: false,
    };
  }

  componentDidMount = () => {
    Font.loadAsync({
      'ostrich-sans-heavy': require('../../assets/Fonts/OstrichSans-Heavy.otf'),
    })
    .then(() => {
      this.setState({
        isFontLoaded: true,
      })
    });

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
        {/* #TO-DO : add sos button/functionality */}
      {/* #TO-DO : add update location option */}
        </View>
      );

    } else {
      return (
        <View style={styles.ActionView}>

            <TouchableHighlight style={{ flex: 1, width: '35%', height: 'auto'}} onPress = {() => this.props.navigation.navigate('HookUp')}>
              <Svg width="100%" height="100%" preserveAspectRatio="xMidYMax meet" viewBox="0 0 315 116">
                <G fillRule="nonzero" fill="none">
                  <Path d="M113.796 7.097c12.61 0 24.14 4.63 33.044 12.246l5.134 5.083a51.166 51.166 0 0 1 7.917 12.06l2.558 6.42a50.815 50.815 0 0 1 2.297 15.145h.028c0 2.927.382 5.757 1.035 8.49-4.522 2.17-8.869 4.434-13.099 6.652a50.815 50.815 0 0 1-2.297-15.145h-.027c0-2.927-.382-5.757-1.036-8.49a36.44 36.44 0 0 0-2.242-6.562 36.743 36.743 0 0 0-8.566-11.823 36.975 36.975 0 0 0-6.317-4.684c-5.42-3.177-11.706-5.03-18.43-5.03-11.567 0-21.88 5.408-28.59 13.817h-16.92c8.378-16.682 25.607-28.179 45.51-28.179zM56.043 56.511H14.32v.034c-3.959-.003-7.18-3.222-7.18-7.18 0-3.959 3.221-7.177 7.18-7.177v-.035h81.05c13.326 0 25.125-3.29 36.174-7.882a29.91 29.91 0 0 1 9.333 11.607c-13.387 5.942-28.26 10.63-45.503 10.63H56.043v.003zM156.9 94.964c-14.316 7.462-28.075 14.03-43.103 14.03-26.294 0-47.99-20.014-50.665-45.61h14.505c2.6 17.65 17.8 31.253 36.163 31.253 11.39 0 22.697-5.254 35.383-11.843 1.637-.846 3.284-1.713 4.966-2.593l1.124-.591c4.123-2.164 8.374-4.378 12.783-6.51 2.042-.987 4.123-1.95 6.23-2.889 13.385-5.942 28.261-10.63 45.504-10.63h11.214a29.466 29.466 0 0 1-4.577 14.358h-6.637c-13.326 0-25.124 3.294-36.174 7.878a172.697 172.697 0 0 0-6.998 3.102c-4.563 2.143-9.023 4.44-13.428 6.75l-6.29 3.295zm92.846-21.022l-2.868 6.878c-8.38 16.682-25.606 28.175-45.51 28.175-12.607 0-24.141-4.629-33.044-12.243 4.787-2.493 9.639-4.941 14.615-7.15 5.42 3.182 11.706 5.035 18.429 5.035 11.565 0 21.878-5.409 28.59-13.82a36.56 36.56 0 0 0 4.317-6.878 36.322 36.322 0 0 0 3.607-14.357c.02-.513.076-1.022.076-1.541 0-1.816-.18-3.587-.434-5.337-2.6-17.649-17.8-31.253-36.16-31.253-11.39 0-22.696 5.258-35.382 11.844-2.084-4.375-4.653-8.477-7.717-12.167 14.316-7.462 28.075-14.037 43.1-14.037 26.293 0 47.989 20.017 50.664 45.61l.21 6.877c-.151 5.007-1 9.825-2.493 14.364zm39.073 0h-31.896a57.481 57.481 0 0 0 2.197-14.357h29.702c-1.266 2.108-2.04 4.543-2.04 7.177 0 2.634.771 5.072 2.037 7.18zm12.018 0c-3.958 0-7.18-3.219-7.18-7.18 0-3.955 3.222-7.177 7.18-7.177 3.959 0 7.18 3.222 7.18 7.177a7.183 7.183 0 0 1-7.18 7.18z" fill="#FFF"/>
                  <Path d="M300.836 52.707h-41.91C256.22 23.32 231.45.22 201.367.22c-17.286 0-32.31 7.493-48.044 15.736C142.972 6.227 129.085.22 113.796.22c-23.804 0-44.279 14.464-53.138 35.052H14.32v.034C6.568 35.306.26 41.613.26 49.365c0 7.75 6.307 14.058 14.059 14.058v-.035h41.913c2.706 29.389 27.476 52.488 57.56 52.488 17.294 0 32.318-7.497 48.044-15.73 10.354 9.726 24.237 15.73 39.526 15.73 23.804 0 44.28-14.46 53.138-35.053h46.335c7.752 0 14.059-6.306 14.059-14.058 0-7.75-6.307-14.058-14.059-14.058zm-187.04-45.61c12.61 0 24.14 4.63 33.044 12.246l5.134 5.083a51.166 51.166 0 0 1 7.917 12.06l2.558 6.42a50.815 50.815 0 0 1 2.297 15.145h.028c0 2.927.382 5.757 1.035 8.49-4.522 2.17-8.869 4.434-13.099 6.652a50.815 50.815 0 0 1-2.297-15.145h-.027c0-2.927-.382-5.757-1.036-8.49a36.44 36.44 0 0 0-2.242-6.562 36.743 36.743 0 0 0-8.566-11.823 36.975 36.975 0 0 0-6.317-4.684c-5.42-3.177-11.706-5.03-18.43-5.03-11.567 0-21.88 5.408-28.59 13.817h-16.92c8.378-16.682 25.607-28.179 45.51-28.179zm32.776 69.304c-12.112 6.3-22.803 11.362-32.776 11.362-14.56 0-26.686-10.533-29.21-24.375h10.788c18.219 0 33.725-4.8 47.597-10.9.344 1.801.54 3.658.54 5.563h.028c-.004 6.417 1.09 12.573 3.033 18.35zm-23.065-46.404c-8.793 3.164-18.057 5.279-28.137 5.279h-.629c5.162-4.327 11.806-6.94 19.051-6.94 3.408-.004 6.665.602 9.715 1.66zM56.043 56.51H14.32v.034c-3.959-.003-7.18-3.222-7.18-7.18 0-3.959 3.221-7.177 7.18-7.177v-.035h81.05c13.326 0 25.125-3.29 36.174-7.882a29.91 29.91 0 0 1 9.333 11.607c-13.387 5.942-28.26 10.63-45.503 10.63H56.043v.003zM156.9 94.964c-14.316 7.462-28.075 14.03-43.103 14.03-26.294 0-47.99-20.014-50.665-45.61h14.505c2.6 17.65 17.8 31.253 36.163 31.253 11.39 0 22.697-5.254 35.383-11.843 1.637-.846 3.284-1.713 4.966-2.593l1.124-.591c4.123-2.164 8.374-4.378 12.783-6.51 2.042-.987 4.123-1.95 6.23-2.889 13.385-5.942 28.261-10.63 45.504-10.63h11.214a29.466 29.466 0 0 1-4.577 14.358h-6.637c-13.326 0-25.124 3.294-36.174 7.878a172.697 172.697 0 0 0-6.998 3.102c-4.563 2.143-9.023 4.44-13.428 6.75l-6.29 3.295zm11.689-55.27c12.111-6.3 22.803-11.362 32.775-11.362 14.56 0 26.683 10.534 29.207 24.375h-10.784c-18.223 0-33.726 4.797-47.598 10.901a29.637 29.637 0 0 1-.54-5.564h-.027c.003-6.417-1.09-12.572-3.033-18.35zm51.83 41.126c-5.161 4.326-11.805 6.943-19.051 6.943-3.405 0-6.665-.605-9.711-1.66 8.793-3.165 18.057-5.28 28.136-5.28h.626v-.003zm29.327-6.878l-2.868 6.878c-8.38 16.682-25.606 28.175-45.51 28.175-12.607 0-24.141-4.629-33.044-12.243 4.787-2.493 9.639-4.941 14.615-7.15 5.42 3.182 11.706 5.035 18.429 5.035 11.565 0 21.878-5.409 28.59-13.82a36.56 36.56 0 0 0 4.317-6.878 36.322 36.322 0 0 0 3.607-14.357c.02-.513.076-1.022.076-1.541 0-1.816-.18-3.587-.434-5.337-2.6-17.649-17.8-31.253-36.16-31.253-11.39 0-22.696 5.258-35.382 11.844-2.084-4.375-4.653-8.477-7.717-12.167 14.316-7.462 28.075-14.037 43.1-14.037 26.293 0 47.989 20.017 50.664 45.61l.21 6.877c-.151 5.007-1 9.825-2.493 14.364zm39.073 0h-31.896a57.481 57.481 0 0 0 2.197-14.357h29.702c-1.266 2.108-2.04 4.543-2.04 7.177 0 2.634.771 5.072 2.037 7.18zm12.018 0c-3.958 0-7.18-3.219-7.18-7.18 0-3.955 3.222-7.177 7.18-7.177 3.959 0 7.18 3.222 7.18 7.177a7.183 7.183 0 0 1-7.18 7.18z" fill="#362950"/>
                </G>
              </Svg>
            </TouchableHighlight>

            <Text
              title="Meet Someone"
              style={[styles.ActionChoices, {
                fontFamily: this.state.isFontLoaded ? 'ostrich-sans-heavy' : null
              }]}
              onPress = {() => this.props.navigation.navigate('HookUp')}
            >
              Meet Someone
            </Text>
        </View>
      );

    }
  }

  render() {

    return (
      <SafeAreaView style={{flex: 1 }}>
        { this.renderBackground() }

        {/* # TO-DO: Onboarding? */}
        {/* # TO-DO: If no contacts only show an add contact button */}
        {/* # TO-DO: Support */}
        {/* # TO-DO: Ads -> Subscription */}

        <TouchableHighlight style={{height: '4%', width: 'auto', marginRight: 10, marginBottom: 30}} onPress={this.__signOut}>
          <Svg width="100%" height="100%" preserveAspectRatio="xMaxYMax meet" viewBox="0 0 56 56">
            <G fill="#FFF" fillRule="nonzero">
              <Path d="M25.682 55.31a7.78 7.78 0 0 0 7.78-7.78v-7.164a2.593 2.593 0 0 0-5.187 0v7.164a2.593 2.593 0 0 1-2.593 2.593H8.18a2.593 2.593 0 0 1-2.593-2.593V8.633A2.593 2.593 0 0 1 8.179 6.04h17.503a2.593 2.593 0 0 1 2.593 2.593v7.26a2.593 2.593 0 0 0 5.187 0v-7.26a7.78 7.78 0 0 0-7.78-7.78H8.18a7.78 7.78 0 0 0-7.78 7.78V47.53a7.78 7.78 0 0 0 7.78 7.78h17.503z"/>
              <Path d="M54.22 26.137L40.606 12.523a2.595 2.595 0 0 0-3.67 3.669l9.303 9.296H17.255a2.593 2.593 0 0 0 0 5.187h28.984l-9.328 9.322a2.593 2.593 0 1 0 3.669 3.643l13.614-13.614a2.593 2.593 0 0 0 0-3.89h.026z"/>
            </G>
          </Svg>
        </TouchableHighlight>

        { this.renderHookingUp() }

        <View style={styles.ActionView}>
          <TouchableHighlight style={{flex: 1, width: '18%', height: 'auto'}} onPress = {() => this.props.navigation.navigate('ManageFriends')}>
            <Svg width="100%" height="100%" preserveAspectRatio="xMidYMax meet" viewBox="0 0 158 173">
                <G fillRule="nonzero" fill="none">
                    <Path d="M90.453 19.678c4.532-9.286 13.32-15.053 22.938-15.053H123.6c14.338 0 26.004 12.767 26.004 28.46v15.141h-7.575V33.872c0-11.223-8.344-20.353-18.598-20.353h-8.59c-9.62 0-15.658 3.962-20.206 13.281L85.39 46.566l-5.253-5.75 10.315-21.138zm10.665 99.23c7.851-8.592 7.851-22.573 0-31.164l-6.306-6.903 5.357-5.862 7.818 8.554c10.14 11.097 10.14 29.153 0 40.25l-5.29 5.788c-.01.011-.012.027-.022.038H91.34l9.778-10.701zM70.939 37.54c.395 0 .787.165 1.087.49l27.08 29.643c.29.316.45.737.45 1.185 0 .448-.16.871-.45 1.189l-8.9 9.74c-.6.654-1.572.656-2.171.002L60.954 50.147a1.74 1.74 0 0 1-.45-1.184c0-.449.16-.872.45-1.19l8.901-9.741c.3-.326.692-.49 1.084-.49zm3.353 123.119c-4.816 5.27-11.058 8.016-17.714 7.69-6.517-.305-12.868-3.497-17.882-8.982l-2.847-3.114a114.99 114.99 0 0 0-1.66-1.774c-2.596-2.731-5.048-5.313-6.013-8.791L5.077 62.46c-2.793-10.074-.306-20.954 6.494-28.397l7.22-7.9c10.137-11.096 26.634-11.1 36.776 0l9.783 10.706-5.358 5.863-9.274-10.15c-3.512-3.844-8.182-5.96-13.15-5.96s-9.638 2.116-13.15 5.96l-6.075 6.65c-6.804 7.443-8.513 14.92-5.705 25.028l21.121 71.592c1.087 3.922 3.063 7.529 5.716 10.434l5.42 5.932c3.443 3.768 8.023 5.845 12.892 5.845 4.872 0 9.452-2.077 12.895-5.845l4.8-5.255c.159.003.31.026.47.026h10.831l-12.49 13.67zm49.308-17.98H75.95c-13.875 0-24.337-12.236-24.337-28.46v-4.406c0-.85-.015-1.698-.029-2.54-.07-3.941-.136-7.663 1.427-10.87L68.55 64.558l5.572 6.1-10.806 23.114c-1.767 3.619-2.7 7.699-2.7 11.8v8.389c0 11.004 8.18 19.957 18.234 19.957h43.043c11.103 0 20.135-9.887 20.135-22.038v-9.76h7.575v12.1c0 15.692-11.666 28.46-26.004 28.46zm29.974-46.55c0 .928-.688 1.682-1.534 1.682H139.45c-.846 0-1.534-.754-1.534-1.681V54.214c0-.925.688-1.679 1.534-1.679h12.589c.846 0 1.534.754 1.534 1.68V96.13z" fill="#FFF"/>
                    <Path d="M153.541 48.484v-15.4c0-18.07-13.43-32.769-29.941-32.769H113.39c-11.074 0-21.194 6.641-26.41 17.334L77.23 37.632l-2.42-2.65c-1.763-1.925-4.431-2.235-6.51-.977l-9.95-10.89c-11.673-12.778-30.67-12.773-42.343 0l-7.22 7.902C.957 39.585-1.908 52.112 1.31 63.712l23.1 83.23c1.262 4.552 4.204 7.65 7.05 10.643.535.566 1.076 1.135 1.606 1.715l2.848 3.114c5.712 6.252 12.99 9.89 20.498 10.243.396.017.794.028 1.19.028 7.282 0 14.16-3.16 19.475-8.979l15.117-16.544c.047-.051.064-.118.105-.173H123.6c16.51 0 29.941-14.7 29.941-32.77v-12.356c2.284-.72 3.97-3.003 3.97-5.732V54.214c0-2.727-1.686-5.01-3.97-5.73zM90.453 19.678c4.532-9.286 13.32-15.053 22.938-15.053H123.6c14.338 0 26.004 12.767 26.004 28.46v15.141h-7.575V33.872c0-11.223-8.344-20.353-18.598-20.353h-8.59c-9.62 0-15.658 3.962-20.206 13.281L85.39 46.566l-5.253-5.75 10.315-21.138zm47.639 82.233v9.969c0 9.776-7.265 17.73-16.198 17.73h-13.663l2.54-2.78c11.673-12.777 11.673-33.567 0-46.344l-7.984-8.735a6.37 6.37 0 0 0 .707-2.892c0-1.599-.57-3.103-1.604-4.233L88.32 49.77l9.805-20.973c3.803-7.792 8.646-10.969 16.717-10.969h8.59c8.084 0 14.66 7.198 14.66 16.044v14.564c-2.356.666-4.111 2.994-4.111 5.778v41.917c0 2.786 1.755 5.114 4.112 5.78zM85.25 82.837c1.065 1.168 2.466 1.75 3.868 1.75.964 0 1.92-.296 2.774-.847l6.44 7.05c6.316 6.912 6.316 18.159 0 25.07l-12.561 13.75H78.85c-7.883 0-14.296-7.02-14.296-15.65v-8.388c0-3.396.773-6.776 2.25-9.803l10.246-21.907 8.2 8.975zm15.867 36.07c7.851-8.59 7.851-22.572 0-31.163l-6.306-6.903 5.357-5.862 7.818 8.554c10.14 11.097 10.14 29.153 0 40.25l-5.29 5.788c-.01.011-.012.027-.022.038H91.34l9.778-10.701zM70.939 37.542c.395 0 .787.165 1.087.49l27.08 29.643c.29.316.45.737.45 1.185 0 .448-.16.871-.45 1.189l-8.9 9.74c-.6.654-1.572.656-2.171.002L60.954 50.147a1.74 1.74 0 0 1-.45-1.184c0-.449.16-.872.45-1.19l8.901-9.741c.3-.326.692-.49 1.084-.49zm-23.291 69.815c.013.816.029 1.635.029 2.458v4.406c0 16.477 9.461 29.365 22.752 32.18l-2.531 2.771c-2.701 2.954-6.29 4.583-10.11 4.583-3.819 0-7.408-1.629-10.11-4.583l-5.42-5.931c-2.195-2.405-3.83-5.393-4.742-8.676L16.395 62.97c-2.347-8.45-.977-14.445 4.731-20.692l6.076-6.65c2.768-3.03 6.45-4.698 10.366-4.698 3.916 0 7.598 1.669 10.366 4.699l9.41 10.298a6.36 6.36 0 0 0-.778 3.036c0 1.599.57 3.103 1.604 4.233l7.473 8.179-16.103 33c-2.048 4.198-1.97 8.663-1.892 12.981zm26.644 53.304c-4.816 5.27-11.058 8.016-17.714 7.69-6.517-.305-12.868-3.497-17.882-8.982l-2.847-3.114a114.99 114.99 0 0 0-1.66-1.774c-2.596-2.731-5.048-5.313-6.013-8.791L5.077 62.46c-2.793-10.074-.306-20.954 6.494-28.397l7.22-7.9c10.137-11.096 26.634-11.1 36.776 0l9.783 10.706-5.358 5.863-9.274-10.15c-3.512-3.844-8.182-5.96-13.15-5.96s-9.638 2.116-13.15 5.96l-6.075 6.65c-6.804 7.443-8.513 14.92-5.705 25.028l21.121 71.592c1.087 3.922 3.063 7.529 5.716 10.434l5.42 5.932c3.443 3.768 8.023 5.845 12.892 5.845 4.872 0 9.452-2.077 12.895-5.845l4.8-5.255c.159.003.31.026.47.026h10.831l-12.49 13.67zm49.308-17.98H75.95c-13.875 0-24.337-12.236-24.337-28.46v-4.406c0-.85-.015-1.698-.029-2.54-.07-3.941-.136-7.663 1.427-10.87L68.55 64.558l5.572 6.1-10.806 23.114c-1.767 3.619-2.7 7.699-2.7 11.8v8.389c0 11.004 8.18 19.957 18.234 19.957h43.043c11.103 0 20.135-9.887 20.135-22.038v-9.76h7.575v12.1c0 15.692-11.666 28.46-26.004 28.46zm29.974-46.55c0 .928-.688 1.682-1.534 1.682H139.45c-.846 0-1.534-.754-1.534-1.681V54.214c0-.925.688-1.679 1.534-1.679h12.589c.846 0 1.534.754 1.534 1.68V96.13z" fill="#362950"/>
                </G>
            </Svg>
          </TouchableHighlight>

          <Text
            title="Manage Contacts"
            style={[styles.ActionChoices, {
              fontFamily: this.state.isFontLoaded ? 'ostrich-sans-heavy' : null
            }]}
            onPress = {() => this.props.navigation.navigate('ManageFriends')}
          >
            Manage Contacts
          </Text>
        </View>

        <View style={{flex: 1}}></View>

      
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
    height: '125%',
    top: '78%',
  },
  ActionView: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  ActionChoices: {
    fontSize: 42,
    color: '#FFF',
    flex: 1,
    marginTop: 20,
    alignItems: 'flex-start',
  }
});
