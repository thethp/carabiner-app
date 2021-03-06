import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './Screens/App/Home';
import HookUpScreen from './Screens/App/HookUp';
import ManageFriendsScreen from './Screens/App/ManageFriends';
import AddEditFriendsScreen from './Screens/App/AddEditFriends';

import AuthLoading from './Screens/Auth/AuthLoading';
import LogInSignUp from './Screens/Auth/LogInSignUp';
import ForgotMyPassword from './Screens/Auth/ForgotMyPassword';

// #TO-DO : different start screen if no friends?

const AppStack = createStackNavigator(
  {
    Home:  HomeScreen,
    HookUp: HookUpScreen,
    ManageFriends: ManageFriendsScreen,
    AddEditFriends: AddEditFriendsScreen,
  },
  { 
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const AuthStack = createStackNavigator(
  {
    LogInSignUp: {
      screen: LogInSignUp,
      navigationOptions: () => ({
        headerShown: false
      }),
    },
    ForgotMyPassword: ForgotMyPassword,
  },
  { 
    initialRouteName: 'LogInSignUp'
  }
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

  render() {
    return <AppContainer />;
  }
}