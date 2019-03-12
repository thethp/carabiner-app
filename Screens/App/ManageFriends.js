import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Font, Svg } from 'expo';
import { renderFormBackground } from './Renderings';
import { getContacts, getColor } from '../../Utils/Utils';

const { Circle, Defs, G, Path, RadialGradient, Stop, Use } = Svg;

export default class ManageFriendsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      friends: [],
    };
  }

  componentWillMount = () => {
    //# TO-DO : this should be called even on the return to this page...
    //# TO-DO : Show any errors to user
    //# TO-DO : If 0 contacts, perhaps auto direct to add contact page, with a note

    Font.loadAsync({
      'ostrich-sans-heavy': require('../../assets/Fonts/OstrichSans-Heavy.otf')
    })
    .then(() => {
      this.setState({
        isFontLoaded: true,
      })
    });

    getContacts((_contacts) => {
      this.setState({friends: _contacts});
    });
  }

  renderFriends = () => {
    let friends = this.state.friends.map((friend, i) => {

      return (

        <View key={i} width="22%" height="17%">
          <TouchableHighlight onPress = {() => this.props.navigation.navigate('AddEditFriends', { screenMode: 'edit', uuid: friend.uuid })}>
            <Svg width="100%" height="100%" preserveAspectRatio="xMidYMin meet" viewBox="0 0 156 156">
              <G transform="translate(4.47 4)" fill="none" fillRule="evenodd">
                <Circle stroke="#362950" strokeWidth="8" fill={getColor(friend.name)} cx="73.464" cy="73.956" r="73.464"/>
                <Path d="M107.244 73.788l-67.56.008M73.464 40.34v67.232" stroke="#FFF" strokeWidth="5" strokeLinecap="round"/>
              </G>
            </Svg>
            <Text>{friend.name.substr(0,1)}</Text>
          </TouchableHighlight>
        </View>
      )
    });

    return friends;
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1 }}>

      { renderFormBackground() }

      <TouchableHighlight style={{height: '3%', width: 'auto', marginLeft: 5, marginBottom: 30}} onPress = {() => this.props.navigation.navigate('Home')}>
        <Svg width="100%" height="100%" preserveAspectRatio="xMinYMin meet" viewBox="0 0 45 54" >
          <Path d="M40.826 4.072L4 30.5l36.479 19.344L4 30.5z" stroke="#FFF" strokeWidth="7" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
      </TouchableHighlight>

      <View style={styles.TitleView}>
        <View style={{ flex: 1, width: '18%', height: 'auto', marginBottom: 15}}>
          <Svg width="100%" height="150%" preserveAspectRatio="xMidYMax meet" viewBox="0 0 159 173">
            <Defs>
                <RadialGradient cx="50%" cy="0%" fx="50%" fy="0%" r="250.611%" gradientTransform="matrix(0 .91373 -1.4713 0 .5 -.457)" id="b">
                    <Stop stopColor="#3A2DA0" offset="0%"/>
                    <Stop stopColor="#FFF" stopOpacity="0" offset="0%"/>
                    <Stop stopColor="#A52E9F" offset="100%"/>
                </RadialGradient>
                <Path d="M90.442 19.362c4.531-9.285 13.32-15.053 22.938-15.053h10.208c14.339 0 26.005 12.768 26.005 28.46v15.142h-7.575V33.556c0-11.223-8.344-20.353-18.599-20.353h-8.59c-9.62 0-15.657 3.962-20.206 13.281L85.38 46.25l-5.254-5.75 10.316-21.138zm10.664 99.23c7.852-8.591 7.852-22.573 0-31.164l-6.305-6.902 5.356-5.863 7.818 8.555c10.14 11.097 10.14 29.152 0 40.25l-5.289 5.788c-.01.011-.013.026-.023.038H91.328l9.778-10.702zM70.928 37.226c.394 0 .786.164 1.086.49L99.095 67.36c.29.316.45.736.45 1.185 0 .448-.16.87-.45 1.188l-8.901 9.74c-.6.655-1.571.657-2.17.003L60.941 49.832a1.74 1.74 0 0 1-.45-1.185c0-.448.16-.871.45-1.189l8.902-9.742c.3-.326.692-.49 1.084-.49zm3.353 123.118c-4.816 5.27-11.059 8.017-17.714 7.69-6.518-.304-12.868-3.496-17.882-8.982l-2.847-3.114a114.99 114.99 0 0 0-1.661-1.774c-2.596-2.73-5.047-5.313-6.012-8.79l-23.1-83.229C2.273 52.071 4.76 41.19 11.56 33.748l7.219-7.901c10.138-11.095 26.635-11.1 36.776 0l9.783 10.707-5.357 5.863-9.274-10.15c-3.513-3.845-8.183-5.961-13.15-5.961-4.968 0-9.638 2.116-13.15 5.96l-6.076 6.65c-6.804 7.444-8.513 14.92-5.704 25.028l21.12 71.593c1.087 3.922 3.064 7.528 5.717 10.434l5.42 5.931c3.443 3.769 8.022 5.846 12.892 5.846 4.872 0 9.451-2.077 12.894-5.846l4.801-5.254c.158.003.31.026.469.026h10.832l-12.491 13.67zm49.307-17.98H75.94c-13.875 0-24.337-12.235-24.337-28.46v-4.406c0-.85-.016-1.698-.03-2.54-.07-3.94-.136-7.663 1.427-10.87l15.54-31.845 5.572 6.1-10.807 23.113c-1.767 3.62-2.7 7.7-2.7 11.8v8.39c0 11.004 8.181 19.957 18.234 19.957h43.044c11.103 0 20.135-9.887 20.135-22.039v-9.759h7.575v12.1c0 15.692-11.666 28.46-26.005 28.46zm29.975-46.549c0 .928-.689 1.681-1.535 1.681H139.44c-.846 0-1.535-.753-1.535-1.68V53.898c0-.926.689-1.68 1.535-1.68h12.588c.846 0 1.535.754 1.535 1.68v41.916z" id="a"/>
            </Defs>
            <G fill="none" fillRule="evenodd">
                <G transform="translate(.773 .279)">
                    <Use fill="#9571DC" href="#a"/>
                    <Use fill="url(#b)" href="#a"/>
                </G>
                <Path d="M154.303 48.448v-15.4c0-18.07-13.431-32.77-29.942-32.77h-10.208c-11.074 0-21.195 6.642-26.41 17.335L77.99 37.595l-2.42-2.649c-1.763-1.926-4.43-2.236-6.51-.978l-9.949-10.889c-11.674-12.778-30.67-12.774-42.344 0l-7.22 7.901C1.719 39.548-1.145 52.076 2.07 63.676l23.1 83.23c1.263 4.551 4.204 7.649 7.05 10.643.536.566 1.076 1.134 1.607 1.715l2.847 3.114c5.712 6.251 12.99 9.89 20.498 10.243.396.016.794.027 1.19.027 7.283 0 14.16-3.16 19.476-8.978l15.117-16.545c.046-.05.063-.118.104-.172h31.302c16.511 0 29.942-14.7 29.942-32.77v-12.357c2.284-.72 3.97-3.003 3.97-5.732V54.178c0-2.728-1.686-5.01-3.97-5.73zM91.215 19.64c4.531-9.285 13.319-15.053 22.938-15.053h10.208c14.339 0 26.004 12.768 26.004 28.46V48.19h-7.574V33.835c0-11.223-8.344-20.353-18.599-20.353h-8.59c-9.62 0-15.657 3.962-20.206 13.281L86.153 46.53l-5.254-5.75L91.215 19.64zm47.638 82.234v9.968c0 9.776-7.265 17.73-16.197 17.73h-13.664l2.54-2.78c11.674-12.776 11.674-33.567 0-46.343l-7.983-8.736a6.37 6.37 0 0 0 .706-2.891c0-1.6-.569-3.104-1.603-4.234L89.08 49.733l9.806-20.973c3.802-7.791 8.645-10.969 16.716-10.969h8.59c8.084 0 14.661 7.199 14.661 16.044V48.4c-2.357.667-4.112 2.994-4.112 5.779v41.916c0 2.787 1.755 5.114 4.112 5.78zM86.013 82.8c1.064 1.168 2.466 1.75 3.867 1.75.964 0 1.92-.295 2.775-.847l6.44 7.05c6.316 6.913 6.316 18.16 0 25.071l-12.562 13.749h-6.92c-7.883 0-14.297-7.02-14.297-15.649v-8.389c0-3.396.773-6.775 2.251-9.803l10.245-21.907 8.2 8.975zm15.866 36.071c7.852-8.591 7.852-22.573 0-31.164l-6.305-6.902 5.356-5.863 7.818 8.555c10.14 11.097 10.14 29.152 0 40.25l-5.289 5.788c-.01.01-.013.026-.023.038H92.101l9.778-10.702zM71.701 37.505c.394 0 .786.164 1.086.49l27.081 29.643c.29.316.45.736.45 1.185 0 .448-.16.87-.45 1.188l-8.901 9.74c-.6.655-1.571.657-2.17.002L61.714 50.111a1.74 1.74 0 0 1-.45-1.185c0-.448.16-.871.45-1.189l8.902-9.742c.3-.326.692-.49 1.084-.49zm-23.292 69.814c.014.817.03 1.635.03 2.458v4.406c0 16.478 9.46 29.365 22.752 32.181l-2.532 2.77c-2.7 2.955-6.29 4.583-10.11 4.583-3.818 0-7.408-1.628-10.109-4.582l-5.42-5.932c-2.195-2.405-3.831-5.393-4.743-8.675l-21.12-71.595c-2.348-8.45-.977-14.445 4.73-20.692l6.076-6.649c2.769-3.03 6.45-4.698 10.366-4.698 3.917 0 7.598 1.668 10.367 4.698l9.409 10.298a6.36 6.36 0 0 0-.777 3.036c0 1.6.569 3.104 1.603 4.234l7.473 8.178L50.301 94.34c-2.047 4.198-1.969 8.663-1.892 12.98zm26.645 53.304c-4.816 5.27-11.059 8.017-17.715 7.69-6.517-.305-12.867-3.497-17.881-8.982l-2.847-3.114a114.99 114.99 0 0 0-1.661-1.774c-2.596-2.73-5.047-5.313-6.012-8.79l-23.1-83.229c-2.793-10.075-.305-20.955 6.495-28.397l7.219-7.901c10.137-11.095 26.635-11.1 36.776 0l9.783 10.707-5.357 5.863-9.274-10.15c-3.513-3.845-8.183-5.961-13.15-5.961-4.968 0-9.638 2.116-13.15 5.96l-6.076 6.65c-6.804 7.444-8.513 14.92-5.704 25.028l21.12 71.592c1.087 3.923 3.063 7.529 5.717 10.435l5.42 5.931c3.442 3.769 8.022 5.846 12.892 5.846 4.871 0 9.451-2.077 12.894-5.846l4.801-5.254c.158.003.31.026.469.026h10.832l-12.491 13.67zm49.307-17.98H76.713c-13.875 0-24.338-12.235-24.338-28.46v-4.406c0-.85-.015-1.698-.028-2.54-.071-3.94-.137-7.663 1.426-10.87l15.54-31.845 5.572 6.1-10.807 23.113c-1.767 3.62-2.7 7.7-2.7 11.8v8.39c0 11.004 8.181 19.957 18.234 19.957h43.044c11.103 0 20.135-9.887 20.135-22.039v-9.759h7.574v12.1c0 15.692-11.665 28.46-26.004 28.46zm29.975-46.549c0 .928-.689 1.681-1.535 1.681h-12.588c-.846 0-1.535-.753-1.535-1.681V54.178c0-.926.689-1.68 1.535-1.68H152.8c.846 0 1.535.754 1.535 1.68v41.916z" fill="#362950" fillRule="nonzero"/>
            </G>
          </Svg>
        </View>

        <Text
          title="Manage Contacts"
          style={[styles.TitleText, {
            fontFamily: this.state.isFontLoaded ? 'ostrich-sans-heavy' : null
          }]}
        >
          Manage Contacts
        </Text>
      </View>
        {/*  # TODO: + button should be a primary style */}

    		{ this.renderFriends() }

        <View style={{flex: 1, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', paddingLeft: '7.5%', paddingRight: '7.5%'}}>
          
          <View width="22%" height="17%">
        		<TouchableHighlight onPress = {() => this.props.navigation.navigate('AddEditFriends', { screenMode: 'add' })}>
        			<Svg width="100%" height="100%" preserveAspectRatio="xMidYMin meet" viewBox="0 0 156 156">
                <G transform="translate(4.47 4)" fill="none" fillRule="evenodd">
                  <Circle stroke="#362950" strokeWidth="8" fill="#9571DC" cx="73.464" cy="73.956" r="73.464"/>
                  <Path d="M107.244 73.788l-67.56.008M73.464 40.34v67.232" stroke="#FFF" strokeWidth="5" strokeLinecap="round"/>
                </G>
              </Svg>
        		</TouchableHighlight>
          </View>

        </View>
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
    top: 10,
  },
  TitleView: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    height: '20%',
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
  button: {
    margin: 10,
    aspectRatio: 1,
    width: '16%',
    height: 'auto',
    backgroundColor: '#9571DC',
    borderWidth: 8,
    borderColor: '#362950',
    borderRadius: 100,
  }
});