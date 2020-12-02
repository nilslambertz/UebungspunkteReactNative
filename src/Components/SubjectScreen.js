import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, StatusBar, Platform, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import ExerciseView from './ExerciseView';

class SubjectScreen extends Component {  
    constructor(props) {
      super(props);
      let params = props.route.params;
      this.state = {
          id: params.id,
          subject: params.subject
      }
    }

    componentDidMount() {
        this.props.navigation.setOptions({title: this.state.subject.title});
    }

    render() {
        return (
            <View style={styles.container}>
               <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                   <ExerciseView></ExerciseView>
                </ScrollView>
                <TouchableOpacity style={styles.newExerciseButton} onPress={this.newSubjectPress}>
                    <View>
                        <Text style={styles.newExerciseButtonText}>Übung hinzufügen</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };
}

export default SubjectScreen;

const styles = StyleSheet.create({
    container: {
      padding: 5,
      flex: 1,
      backgroundColor: 'white'
     },
     scrollViewStyle: {
        paddingBottom: 65
     },
     newExerciseButton: {
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
     newExerciseButtonText: {
       fontSize: 20,
       color: "black"
     }
});
