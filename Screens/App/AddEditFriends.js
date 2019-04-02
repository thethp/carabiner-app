import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Font, Svg } from 'expo';
import { renderFormBackground } from './Renderings';
import { addEditContact, getContact, scale, sendMessage, verticalScale } from '../../Utils/Utils';

const { Defs, G, Path, RadialGradient, Stop, Use } = Svg;

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

  componentWillMount = () => {

    Font.loadAsync({
      'ostrich-sans-heavy': require('../../assets/Fonts/OstrichSans-Heavy.otf'),
      'league-mono-light': require('../../assets/Fonts/LeagueMono-Light.otf'),
      'league-mono-medium': require('../../assets/Fonts/LeagueMono-Medium.otf')
    })
    .then(() => {
      this.setState({
        isFontLoaded: true,
      })
    });

    if(this.props.navigation.getParam('screenMode') == 'edit') {
      this.setState({addingFriend: false});
      //# TODO: format phone number prettily
      //# TODO: should there be a loading screen here/on other loading pages?
      getContact(this.props.navigation.getParam('uuid'), (_response) => {
        if(_response.success) {
          this.setState({friend: _response.contact});
        } else {
          //# TO-DO : Show user something went wrong?
        }
      });

    } else if(this.props.navigation.getParam('screenMode') == 'add') {
      {/* #TO-DO: Does anything go here? */}
    }
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
    //#TO-DO: validate phone number [needs area code]
    //#TO-DO: do we need a country code?
    //#TO-DO: format phone number as just digits
    //#TO-DO: Send text to person to have them confirm their status as a contact
    //#TO-DO : on confirmation of the above, mark them as confirmed
    //#TO-DO : validate fields arent empty
    sendMessage();
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

  render() {
  	return (
  	  <SafeAreaView style={{flex: 1}}>

        { renderFormBackground() }
        <TouchableHighlight style={{height: '3%', width: 'auto', marginLeft: 10, marginBottom: 30}} onPress = {() => this.props.navigation.navigate('ManageFriends')}>
          <Svg width="100%" height="100%" preserveAspectRatio="xMinYMin meet" viewBox="0 0 45 54" >
            <Path d="M40.826 4.072L4 30.5l36.479 19.344L4 30.5z" stroke="#FFF" strokeWidth="7" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableHighlight>

        <View style={styles.TitleView}>
          <View style={{ flex: 1, width: '40%', height: 'auto'}}>
            <Svg width="100%" height="100%" preserveAspectRatio="xMidYMax meet" viewBox="0 0 332 117">
              <Defs>
                <RadialGradient cx="50%" cy="0%" fx="50%" fy="0%" r="250.911%" gradientTransform="matrix(0 1 -1.4713 0 .5 -.5)" id="b">
                  <Stop stopColor="#3A2DA0" offset="0%"/>
                  <Stop stopColor="#FFF" stopOpacity="0" offset="0%"/>
                  <Stop stopColor="#A52E9F" offset="100%"/>
                </RadialGradient>
                <Path d="M161.426 77.418l3.664 3.664-10.557 10.555c-.17.173-.326.351-.482.533-1.009.544-2.35.41-3.183-.426a2.647 2.647 0 0 1-.78-1.887c0-.714.279-1.383.78-1.888l10.558-10.551zm-68.31 34.562l26.035-26.031 12.422 12.422-26.034 26.034-12.422-12.425zm69.84-11.92c-1.003 1.006-2.763 1.009-3.772 0a2.647 2.647 0 0 1-.78-1.888c0-.456.125-.89.34-1.278.185-.161.375-.323.55-.501l10.555-10.555 3.667 3.665-10.56 10.557zm-29.781-22.85c5.03-5.03 10.96-7.688 17.15-7.688 2.247 0 4.341.348 6.263.887.133.657.345 1.3.623 1.924l-10.99 10.988a9.088 9.088 0 0 0-.661.743c-1.032.612-2.055 1.42-3.084 2.446l-7.377 7.377-9.299-9.299 7.375-7.377zm-58.401 62.644c2.052-6.172 6.011-10.25 6.456-10.696l10.52-10.523 9.3 9.302-10.521 10.52c-.723.748-2 2.248-2.88 4.243l-6.493 6.49a9.208 9.208 0 0 0-7.539-.15.162.162 0 0 0 .02-.011c-.249-3.005.114-6.085 1.137-9.175zm26.539 4.923c0 .46-.125.89-.34 1.281-.187.162-.374.32-.55.5l-10.557 10.556-3.668-3.667 10.558-10.557a2.676 2.676 0 0 1 3.775 0 2.66 2.66 0 0 1 .782 1.887zM87.649 184.6c-1.006 1.006-2.766 1.006-3.772 0l-16.846-16.846a2.647 2.647 0 0 1-.78-1.888 2.659 2.659 0 0 1 2.667-2.667c.457 0 .888.125 1.276.338.161.187.323.374.502.55l16.846 16.846c.175.175.363.34.55.501a2.627 2.627 0 0 1-.443 3.166zm8.319-8.315c-.836.83-2.177.966-3.186.42-.156-.18-.309-.36-.482-.53l-16.843-16.847c-.176-.176-.366-.34-.553-.502a2.664 2.664 0 0 1-.337-1.278 2.659 2.659 0 0 1 2.667-2.667c.711 0 1.38.278 1.887.78l16.847 16.846c.504.504.78 1.173.78 1.887a2.66 2.66 0 0 1-.78 1.89zm2.32-10.75l-3.664-3.665 10.558-10.557c.172-.17.326-.352.481-.533 1.012-.541 2.35-.41 3.186.422.504.505.78 1.174.78 1.888 0 .711-.278 1.383-.78 1.885l-10.56 10.56zm76.362-33.078c-15.415 15.412-48.402 33.701-70.953 36.972l9.797-9.8a9.18 9.18 0 0 0 2.71-6.536c0-.14-.017-.275-.023-.411 17.742-6.369 38.598-18.95 49.17-29.524 6.385-6.382 6.343-13.825 4.14-20.332l9.061-9.064a9.19 9.19 0 0 0 1.7.604c5.233 11.66 6.491 26-5.602 38.091zm9.72-45.168c-1.005 1.01-2.765 1.01-3.771 0l-16.85-16.846a2.671 2.671 0 0 1 .003-3.775 2.645 2.645 0 0 1 1.885-.78c.46 0 .893.125 1.284.34.159.188.317.375.496.55l16.846 16.847c.176.175.363.34.55.501a2.627 2.627 0 0 1-.442 3.163zm-12.424-25.493a12.015 12.015 0 0 0-.317-.278 2.67 2.67 0 0 1 .439-3.168 2.659 2.659 0 0 1 1.887-.78c.605 0 1.18.2 1.65.568l58.04-58.04 19.437 19.437-62.508 62.508-19.437-19.437.81-.81zM62.632 171.111l19.437 19.437-62.509 62.508L.124 233.619l62.508-62.508z" id="a"/>
              </Defs>
              <G fill="none" fillRule="evenodd">
                <Path fill="#000" fillRule="nonzero" d="M219.206 10.09l11.9 11.9-4.65 4.648-11.9-11.9zM243.981.54v23.764h-6.575V.54z"/>
                <Path fill="#362950" fillRule="nonzero" d="M262.186 10.088l4.65 4.649-11.898 11.898-4.65-4.65z"/>
                <G transform="rotate(45 212.638 146.494)">
                  <Use fill="#9571DC" href="#a"/>
                  <Use fill="url(#b)" href="#a"/>
                </G>
                <G fill="#362950" fillRule="nonzero">
                  <Path d="M219.205 10.09l11.9 11.9-4.65 4.648-11.9-11.9zM243.981.54v23.764h-6.575V.54zM262.186 10.087l4.65 4.65-11.898 11.897-4.65-4.649zM330.831 85.105l-.002-6.575h-75.312l-.002 3.441.002-9.53v.907h75.312v-.157l.002.002v-6.577l-75.314-.002.002-5.18h75.312l.002-6.572-75.923-.002a9.171 9.171 0 0 0-2.099-3.248 9.193 9.193 0 0 0-6.537-2.71 9.208 9.208 0 0 0-5.878 2.114 9.164 9.164 0 0 0-8.216-1.803 29.357 29.357 0 0 0-4.525-5.86c-5.636-5.636-13.317-8.616-22.211-8.612H195.01a2.831 2.831 0 0 0-2.833-2.833l-42.484-.002a2.831 2.831 0 0 0-2.834 2.833h-14.882c-1.275 0-8.04.169-15.079 3.696-5.621 2.82-9.942 7.064-12.741 12.329-.331.21-.664.415-.964.667a9.183 9.183 0 0 0-5.882-2.11 9.177 9.177 0 0 0-6.535 2.707 9.2 9.2 0 0 0-2.153 3.403H.922v6.578H88.07l.002 5.184L.92 67.19v6.734h87.148v5.182L.922 79.103.92 85.678l87.76-.002a9.23 9.23 0 0 0 2.1 3.251 9.194 9.194 0 0 0 6.535 2.708 9.171 9.171 0 0 0 5.88-2.113 9.164 9.164 0 0 0 5.88 2.113c1.875 0 3.665-.56 5.18-1.59 19.259 15.05 57.707 26.235 81.445 26.237 14.403.002 25.918-6.683 33.307-19.33a51.34 51.34 0 0 0 3.004-6.083 9.289 9.289 0 0 0 2.5.347 9.164 9.164 0 0 0 5.877-2.11 9.157 9.157 0 0 0 5.878 2.11c2.47 0 4.79-.962 6.535-2.708a9.14 9.14 0 0 0 2.153-3.403h75.877zM225.27 61.437v5.183l-14.929-.002c-.242.002-.478.018-.717.036-1.098-.329-1.952-1.37-1.95-2.551 0-.714.279-1.381.784-1.886a2.659 2.659 0 0 1 1.885-.784l14.927.004zm-72.742-23.862l36.817.002v17.568h-36.819l.002-17.57zm49.102 23.466c-.343.972-.53 2-.53 3.062a9.16 9.16 0 0 0 2.111 5.882 9.169 9.169 0 0 0-2.112 5.876c0 2.469.962 4.793 2.707 6.539a9.246 9.246 0 0 0 2.263 1.661c-3.269 5.197-7.349 5.922-10.37 5.92-16.31-.002-38.245-6.32-53.215-13.5 0-.015.002-.03.004-.047a9.186 9.186 0 0 0-2.112-5.88 9.157 9.157 0 0 0 2.11-5.878c0-1.29-.264-2.517-.745-3.635h59.889zm8.711 17.489c-1.42.002-2.667-1.24-2.667-2.667 0-.714.279-1.381.784-1.886a2.627 2.627 0 0 1 1.144-.664c.244.016.493.037.743.035h14.927l.002 5.184-14.933-.002zm-4.901-37.215c7.114 0 13.186 2.312 17.563 6.69 1.59 1.588 2.824 3.316 3.802 5.055a9.245 9.245 0 0 0-.92 1.802l-15.542-.002c-.332 0-.663.022-.992.058-1.162-.296-2.456-.449-3.91-.45h-10.433V41.316l10.432-.002zm-85.592 3c5.816-2.914 11.5-2.998 12.129-2.998l14.88-.002-.002 13.152h-14.878c-1.04.018-3.004.175-5.036.964l-9.18-.002a9.208 9.208 0 0 0-5.225-5.437l.022.006c1.948-2.3 4.382-4.222 7.29-5.683zm15.285 22.247a2.637 2.637 0 0 1-1.146.665c-.247-.018-.491-.038-.742-.036h-14.93v-5.186h14.93a2.676 2.676 0 0 1 2.67 2.669 2.66 2.66 0 0 1-.782 1.888zm-37.82 18.497c-1.423 0-2.668-1.244-2.668-2.667V58.568c0-.714.279-1.381.784-1.886a2.659 2.659 0 0 1 3.772 0c.322.322.539.715.663 1.14-.018.247-.036.493-.034.744V82.39c0 .248.016.497.034.743a2.627 2.627 0 0 1-2.551 1.926zm11.762.002c-1.179-.004-2.223-.855-2.55-1.956.016-.236.036-.473.034-.715l.002-23.822c0-.249-.018-.5-.036-.746.127-.427.343-.82.666-1.142a2.659 2.659 0 0 1 3.771 0c.503.503.78 1.172.784 1.886V82.39c0 .713-.279 1.38-.784 1.886a2.66 2.66 0 0 1-1.887.785zm9.242-5.96V73.92h14.93c.243.002.48-.018.718-.036 1.098.332 1.952 1.37 1.954 2.55 0 .714-.279 1.382-.784 1.887a2.652 2.652 0 0 1-1.884.781h-14.934zm77.385 30.606c-21.798-.002-58.056-10.395-76.315-24.029l13.858-.002a9.18 9.18 0 0 0 6.538-2.705c.098-.098.182-.206.274-.307 17.049 8.043 40.693 13.895 55.645 13.892 9.028.003 14.26-5.29 17.305-11.449l12.816-.002a9.19 9.19 0 0 0 .775 1.63c-4.545 11.944-13.796 22.974-30.896 22.972zm38.812-25.065c-1.424.002-2.669-1.242-2.667-2.667l-.002-23.826a2.671 2.671 0 0 1 2.671-2.668c.714 0 1.381.279 1.884.782.325.325.543.72.668 1.148a8.19 8.19 0 0 0-.039.74v23.824c0 .248.017.497.035.743a2.627 2.627 0 0 1-2.55 1.924zm11.76 0c-1.178 0-2.22-.853-2.549-1.952.018-.238.034-.475.036-.717l.002-23.822c0-.249-.016-.497-.036-.742a2.67 2.67 0 0 1 2.551-1.93c.712.002 1.381.279 1.886.784.503.503.782 1.174.784 1.886l-.004 23.824a2.65 2.65 0 0 1-.782 1.888 2.661 2.661 0 0 1-1.888.781z"/>
                </G>
              </G>
            </Svg>
          </View>

            { this.state.addingFriend ?
                <Text
                  title="Add a Contact"
                  style={[styles.TitleText, {
                    fontFamily: this.state.isFontLoaded ? 'ostrich-sans-heavy' : null
                  }]}
                >
                  Add a Contact
                </Text>
              :
                <Text
                  title="Edit a Contact"
                  style={[styles.TitleText, {
                    fontFamily: this.state.isFontLoaded ? 'ostrich-sans-heavy' : null
                  }]}
                >
                  Edit a Contact
                </Text>
            }
        </View>

        <ScrollView style={styles.ScrollView}>
          {/* # TO-DO: just use default font for labels/field? */}
          <Text style={[styles.Label, {fontFamily: this.state.isFontLoaded ? 'league-mono-medium' : null}]}>Name</Text>
          <TextInput
            placeholder='William Finn'
            value={this.state.friend.name}
            name='name'
            onChangeText={(text) => this.updateContact('name', text)}
            style={[styles.Input, {fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null}]}
          />

          <Text style={[styles.Label, {fontFamily: this.state.isFontLoaded ? 'league-mono-medium' : null}]}>Phone Number</Text>
          <TextInput
            placeholder='525-600-6468'
            value={this.state.friend.phone}
            name='name'
            onChangeText={(text) => this.updateContact('phone', text)}
            style={[styles.Input, {fontFamily: this.state.isFontLoaded ? 'league-mono-light' : null}]}
          />

          <TouchableHighlight
            style={styles.SubmitButtonContainer}
            onPress={this.submitContact}
          >
            <Image 
              style={styles.SubmitButton} 
              source={require('../../assets/SubmitButton.png')} 
            />
          </TouchableHighlight>
        </ScrollView>

  	  </SafeAreaView>
  	);
  }
}

const styles = StyleSheet.create({
  TitleView: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    height: '15%',
    marginTop: 30,
    marginBottom: 12
  },
  TitleText: {
    fontSize: 42,
    color: '#362950',
    flex: 1,
    marginTop: 20,
    alignItems: 'flex-start',
  },
  ScrollView: {
    flex: 4,
    width: '100%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    backgroundColor: '#FFF'
  },
  Label: {
    color: '#000',
    fontSize: 13.6,
    marginBottom: 5,
    marginTop: 15
  },
  Input: {
    marginLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#D8D8D8',
    paddingBottom: 4,
  },
  SubmitButtonContainer: {
    marginLeft: 'auto',
    marginTop: 20
  },
  SubmitButton: {
    width: scale(185),
    height: verticalScale(120),
    resizeMode: 'contain'
  },
});