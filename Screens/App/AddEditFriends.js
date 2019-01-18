import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { addEditContact, getContact } from '../../Utils/Utils';

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

  getContact = (_uuid) => {
    //# TODO: format phone number prettily
    //# TODO: should there be a loading screen here/on other loading pages?
    getContact(_uuid, (_response) => {
      if(_response.success) {
        this.setState({friend: _response.contact});
      } else {
        //# TO-DO : Show user something went wrong?
      }
    });
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
    //#TO-DO: validate phone number
    //#TO-DO: format phone number as just digits
    //#TO-DO: Send text to person to have them confirm their status as a contact
    //#TO-DO : on confirmation of the above, mark them as confirmed
    //#TO-DO : validate fields arent empty

    addEditContact(this.state.friend, this.addEditContactCallback);
  }

  addEditContactCallback = (_isSuccessful, _message='') => {
    if(_isSuccessful) {
      console.log('Contact added and/or updated.');
      this.props.navigation.navigate('ManageFriends');

    } else {
      //# TODO : make this show to user too
      console.log('There was an error updating your contacts: ' + _message);

    }
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