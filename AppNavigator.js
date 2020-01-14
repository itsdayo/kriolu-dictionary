import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './App'
import WordPage from './WordPage'

const AppNavigator = createStackNavigator({
    Home: {
        screen: WelcomeScreen,
    },
    Translation: {
        screen: WordPage,
        title: 'Translation'
    }
});

export default createAppContainer(AppNavigator);