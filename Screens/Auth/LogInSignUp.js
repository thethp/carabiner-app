import React, { Component } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { authUser } from '../../Utils/Utils';

export default class LogInSignUp extends React.Component {

	constructor(props) {
  	super(props);

  	this.state = {
  	  login: {
        username:  '',
        password: '',
        confirm_password: '',
      },
      loginState: true,
  	};
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

  renderLoginSignUpSpecificCode = () => {
    const confirmStyle = (this.state.login.confirm_password == this.state.login.password) ? styles.default : styles.error;
    //#TODO : why isnt this working?

    if(this.state.loginState) {
      return (
        // # TODO: button should be a primary style
        <TouchableHighlight onPress={this.loginToApp}>
          <View style={styles.button}>
            <Text>Login</Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <View>
          <Text>Password</Text>
          <TextInput
            placeholder='tacoisabadpassword'
            value={this.state.login.confirm_password}
            name='confirm_password'
            secureTextEntry={true}
            autoCapitalize='none'
            style={confirmStyle}
            onChangeText={(text) => this.updateLogin('confirm_password', text)}
          />

          <TouchableHighlight onPress={this.registerWithApp}>
            <View style={styles.button}>
              <Text>Register</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

  loginToApp = () => {

  }

  registerWithApp = () => {
    if(this.state.login.confirm_password == this.state.login.password) {
      authUser("registration", this.state.login.username,this.state.login.password,this.registerCallback);
    } else {
      //#TO-DO: something cute and simple to show it wont work
    }
  }

  registerCallback = (_error) => {
    //# TODO : make this show to user too
    console.error('There was an error with registration: ' + _error);
  }

  render() {
  	return (
  	  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome</Text>

        <Button
          title="Login"
          disabled={this.state.loginState}
          onPress={() => this.setState({loginState: true})}
        />

        <Button
          title="Register"
          disabled={!this.state.loginState}
          onPress={() => this.setState({loginState: false})}
        />

        <Text>E-Mail</Text>
        <TextInput
          placeholder='pierre@thegreatcomet.com'
          value={this.state.login.username}
          name='username'
          autoCapitalize='none'
          onChangeText={(text) => this.updateLogin('username', text)}
        />

        <Text>Password</Text>
        <TextInput
          placeholder='tacoisabadpassword'
          value={this.state.login.password}
          name='password'
          secureTextEntry={true}
          autoCapitalize='none'
          onChangeText={(text) => this.updateLogin('password', text)}
        />

        { this.renderLoginSignUpSpecificCode() }

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
  },
  error: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    color: 'red',
  },
  default: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    color: 'black',
  }
});