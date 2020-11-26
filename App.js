import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, StatusBar, Platform } from 'react-native';
import SubjectButton from './Components/SubjectButton';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SubjectButton reached="20" needed="40" title="Mathematik" count="3"></SubjectButton>
      <SubjectButton reached="60" needed="30" title="Diskrete Strukturen" count="1"></SubjectButton>
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
   }
});