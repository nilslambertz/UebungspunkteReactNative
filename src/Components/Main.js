import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import SubjectButton from './SubjectButton';
import { addSubject, deleteSubject, initialize, titleExists, getSubjectList } from './../Utils/FileManagement';

class Main extends Component {  
    constructor(props) {
      super(props);
      this.state = {
        subjects: {}, // Subject-list
        modalVisible: true, // If the "Create subject"-modal is visible
        newTitle: "", // Chosen title (when creating new subject)
        newProzent: 0, // Chosen percent (when creating new subject)
        newAnzahl: 0, // Chosen number of exercises (when creating new subject)
        titleError: "", // If there is an error with the new title
        prozentError: "", // If there is an error with the percent
        anzahlError: "" // If there is an error with the number of exercises
      };
      console.log("Initializing app...");
      let p = initialize(); // Getting data from the FileManagement 
      p.then((c) => {
        this.setState({subjects: c.subjects}); // Setting subject-list
      });
    }

    // Adds listener to refresh subject-list when component gets focus
    componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
       this.updateList();
      });
    }
  
    // Removes listener to focus when changing screens
    componentWillUnmount() {
      this._unsubscribe();
    }

    // Updates subject-list (if not undefined)
    updateList = () => {
      let sub = getSubjectList()
      if(sub !== undefined) {
        this.setState({subjects: sub});
      }
    }

    // Sends request to delete subject from the list, alerts error if it fails
    requestDelete = (id) => {
      let p = deleteSubject(id);
      p.then((c) => {
        this.setState({subjects: c});
      }).catch((err) => {
        alert("Fehler beim Löschen des Fachs!");
      })
    }
  
    // Alerts warning when trying to delete a subject, proceeds if confirmed
    deleteAlert = (id) => {
      let subject = this.state.subjects[id];
      Alert.alert(
        'Warnung',
        "Willst du das Fach \"" + subject.title + "\" unwiderruflich löschen?",
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
  
    // Resets all errors when creating new subject
    resetErrors = () => {
      this.setState({titleError: ""});
      this.setState({prozentError: ""});
      this.setState({anzahlError: ""});
    }
  
    // Creates new subject if all inputs are filled out with valid values
    createNewSubject = () => {
      // Checking all values and sending alert error if one or more is not valid
      let validAnzahl = this.validateAnzahl(this.state.newAnzahl);
      let validProzent = this.validateProzent(this.state.newProzent);
      let validTitle = this.validateTitle(this.state.newTitle);  
      if(!validAnzahl || !validProzent || !validTitle) {
        alert("Bitte alle Felder korrekt ausfüllen!");
        return false;
      }
  
      // Sending request to add new subject and closing modal if successful, otherwise alerting error
      let p = addSubject(this.state.newTitle, this.state.newProzent, this.state.newAnzahl);
      p.then((c) => {
        this.setState({modalVisible: false});
      }).catch((err) => {
        alert("Fehler beim Hinzufügen des Fachs!");
      });
    }
  
    // Open modal when "New Subject"-button is pressed
    newSubjectPress = () => {
      this.setState({modalVisible: true});
    };
  
    // Validates input for new title
    validateTitle = (text) => {
      if(titleExists(text)) { 
        // If title already exists 
        this.setState({titleError: "Titel ist bereits vergeben!"});
      } else if(text.trim() === "") {
        // If title-input is empty or just whitespaces
        this.setState({titleError: "Titel darf nicht leer sein!"});
      } else {
        // If title is valid
        this.setState({titleError: ""});
        this.setState({newTitle: text.trim()});
        return true;
      }
      return false;
    }
  
    // Validates input for new percent
    validateProzent = (text) => {
      let p = parseInt(text);
      if(isNaN(p) && text.trim() === "") {
        // If input is empty
        this.setState({prozentError: "Prozentangabe darf nicht leer sein!"});
      } else if(isNaN(p)) {
        // If input is not a number
        this.setState({prozentError: "Prozentangabe muss eine Zahl sein!"});
      } else if(p <= 0) {
        // If input is lower than 0
        this.setState({prozentError: "Prozentangabe muss größer als 0 sein!"});
      } else if(p >= 100) {
        // If input is higher than 100
        this.setState({prozentError: "Prozentangabe muss kleiner als 100 sein!"});
      } else {
        // If input is valid
        this.setState({prozentError: ""});
        this.setState({newProzent: p});
        return true;
      }
      return false;
    }
  
    // Validates input for new count
    validateAnzahl = (text) => {
      let p = parseInt(text);
      if(isNaN(p) && text.trim() === "") {
        // If input is empty
        this.setState({anzahlError: "Anzahlangabe darf nicht leer sein!"});
      } else if(isNaN(p)) {
        // If input is not a number
        this.setState({anzahlError: "Anzahlangabe muss eine Zahl sein!"});
      } else if(p <= 0) {
        // If input is lower than 0
        this.setState({anzahlError: "Anzahlangabe muss größer als 0 sein!"});
      } else if(p >= 100) {
        // If input is higher than 100
        this.setState({anzahlError: "Anzahlangabe muss kleiner als 100 sein!"});
      } else {
        // If input is valid
        this.setState({anzahlError: ""});
        this.setState({newAnzahl: p});
        return true;
      }
      return false;
    }
  
    // Prints out all SubjectButtons
    printSubjectList = () => {
      let subjects = this.state.subjects;
      let deleteAlert = this.deleteAlert;
      let navigation = this.props.navigation;
      return Object.keys(subjects).map(function(c, i) {
        return <SubjectButton key={c} subject={subjects[c]} id={c} deleteAlert={deleteAlert} navigation={navigation}></SubjectButton>
      })
    }
  
    render() {
    return (
        <View style={styles.container}>
          <Modal animationType="fade" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
            this.setState({modalVisible: false});
            this.resetErrors();
          }
          }>
            <View style={styles.modalShadow}>
              <View style={styles.modal}>
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
          </View>
          </Modal>
  
          <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            {this.printSubjectList()}
          </ScrollView>
          <TouchableOpacity style={styles.newSubjectButton} onPress={this.newSubjectPress}>
            <View>
              <Text style={styles.newSubjectButtonText}>Neues Fach</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
      }
  }

  const styles = StyleSheet.create({
    container: {
      padding: 5,
      flex: 1,
      backgroundColor: 'white'
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
     modalShadow: {
       flex: 1,
       backgroundColor: "rgba(0,0,0,0.7)"
     },
     modal: {
       position: "absolute",
       width: "100%",
       marginTop: 0,
       bottom: 0,
       borderTopStartRadius: 20,
       borderTopEndRadius: 20,
       padding: 20,
       flexDirection: "column",
       backgroundColor: "#EFEFEF"
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

  export default Main;