import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Components/Main/Main';
import SubjectScreen from './Components/SubjectScreen/SubjectScreen';
import Settings from "./Components/Settings/Settings";

const Stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <ExpoStatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Übersicht" component={Main} options={({navigation, route}) => ({headerStyle: styles.headerStyle, headerRight: (p) => (
            <View style={{marginRight: 10}}><Button title="Einstellungen" onPress={() => {
                navigation.navigate("Einstellungen");
        }}/></View>)})} />
        <Stack.Screen name="SubjectScreen" component={SubjectScreen} options={{headerStyle: styles.headerStyle}} />
        <Stack.Screen name="Einstellungen" component={Settings} options={{headerStyle: styles.headerStyle}} />
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