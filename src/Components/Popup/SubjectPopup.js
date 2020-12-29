import React, { useState } from 'react';
import { Text, View, ScrollView, Button, Modal, TextInput } from 'react-native';
import { titleExists } from '../../Utils/FileManagement';
import style from '../../Style/style';

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
    currentNumber,
    theme
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
        if(titleExists(text, currentTitle)) { 
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
      resetAndClose(true);
    }

    function resetAndClose(updated) {
        setTitleError("");
        setNewTitle(updated ? newTitle: currentTitle);
        setProzentError("");
        setNewProzent(updated ? newProzent : currentProzent);
        setNumberError("");
        setNewNumber(updated ? newNumber : currentNumber);
        closeFunction();
    }


    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {
            resetAndClose();
          }
          }>
        <View style={[style.popupShadow, theme.popupShadow]}>
              <ScrollView style={[style.popupContainer, theme.popupContainer]}>
              <Text style={[style.popupHeader, theme.popupHeader]}>{modalTitle}</Text>
              <View style={[style.popupSection, theme.popupSection]}>
                  <Text style={[style.popupText, theme.popupText]}>{titleText}</Text>
                <TextInput style={[style.popupInput, theme.popupInput]} onChangeText={(t) => {validateTitle(t)}} value={newTitle} placeholder={newTitle}/>
                <Text style={[style.popupError, theme.popupError]}>{titleError}</Text>
              </View>
                  <View style={[style.popupSection, theme.popupSection]}>
                <Text style={[style.popupText, theme.popupText]}>{prozentText}</Text>
                <TextInput style={[style.popupInput, theme.popupInput]} keyboardType='numeric' onChangeText={(t) => {validateNumericInput(t, 0, 100, setProzentError, setNewProzent)}} value={newProzent} placeholder={newProzent}/>
                      <Text style={[style.popupError, theme.popupError]}>{prozentError}</Text>
              </View>
                  <View style={[style.popupSection, theme.popupSection]}>
                      <Text style={[style.popupText, theme.popupText]}>{numberText}</Text>
                <TextInput style={[style.popupInput, theme.popupInput]} keyboardType='numeric' onChangeText={(t) => {validateNumericInput(t, 1, Infinity, setNumberError, setNewNumber)}} value={newNumber} placeholder={newNumber}/>
                      <Text style={[style.popupError, theme.popupError]}>{numberError}</Text>
              </View>
              <View style={[style.popupButtonView, theme.popupButtonView]}>
                <Button onPress={() => {
                    resetAndClose();
                }} title="Schließen" color="red"/>
                <Button title="Speichern" onPress={() => createNewSubject()}/>
              </View>
            </ScrollView>
          </View>
          </Modal>
    )
}

export default SubjectPopup;