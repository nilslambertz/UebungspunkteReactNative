import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, StatusBar, Platform, TouchableHighlight, Modal, Alert, TextInput } from 'react-native';
import SubjectButton from './Components/SubjectButton';
import { addSubject, deleteSubject, initialize, titleExists } from './Utils/FileManagement';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      newTitle: "",
      subjects: {},
      newProzent: 0,
      newAnzahl: 0,
      titleError: "",
      prozentError: "",
      anzahlError: ""
    };
    console.log("Initializing app...");
    let p = initialize();
    p.then((c) => {
      this.setState({subjects: c.subjects});
    })
  }

  printSubjectList = () => {
    let subjects = this.state.subjects;
    let deleteAlert = this.deleteAlert;
    return Object.keys(subjects).map(function(c, i) {
      return <SubjectButton key={c} subject={subjects[c]} id={c} deleteAlert={deleteAlert}></SubjectButton>
    })
  }

  requestDelete = (id) => {
    let p = deleteSubject(id);
    p.then((c) => {
      this.setState({subjects: c});
    }).catch((err) => {
      alert("Fehler beim Löschen des Fachs!");
    })
  }

  deleteAlert = (id) => {
    let subject = this.state.subjects[id];
    Alert.alert(
      'Warnung',
      "Willst du das Fach " + subject.title + " unwiderruflich löschen?",
      [
        {
          text: "JA, löschen",
          style: 'destructive',
          onPress: () => this.requestDelete(id)
        },
        {
          text: "NEIN, abbrechen", 
          style: 'cancel'
        }
      ]
    )
  }

  resetErrors = () => {
    this.setState({titleError: ""});
    this.setState({prozentError: ""});
    this.setState({anzahlError: ""});
  }

  createNewSubject = () => {
    if(this.state.newTitle.trim() === "" || this.state.newTitle === undefined) {
      alert("Titel darf nicht leer sein!");
      return;
    } else if(this.state.newProzent === undefined) {
      alert("Prozent darf nicht leer sein!");
      return;
    } else if(this.state.newAnzahl === undefined) {
      alert("Anzahl darf nicht leer sein!");
      return;
    }

    if(this.state.titleError) {
      alert(this.state.titleError);
      return;
    } else if(this.state.prozentError) {
      alert(this.state.prozentError);
      return;
    } else if(this.state.anzahlError) {
      alert(this.state.anzahlError);
      return;
    }

    let p = addSubject(this.state.newTitle, this.state.newProzent, this.state.newAnzahl);
    p.then((c) => {
      this.setState({modalVisible: false});
      console.log(c);
    }).catch((err) => {
      alert("Fehler beim Hinzufügen des Fachs!");
    });
  }

  newSubjectPress = () => {
    this.setState({modalVisible: true});
  };

  validateTitle = (text) => {
    if(titleExists(text)) {
      this.setState({titleError: "Titel ist bereits vergeben!"});
    } else {
      this.setState({titleError: ""});
      this.setState({newTitle: text.trim()});
    }
  }

  validateProzent = (text) => {
    let p = parseInt(text);
    if(p <= 0) {
      this.setState({prozentError: "Angabe muss größer als 0 sein!"});
    } else if(p >= 100) {
      this.setState({prozentError: "Prozent muss kleiner als 100 sein!"});
    } else {
      this.setState({prozentError: ""});
      this.setState({newProzent: p});
    }
  }

  validateAnzahl = (text) => {
    let p = parseInt(text);
    if(p <= 0) {
      this.setState({anzahlError: "Angabe muss größer als 0 sein!"});
    } else {
      this.setState({anzahlError: ""});
      this.setState({newAnzahl: p});
    }
  }

  render() {
  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="auto" />
      <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
         this.setState({modalVisible: false});
         this.resetErrors();
      }
      }>
        <View style={styles.outerModal}>
          <Text style={styles.modalHeader}>Neues Fach</Text>
          <View style={styles.modalSection}>
            <Text style={styles.modalText}>Titel</Text>
            <TextInput style={styles.modalInput} onChangeText={(t) => {this.validateTitle(t)}}/>
            <Text style={styles.modalError}>{this.state.titleError}</Text>
          </View>
          <View style={styles.modalSection}>
            <Text style={styles.modalText}>Benötigte Prozent</Text>
            <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={(t) => {this.validateProzent(t)}} />
            <Text style={styles.modalError}>{this.state.prozentError}</Text>
          </View>
          <View style={styles.modalSection}>
            <Text style={styles.modalText}>Anzahl der Übungen</Text>
            <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={(t) => {this.validateAnzahl(t)}} />
            <Text style={styles.modalError}>{this.state.anzahlError}</Text>
          </View>
          <View style={styles.modalButtonView}>
            <Button onPress={() => {
              this.setState({modalVisible: false});
              this.resetErrors();
            }} title="Schließen" color="red"></Button>
            <Button title="Speichern" onPress={() => this.createNewSubject()}></Button>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {this.printSubjectList()}
      </ScrollView>
      <TouchableHighlight style={styles.newSubjectButton} onPress={this.newSubjectPress}>
        <View>
          <Text style={styles.newSubjectButtonText}>Neues Fach</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
    }
}

export default App;

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
     justifyContent: "space-between",
     flexDirection: "column",
     backgroundColor: "rgba(200,200,200, 0.95)",
     borderWidth: 1,
     borderColor: "black"
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
   },
   modalError: {
     color: "red",
     fontSize: 16
   }
});