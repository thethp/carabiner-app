import React, { Component } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default class LogInSignUp extends React.Component {

	constructor(props) {
  	super(props);

  	this.state = {
  	  login: {
        email:  '',
        password: '',
      },
      login: true,
      firstLaunch: this.props.navigation.getParam('firstLaunch,')
  	};
  }

  // # TO-DO : Update this page to be login and signup
  // # TO-DO : Use prop passed to show signup v
  // # TO-DO : show signup if first login, then go to add contact https://stackoverflow.com/questions/40715266/how-to-detect-first-launch-in-react-native
  updateLogin = (key, data) => {
    this.setState({
      login: {
        ...this.state.login,
        [key]: data
      }
    });
  }

  // # TO-DO : Make a create function for signup
  // # TO-DO : signup goes to contact creation
  loginToApp = async () => {
    //# TO-DO : Actually check with server to see if information is correct
    //# TO-DO : get user token from server
    //# TO-DO : Figure out how to give users individual tokens
    //# TO-DO : Should tokens time out? How does that work
    await AsyncStorage.setItem('userToken', 'itstillertime');
    //# TO-DO : Make the code below work
    //await AsyncStorage.setItem('firstLaunch', false);

    this.props.navigation.navigate('App');
  }

  render() {
  	return (
  	  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign-In</Text>

        <Text>Email</Text>
        <TextInput
          placeholder='pierre@thegreatcomet.com'
          value={this.state.login.email}
          name='email'
          onChangeText={(text) => this.updateLogin('email', text)}
        />

        <Text>Password</Text>
        <TextInput
          placeholder='tacoisabadpassword'
          value={this.state.login.password}
          name='password'
          secureTextEntry={true}
          onChangeText={(text) => this.updateLogin('password', text)}
        />

        {/*  # TODO: button should be a primary style */}
        <TouchableHighlight onPress={this.loginToApp}>
          <View style={styles.button}>
            <Text>Login</Text>
          </View>
        </TouchableHighlight>

        <Button
          title="Forgot My Password"
          onPress = {() => this.props.navigation.navigate('ForgotMyPassword')}
        />

  	  </View>
  	);
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'pink',
    fontSize: 20,
    borderRadius: 100,
    width: 'auto'
  }
});