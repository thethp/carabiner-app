import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default class ForgotMyPassword extends React.Component {

	constructor(props) {
  	super(props);

  	this.state = {
  	  email: ''
  	};
  }

  //# TO-DO : Make recovery possible

  render() {
  	return (
  	  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Recover Your Password</Text>

        <Text>Email</Text>
        <TextInput
          placeholder='pierre@thegreatcomet.com'
          value={this.state.email}
          name='email'
          onChangeText={(text) => this.setState({email: text})}
        />

        <TouchableHighlight>
          <View style={styles.button}>
            <Text>Get Recovery</Text>
          </View>
        </TouchableHighlight>


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