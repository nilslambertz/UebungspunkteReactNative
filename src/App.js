import { readDirectoryAsync } from 'expo-file-system';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, StatusBar, Platform, TouchableHighlight, Modal, Alert, TextInput } from 'react-native';
import SubjectButton from './Components/SubjectButton';
import { initialize } from './Utils/FileManagement';

export default function App() {
  useEffect(() => {
    initialize();
  });

  const newSubjectPress = () => {
    setModalVisible(!modalVisible);
  }

  const testFun = () => {
    let x = {XD: "lol", XDDD: []}
    x["xsasada"] = "dota 2";
    console.log(x);
  }

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="auto" />
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.outerModal}>
          <Text style={styles.modalHeader}>Neues Fach</Text>
          <View style={styles.modalSection}>
            <Text style={styles.modalText}>Titel</Text>
            <TextInput style={styles.modalInput} onChangeText={() => {}} />
          </View>
          <View style={styles.modalSection}>
            <Text style={styles.modalText}>Benötigte Prozent</Text>
            <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={() => {}} />
          </View>
          <View style={styles.modalSection}>
            <Text style={styles.modalText}>Anzahl der Übungen</Text>
            <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={() => {}} />
          </View>
          <View style={styles.modalButtonView}>
            <Button onPress={() => setModalVisible(!modalVisible)} title="Schließen" color="red"></Button>
            <Button title="Speichern" onPress={() => testFun()}></Button>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <SubjectButton reached="20" needed="40" title="Mathematik" count="3"></SubjectButton>
        <SubjectButton reached="60" needed="30" title="Diskrete Strukturen" count="1"></SubjectButton>
        <SubjectButton reached="60" needed="30" title="Diskrete Strukturen" count="1"></SubjectButton>
      </ScrollView>
      <TouchableHighlight style={styles.newSubjectButton} onPress={newSubjectPress}>
        <View>
          <Text style={styles.newSubjectButtonText}>Neues Fach</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
   },
   scrollViewStyle: {
      paddingBottom: 65
   },
   newSubjectButton: {
    bottom: 10,
    backgroundColor: "#32CD32",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 2,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "gray",
    position: "absolute"
   },
   newSubjectButtonText: {
     fontSize: 20,
     color: "black"
   },
   outerModal: {
     flex: 1,
     margin: 20,
     marginTop: 0,
     padding: 20,
     borderRadius: 5,
     justifyContent: "space-between",
     flexDirection: "column",
     backgroundColor: "rgba(200,200,200, 0.98)",
     borderWidth: 1,
     borderColor: "#32CD32"
   },
   modalButtonView: {
     flexDirection: "row",
     justifyContent: "space-around"
   },
   modalHeader: {
    color: "black",
     fontSize: 30,
     textDecorationLine: "underline",
     marginBottom: 10,
     textAlign: "center"
   },
   modalSection: {
   },
   modalInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    color: "black",
    paddingHorizontal: 10
   },
   modalText: {
     color: "black",
     fontSize: 20,
     marginBottom: 5
   }
});