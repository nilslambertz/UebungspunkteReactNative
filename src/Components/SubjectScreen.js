import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { changeExercisePoints, deleteExercise, addExercise } from '../Utils/FileManagement';
import ExerciseView from './ExerciseView';

class SubjectScreen extends Component {  
    constructor(props) {
      super(props);
      let params = props.route.params;
      this.state = {
          id: params.id, // ID of the subject
          subject: params.subject, // Subject-object
          updateKey: 0, // Key used to update the list (so React needs to refresh the screen)
          newExercise: false // If the "Add exercise"-button was pressed
        }
    }

    // Sets the header-text to the subject-title
    componentDidMount() {
        this.props.navigation.setOptions({title: this.state.subject.title});
    }

    // Sends request to change the points
    changePoints = (index, points, max) => {
        let p = changeExercisePoints(this.state.id, index, points, max);
        p.then((c) => {
            this.setState({subject: c}, () => {
                // Change updateKey
                let newKey = parseInt(this.state.updateKey) + 1;
                this.setState({updateKey: newKey});
            });
        }).catch((err) => {
            console.log(err);
            alert("Fehler beim Ändern der Punkte!");
        })
    };

    // Sends request to delete exercise
    requestExerciseDelete = (index) => {
        let p = deleteExercise(this.state.id, index);

        p.then((c) => {
            this.setState({subject: c}, () => {
                let newKey = parseInt(this.state.updateKey) + 1;
                this.setState({updateKey: newKey});
            });
        }).catch((err) => {
          alert("Fehler beim Löschen des Fachs!");
          console.log(err);
        })
      }

    // Sends alert when trying to delete exercise
    exerciseDeleteAlert = (index) => {
        Alert.alert(
            'Warnung',
            'Willst du diese Übung wirklich löschen?',
            [
                {
                    text: 'Ja, löschen',
                    style: 'destructive',
                    onPress: () => this.requestExerciseDelete(index)
                },
                {
                    text: 'Nein, abbrechen',
                    style: 'cancel'
                }
            ]
        )
    }

    // When "New Exercise"-button is pressed
    newExercisePress = () => {
        this.setState({newExercise: true});
    }

    // Sends request to add new exercise to the list
    requestExerciseAdd = (index, points, max) => {
        let p = addExercise(this.state.id, index, points, max);
        p.then((c) => {
            this.setState({subject: c}, () => {
                let newKey = parseInt(this.state.updateKey) + 1;
                this.setState({updateKey: newKey}, () => {
                    this.setState({newExercise: false});
                });
            });
        }).catch((err) => {
            console.log(err);
            alert("Fehler beim Ändern der Punkte!");
        })
    }

    render() {
        const exerciseList = [];
        let len = this.state.subject.exercises.length;

        for(let i = 0; i < len; i++) {
            let c = this.state.subject.exercises[i];
            exerciseList.push(<ExerciseView key={this.state.updateKey.toString() + "-" + i.toString()} index={i} points={c[0]} max={c[1]} pressFunction={this.changePoints} longPressFunction={this.exerciseDeleteAlert}></ExerciseView>)
        }

        let maxPt = (len == 0 ? 10 : this.state.subject.exercises[len-1][1]);
        

        return (
            <View style={styles.container}>
               <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                  {
                     exerciseList
                  }
                  { this.state.newExercise == true &&
                      <ExerciseView key={"newExercise"} index={len} points={0} max={maxPt} pressFunction={this.requestExerciseAdd} longPressFunction={() => {}} newExercise={true}></ExerciseView>
                  }
                </ScrollView>
                <TouchableOpacity style={styles.newExerciseButton} onPress={this.newSubjectPress}>
                    <View>
                        <Text style={styles.newExerciseButtonText} onPress={this.newExercisePress}>Übung hinzufügen</Text>
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
