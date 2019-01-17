import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default class AddEditFriendsScreen extends React.Component {

	constructor(props) {
  	super(props);

  	this.state = {
  	  friend: {
        name:  '',
        phone: '',
        uuid:  '',
        confirmed: false,
      },
      addingFriend: true,
  	};
  }

  componentDidMount = () => {
    if(this.props.navigation.getParam('screenMode') == 'edit') {
      this.setState({addingFriend: false});
      this.getContact(this.props.navigation.getParam('uuid'));

    } else if(this.props.navigation.getParam('screenMode') == 'add') {
      {/* #TO-DO: Does anything go here? */}
    }
  }

  getContact = (uuid) => {
    //# TODO: this should pull from a database and/or api based on the uuid
    let friendDeets = { name: 'Madison', phone: '864-918-5276', confirmed: true, uuid: '00001'};

    this.setState({friend: friendDeets});
  }

  updateContact = (key, data) => {
    this.setState({
      friend: {
        ...this.state.friend,
        [key]: data
      }
    });
  }

  submitContact = () => {
    //#TO-DO: If edit patch, if add post, api or local database, depending on what we're using
    //#TO-DO: validate phone number
    //#TO-DO: Send text to person to have them confirm their status as a contact
    this.props.navigation.navigate('ManageFriends');
  }

  renderConfirmedStatus = () => {
    if(this.state.addingFriend) {
      return (<Text>Pressing the button below will send a text to this person confirming they are ok with being a contact. They do not need this app to be a contact.</Text>);
    } else {
      return (<Text>Confirmed: {this.state.friend.confirmed}</Text>);
    }
  }

  render() {
  	return (
  	  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { this.state.addingFriend ?
            <Text>Add A New Friend</Text>
          :
            <Text>Edit A Friend</Text>
        }

        <Text>Name</Text>
        <TextInput
          placeholder='William Finn'
          value={this.state.friend.name}
          name='name'
          onChangeText={(text) => this.updateContact('name', text)}
        />

        <Text>Phone Number</Text>
        <TextInput
          placeholder='525-600-6468'
          value={this.state.friend.phone}
          name='name'
          onChangeText={(text) => this.updateContact('phone', text)}
        />

        { this.renderConfirmedStatus() }

        {/*  # TODO: + button should be a primary style */}
        <TouchableHighlight underlayColor="purple" onPress = {this.submitContact}>
            <View style={styles.button}>
              { this.state.addingFriend ?
                  <Text>Add Friend</Text>
                :
                  <Text>Edit Friend</Text>
              }
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