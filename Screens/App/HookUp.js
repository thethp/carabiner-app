import React, { Component } from 'react';
import { Button, Picker, Text, TextInput, ScrollView } from 'react-native';
import { getContacts, startHookupTimer } from '../../Utils/Utils';

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

  componentWillMount = () => {
    getContacts((_contacts) => {
      this.setState({contacts: _contacts});
    })
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
      <ScrollView style={{flex: 1 }}>
        <Text>Nice! Where'd you meet?</Text>
        <TextInput
          placeholder='Grindr, Growlr, a bar, etc...'
          value={this.state.hookup.meetingPlace}
          name='meetingPlace'
          onChangeText={(text) => this.updateHookup({'meetingPlace': text})}
        />

        <Text>What was their name/username?</Text>
        <TextInput
          placeholder='forsureatop6969'
          value={this.state.hookup.username}
          name='username'
          onChangeText={(text) => this.updateHookup({'username': text})}
        />

        <Text>Where are you going to be?</Text>
        {/* # TO-DO: Add the option of using your geolocation */}
        {/* # TO-DO: Tie in with google maps autocomplete or similar */}
        <TextInput
          placeholder='1313 Webfoot Walk, Duckburg, Calisota'
          value={this.state.hookup.hookupLocation}
          name='hookupLocation'
          onChangeText={(text) => this.updateHookup({'hookupLocation': text})}
        />

        <Text>Optional- whats their phone number?</Text>
        {/* # TO-DO: Add the option of using your geolocation */}
        {/* # TO-DO: Tie in with google maps autocomplete or similar */}
        <TextInput
          placeholder='525-600-6468'
          value={this.state.hookup.phoneNumber}
          name='phoneNumber'
          onChangeText={(text) => this.updateHookup({'phoneNumber': text})}
        />

        <Text>We will check in with you after a designated amount of hours to make sure you're ok. When should we do our first check-in?</Text>
        <Picker 
          selectedValue={this.state.hookup.checkInTime}
          name='checkInTime'
          onValueChange={(itemValue, itemIndex) => this.updateHookup({'checkInTime': itemValue})} 
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

        <Text>You will have 8 hours to respond to our check-in.  After this time, we will text a contact the above information.  Who should we text?</Text>
        {/* # TO-DO: Make this fill in with real data from a list of contacts */}
        {/* # TO-DO: Only show this as an input if there's more than one contact */}
        <Picker 
          selectedValue={this.state.hookup.contact}
          name='contact'
          onValueChange={(itemValue, itemIndex) => this.updateHookup({'contact': itemValue})} 
        >
          { this.renderPickerOptions() }
        </Picker>

        <Button
          title="Let's do this"
          style={{margintop: 10}}
          onPress={this.__onPressSubmit}
        />
      </ScrollView>
    );
  }
}