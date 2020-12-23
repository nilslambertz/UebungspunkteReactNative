import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Modal, TextInput } from 'react-native';
import { titleExists } from './../Utils/FileManagement';

function SubjectPopup({
    visible, 
    closeFunction,
    modalTitle,
    titleText,
    prozentText,
    numberText,
    addSubject
    }) {

    const [titleError, setTitleError] = useState("");
    const [prozentError, setProzentError] = useState("");
    const [numberError, setNumberError] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newProzent, setNewProzent] = useState(0);
    const [newNumber, setNewNumber] = useState(0);

    function validateTitle(text) {
        setNewTitle(text);
        if(titleExists(text)) { 
            // If title already exists 
            setTitleError("Titel ist bereits vergeben!");
        } else if(text.trim() === "") {
            // If title-input is empty or just whitespaces
            setTitleError("Titel darf nicht leer sein!");
        } else {
            // If title is valid
            setTitleError("");
            return true;
        }
        return false;
    }
    
    function validateNumericInput (text, lowerBorder, upperBorder, setError, setValue) {
        let p = parseInt(text);
        setValue(text);
        if(isNaN(p) && text.trim() === "") {
          // If input is empty
          setError("Angabe darf nicht leer sein!");
        } else if(isNaN(p)) {
          // If input is not a number
          setError("Angabe muss eine Zahl sein!");
        } else if(p <= lowerBorder) {
          // If input is lower than lowerBorder
          setError("Angabe muss größer als " + lowerBorder + " sein!");
        } else if(p >= upperBorder) {
          // If input is higher than upperBorder
          setError("Angabe muss kleiner als " + upperBorder + " sein!");
        } else {
          // If input is valid
          setError("");
          return true;
        }
        return false;
      }

    function createNewSubject() {
      // Checking all values and sending alert error if one or more is not valid
      let validAnzahl = validateNumericInput(newNumber, 1, Infinity, setNumberError, setNewNumber)
      let validProzent = validateNumericInput(newProzent, 0, 100, setProzentError, setNewProzent)
      let validTitle = validateTitle(newTitle);  
      if(!validAnzahl || !validProzent || !validTitle) {
        alert("Bitte alle Felder korrekt ausfüllen!");
        return false;
      }
  
      addSubject(newTitle, newProzent, newNumber);
      resetAndClose();
    }

    function resetAndClose() {
        setTitleError("");
        setNewTitle("");
        setProzentError("");
        setNewProzent("");
        setNumberError("");
        setNewNumber("");
        closeFunction();
    }


    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {
            resetAndClose();
          }
          }>
            <View style={styles.modalShadow}>
              <ScrollView style={styles.modal}>
              <Text style={styles.modalHeader}>{modalTitle}</Text>
              <View style={styles.modalSection}>
                <Text style={styles.modalText}>{titleText}</Text>
                <TextInput style={styles.modalInput} onChangeText={(t) => {validateTitle(t)}}/>
                <Text style={styles.modalError}>{titleError}</Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalText}>{prozentText}</Text>
                <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={(t) => {validateNumericInput(t, 0, 100, setProzentError, setNewProzent)}} />
                <Text style={styles.modalError}>{prozentError}</Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalText}>{numberText}</Text>
                <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={(t) => {validateNumericInput(t, 1, Infinity, setNumberError, setNewNumber)}} />
                <Text style={styles.modalError}>{numberError}</Text>
              </View>
              <View style={styles.modalButtonView}>
                <Button onPress={() => {
                    resetAndClose();
                }} title="Schließen" color="red"></Button>
                <Button title="Speichern" onPress={() => createNewSubject()}></Button>
              </View>
            </ScrollView>
          </View>
          </Modal>
    )
}

const styles = StyleSheet.create({
     modalShadow: {
       flex: 1,
       position: 'relative',
       backgroundColor: "rgba(0,0,0,0.7)"
     },
     modal: {
       width: "100%",
       position: "absolute",
       bottom: 0,
       borderTopLeftRadius: 20,
       borderTopRightRadius: 20,
       padding: 20,
       flexDirection: "column",
       backgroundColor: "#EFEFEF",
       height: "60%",
       flexGrow: 1
     },
     modalButtonView: {
       flexDirection: "row",
       justifyContent: "space-around",
       marginBottom: 30,
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

export default SubjectPopup;