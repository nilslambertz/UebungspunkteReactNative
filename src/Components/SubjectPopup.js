import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Modal, TextInput } from 'react-native';
import { titleExists } from './../Utils/FileManagement';

function SubjectPopup({
    visible, // If popup is visible
    closeFunction, // function called when popup is being closed
    modalTitle, // popup-title
    titleText, // text above title-input
    prozentText, // text above prozent-input
    numberText, // text above number-input
    saveFunction, // function when clicking save-button
    currentTitle,
    currentProzent,
    currentNumber
    }) {

    const [titleError, setTitleError] = useState("");
    const [prozentError, setProzentError] = useState("");
    const [numberError, setNumberError] = useState("");
    const [newTitle, setNewTitle] = useState(currentTitle);
    const [newProzent, setNewProzent] = useState(currentProzent);
    const [newNumber, setNewNumber] = useState(currentNumber);

    const Emoji = props => (
        <span
            className="emoji"
            role="img"
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"}
        >
            {props.symbol}
        </span>
    );

    function validateTitle(text) {
        setNewTitle(text);
        text = text.trim();
        if(titleExists(text) && text != currentTitle) { 
            // If title already exists 
            setTitleError("Titel ist bereits vergeben!");
        } else if(text === "") {
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
        } else if(p === 1337) {
            // Easteregg
            setError("haha lol 1337 ich bin lustig \uD83D\uDE20");
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
  
      saveFunction(newTitle, newProzent, newNumber);
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
                <TextInput style={styles.modalInput} onChangeText={(t) => {validateTitle(t)}} value={newTitle} placeholder={newTitle}/>
                <Text style={styles.modalError}>{titleError}</Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalText}>{prozentText}</Text>
                <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={(t) => {validateNumericInput(t, 0, 100, setProzentError, setNewProzent)}} value={newProzent} placeholder={newProzent}/>
                <Text style={styles.modalError}>{prozentError}</Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalText}>{numberText}</Text>
                <TextInput style={styles.modalInput} keyboardType='numeric' onChangeText={(t) => {validateNumericInput(t, 1, Infinity, setNumberError, setNewNumber)}} value={newNumber} placeholder={newNumber}/>
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
       height: "65%",
       flexGrow: 1
     },
     modalButtonView: {
       flexDirection: "row",
       justifyContent: "space-around",
       margin: 30,
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