import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { getColor } from '../../Utils/Utils';

export default class ManageFriendsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      friends: [],
    };
  }

  componentDidMount = () => {
    this.getFriends();
  }

  getFriends = () => {
    //# TODO: this should pull from a database and/or api
    let friendsDeets = [{ name: 'Madison', phone: '864-918-5276', uuid: '00001'}, { name: 'Jeff', phone: '864-918-5276', uuid: '00002'}];

    this.setState({friends: friendsDeets});
  }

  renderFriends = () => {
    let friends = this.state.friends.map((friend, i) => {

      return (
        <TouchableHighlight key={i} underlayColor="purple" onPress = {() => this.props.navigation.navigate('AddEditFriends', { screenMode: 'edit', uuid: friend.uuid })}>
          <View style={[styles.button, {backgroundColor: getColor(friend.name)}]}>
            <Text>{friend.name.substr(0,1)}</Text>
          </View>
        </TouchableHighlight>
      )
    });

    return friends
  }

  render() {
    return (
      <View style={{flex: 1 }}>
      <Text>Friends:</Text>
        {/*  # TODO: + button should be a primary style */}

    		{ this.renderFriends() }

    		<Text>Add A Friend:</Text>
    		<TouchableHighlight underlayColor="purple" onPress = {() => this.props.navigation.navigate('AddEditFriends', { screenMode: 'add' })}>
    			<View style={styles.button}>
    				<Text>+</Text>
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