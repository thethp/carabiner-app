import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { registerForPushNotificationsAsync } from './Utils/Utils';

import HomeScreen from './Screens/App/Home';
import HookUpScreen from './Screens/App/HookUp';
import ManageFriendsScreen from './Screens/App/ManageFriends';
import AddEditFriendsScreen from './Screens/App/AddEditFriends';

import AuthLoading from './Screens/Auth/AuthLoading';
import LogInSignUp from './Screens/Auth/LogInSignUp';
import ForgotMyPassword from './Screens/Auth/ForgotMyPassword';

// #TO-DO : different start screen if no friends?
// #TO-DO: have they logged in?

const AppStack = createStackNavigator(
  {
    Home:  HomeScreen,
    HookUp: HookUpScreen,
    ManageFriends: ManageFriendsScreen,
    AddEditFriends: AddEditFriendsScreen,
  },
  { initialRouteName: 'Home' }
);

const AuthStack = createStackNavigator(
  {
    LogInSignUp:  LogInSignUp,
    ForgotMyPassword: ForgotMyPassword,
  },
  { initialRouteName: 'LogInSignUp' }
);

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createAppContainer(switchNavigator);

export default class App extends React.Component {
  componentDidMount() {
    registerForPushNotificationsAsync(this.handleNotification);
  }

  handleNotification() {
    console.log('Successfully registered for push notification');
  }

  render() {
    return <AppContainer />;
  }
}
