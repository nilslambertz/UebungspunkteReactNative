import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Main from './Components/Main/Main';
import SubjectScreen from './Components/SubjectScreen/SubjectScreen';
import Settings from "./Components/Settings/Settings";

const Stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <ExpoStatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Übersicht" component={Main} options={({navigation, route}) => ({headerRight: (p) => (
            <View style={{marginRight: 10}}><Button title="Einstellungen" onPress={() => {
                navigation.navigate("Einstellungen");
        }}/></View>), cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS })} />
        <Stack.Screen name="SubjectScreen" component={SubjectScreen} options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="Einstellungen" component={Settings} options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;