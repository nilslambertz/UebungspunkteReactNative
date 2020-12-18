import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Components/Main';
import SubjectScreen from './Components/SubjectScreen';

const Stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <ExpoStatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Übersicht" component={Main} options={{headerStyle: styles.headerStyle}} />
        <Stack.Screen name="SubjectScreen" component={SubjectScreen} options={{headerStyle: styles.headerStyle}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#EDEDED',
    borderColor: "black",
    borderBottomWidth: 1
  }
});

export default App;