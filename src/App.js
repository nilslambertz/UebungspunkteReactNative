import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {Button, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Components/Main/Main';
import SubjectScreen from './Components/SubjectScreen/SubjectScreen';
import Settings from "./Components/Settings/Settings";

const Stack = createStackNavigator();

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 5,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

function App() {
  return(
    <NavigationContainer>
      <ExpoStatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Übersicht" component={Main} options={({navigation, route}) => ({headerRight: (p) => (
            <View style={{marginRight: 10}}><Button title="Einstellungen" onPress={() => {
                navigation.navigate("Einstellungen");
        }}/></View>), transitionSpec: {
            open: config,
            close: config,
        }})} />
        <Stack.Screen name="SubjectScreen" component={SubjectScreen} options={{
            transitionSpec: {
                open: config,
                close: config,
            },
        }}/>
        <Stack.Screen name="Einstellungen" component={Settings} options={{
            transitionSpec: {
                open: config,
                close: config,
            },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;