import React, { Component } from 'react';
import { AsyncStorage, Button, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Font, LinearGradient } from 'expo';
import { authUser, moderateScale, scale, verticalScale } from '../../Utils/Utils';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default class LogInSignUp extends React.Component {

	constructor(props) {
  	super(props);

  	this.state = {
  	  login: {
        username:  '',
        password: '',
        confirm_password: '',
      },
      isFontLoaded: false,
      loginState: true,
  	};
  }

  componentWillMount = () => {
    Font.loadAsync({
      'ostrich-sans-rounded': require('../../assets/Fonts/OstrichSansRounded-Medium.otf'),
      'ostrich-sans-heavy': require('../../assets/Fonts/OstrichSans-Heavy.otf'),
      'league-mono-light': require('../../assets/Fonts/LeagueMono-Light.otf')
    })
    .then(() => {
      this.setState({
        isFontLoaded: true,
      })
    });
  }

  // # TO-DO : Update this page to be login and signup
  // # TO-DO : Use prop passed to show signup v
  updateLogin = (key, data) => {
    this.setState({
      login: {
        ...this.state.login,
        [key]: data
      }
    });
  }

  loginRegister = () => {
    if(this.state.loginState) {
      //validate email
      authUser("login", this.state.login.username, this.state.login.password, this.signInCallback);
    } else {
      //# TO-DO : validate email
      //#TO-DO : validate fields arent empty
      if(this.state.login.confirm_password == this.state.login.password) {
        authUser("registration", this.state.login.username, this.state.login.password, this.signInCallback);
      } else {
        //#TO-DO: something cute and simple to show it didn't work and why
      }
    }
  }

  signInCallback = (_isSuccessful, _message='') => {
    //# TO-DO : If registration, go to new user stuff, maybe use a token

    if(_isSuccessful) {
      console.log('User added and/or signed in');
      this.props.navigation.navigate('App');
    } else {
      //# TODO : make this show to user too
      console.log('There was an error with registration: ' + _message);
    }
  }

  renderBackground = () => {

    //# TO-DO : animate this nicely
    //# TO-DO : intro animation, mountains come up?
    //# TO-DO : make mountains svg
    //# TO-DO : make sun svg
    //# TO-DO : make new icon/loading screen

    return (
      <LinearGradient
        colors={['#3b5998', '#3b5998', '#FFF', '#FFF']}
        locations={[0,.7,.7,1]}
        style={styles.BackgroundView}
      >
        <Image 
          style={[styles.SkyGradient, {
            left: this.state.loginState ? '0%' : '-100%', 
          }]} 
          source={require('../../assets/SkyGradient.png')} 
        />
        <Image 
          style={[styles.Sun, {
            left: this.state.loginState ? '62%' : '-28%'
          }]} 
          source={require('../../assets/Sun.png')} 
        />
        <View style={styles.CarabinerHolder}>
          <Image 
            style={styles.Carabiner} 
            source={require('../../assets/Carabiner.png')} 
          />
          <Text 
            style={{
              fontFamily: this.state.isFontLoaded ? 'ostrich-sans-rounded' : null,
              color: 'white',
              fontSize: 50,
            }}
          >
          Carabiner
          </Text>
        </View>
        <Image style={styles.MountainRange} source={require('../../assets/MountainRange.png')} />
      </LinearGradient>
    );
  }

  renderActions = () => {
    return (
      <View style={styles.ActionContainer}>
        <Text
          title="Login"
          style={[styles.ActionChoices, {
            fontFamily: this.state.isFontLoaded ? 'ostrich-sans-heavy' : null,
            opacity: this.state.loginState ? 1 : .7,
            textDecorationLine: this.state.loginState ? 'underline' : 'none',
          }]}
          onPress={() => this.setState({loginState: true})}
        >
        Login
        </Text>

        <Text
          title="Register"
          style={[styles.ActionChoices, {
            left: '15%',
            fontFamily: this.state.isFontLoaded ? 'ostrich-sans-heavy' : null,
            opacity: this.state.loginState ? .7 : 1,
            textDecorationLine: this.state.loginState ? 'none' : 'underline',
          }]}
          onPress={() => this.setState({loginState: false})}
        >
        SignUp
        </Text>
      </View>
    );
  }

  renderLoginSignUpSpecificCode = () => {
    const isValid = (this.state.login.confirm_password == this.state.login.password);

    if(this.state.loginState) {
      return (
        <Text
          style={{
            fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null,
            textAlign: 'center',
            marginTop: 10,
          }}
          title="Forgot My Password"
          onPress = {() => this.props.navigation.navigate('ForgotMyPassword')}
        >
        Forgot My Password
        </Text>
      );
    } else {
      return (
        <TextInput
          placeholder='Confirm Password'
          value={this.state.login.confirm_password}
          name='confirm_password'
          secureTextEntry={true}
          autoCapitalize='none'
          style={[styles.Input, {
            fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null,
            borderBottomColor: isValid ? '#D8D8D8' : 'red',
          }]}
          onChangeText={(text) => this.updateLogin('confirm_password', text)}
        />
      );
    }
  }

  render() {
  	return (
  	  <KeyboardAvoidingView behavior='padding' style={{flex: 1, position: 'relative', alignItems: 'center' }}>
        { this.renderBackground() }

        { this.renderActions() }

        <View style={{top: '62%', width: '66%'}}>
          <TextInput
            placeholder='E-mail'
            value={this.state.login.username}
            name='username'
            autoCapitalize='none'
            style={[styles.Input, {
              fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null,
            }]}
            onChangeText={(text) => this.updateLogin('username', text)}
          />

          <TextInput
            placeholder='Password'
            value={this.state.login.password}
            name='password'
            secureTextEntry={true}
            autoCapitalize='none'
            style={[styles.Input, {
              fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null,
            }]}
            onChangeText={(text) => this.updateLogin('password', text)}
          />

          { this.renderLoginSignUpSpecificCode() }
        </View>

        <TouchableHighlight
          style={styles.SubmitButtonContainer}
          onPress={this.loginRegister}
        >
          <Image 
            style={styles.SubmitButton} 
            source={require('../../assets/SubmitButton.png')} 
          />
        </TouchableHighlight>

  	  </KeyboardAvoidingView>
  	);
  }
}

//# TO-DO : fonts/mountains/words adjusted if ipad/tablet ratio

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
  CarabinerHolder: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    top: '7%'
  },
  Carabiner: {
    width: scale(147),
    height: verticalScale(98),
    resizeMode: 'contain'
  },
  MountainRange: {
    width: '100%',
    height: '78%',
    top: '8%',
  },
  SkyGradient: {
    width: '203%',
    height: '59%',
    top: 0,
    position: 'absolute',
  },
  Sun: {
    width: '66%',
    height: '37%',
    top: '10%',
    position: 'absolute',
  },
  ActionContainer: {
    position: 'absolute',
    top: '41%',
    left: '5%',
  },
  ActionChoices: {
    fontSize: 42,
    color: '#362950'
  },
  Input: {
    borderBottomWidth: 2,
    borderBottomColor: '#D8D8D8',
    paddingBottom: 6,
    marginBottom: 20,
    width: '100%'
  },
  SubmitButtonContainer: {
    right: '6%',
    bottom: '4%',
    position: 'absolute',
  },
  SubmitButton: {
    width: scale(185),
    height: verticalScale(120),
    resizeMode: 'contain'
  },
});