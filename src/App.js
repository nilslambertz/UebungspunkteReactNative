import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
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
        <Stack.Screen name="Übersicht" component={Main} options={{headerStyle: {
            backgroundColor: '#E0E0E0',
          }}} />
          <Stack.Screen name="SubjectScreen" component={SubjectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;