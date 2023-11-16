import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './screens/MainScreen';
import KagoshimaDepartureScreen from './screens/KagoshimaDepartureScreen';
import SakurajimaDepartureScreen from './screens/SakurajimaDepartureScreen';

import moment from 'moment';

// setting main nav
const MainStack = createStackNavigator(
  {
    'メインページ': MainScreen,
    '鹿児島港発': KagoshimaDepartureScreen,
    '桜島港発': SakurajimaDepartureScreen,
  }
)

const AppContainer = createAppContainer(MainStack)

export default class App extends Component {

  render() {
    return (
      <AppContainer />
    )
  }
}