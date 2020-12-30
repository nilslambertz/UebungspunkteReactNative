import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Button} from 'react-native';
import SubjectButton from './SubjectButton';
import {addSubject, deleteSubject, initialize, getSubjectList, getSettings} from '../../Utils/FileManagement';
import SubjectPopup from '../Popup/SubjectPopup';
import style from '../../Style/style';
import lightTheme from "../../Style/lightTheme";
import darkTheme from "../../Style/darkTheme";

class Main extends Component {
    constructor(props) {
      super(props);
      this.state = {
          subjects: {}, // Subject-list
          modalVisible: false, // If the "Create subject"-modal is visible
          theme: lightTheme
      };
      console.log("Initializing app...");
      let p = initialize(); // Getting data from the FileManagement 
      p.then((c) => {
        this.setState({subjects: c.subjects}); // Setting subject-list
          this.updateColor();
      });
    }

    updateColor = () => {
        getSettings().then((c) => {
            let t = c["lightTheme"]["value"] ? lightTheme : darkTheme;
            this.setState({theme: t}, () => {
                this.updateHeader();
            });
        });
    }

    updateHeader = () => {
        this.props.navigation.setOptions({
            headerStyle: [style.header, this.state.theme.header],
            headerTitleStyle: this.state.theme.headerTitle,
            headerTintColor: this.state.theme.headerTitle.color
        });
    }

    // Adds listener to refresh subject-list when component gets focus
    componentDidMount() {
        this.updateHeader();
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
       this.updateList();
       this.updateColor();
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
  
    // Creates new subject if all inputs are filled out with valid values
    createNewSubject = (title, prozent, number) => {
        // Sending request to add new subject and closing modal if successful, otherwise alerting error
      let p = addSubject(title, prozent, number);
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

    // Prints out all SubjectButtons
    printSubjectList = () => {
      let subjects = this.state.subjects;
      let deleteAlert = this.deleteAlert;
      let navigation = this.props.navigation;
      let theme = this.state.theme;
      return Object.keys(subjects).map(function(c, i) {
        return <SubjectButton key={c} subject={subjects[c]} id={c} deleteAlert={deleteAlert} navigation={navigation} theme={theme}/>
      })
    }

    // Closes modal
    closeModal = () => {
      this.setState({modalVisible: false});
    }
  
    render() {
        let theme = this.state.theme;
    return (
        <View style={[style.container, theme.container]}>
          <SubjectPopup
            visible={this.state.modalVisible}
            closeFunction={this.closeModal}
            modalTitle={"Neues Fach hinzufügen"}
            titleText={"Titel"}
            prozentText={"Benötigte Prozent"}
            numberText={"Anzahl der Übungen"}
            saveFunction={this.createNewSubject}
            theme={theme}
            />
  
          <ScrollView contentContainerStyle={[style.containerScrollView, theme.containerScrollView]}>
            {this.printSubjectList()}
          </ScrollView>
          <TouchableOpacity style={[style.bottomButton, theme.bottomButton]} onPress={this.newSubjectPress}>
            <View>
              <Text style={[style.bottomButtonText, theme.bottomButtonText]}>Neues Fach</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
      }
  }

  export default Main;