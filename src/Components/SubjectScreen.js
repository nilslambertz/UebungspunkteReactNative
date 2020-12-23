import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Alert, TextInput, Button, TouchableWithoutFeedbackBase } from 'react-native';
import { changeExercisePoints, deleteExercise, addExercise, editSubject } from '../Utils/FileManagement';
import ExerciseView from './ExerciseView';
import SubjectPopup from './SubjectPopup';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "#EBEBEB",
    backgroundGradientFromOpacity: 0.3,
    backgroundGradientTo: "#D2D2D2",
    backgroundGradientToOpacity: 0.7,
    propsForDots: {
        r: "4",
        fill: "#1672CE"
    },
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

class SubjectScreen extends Component {  
    data = {};

    constructor(props) {
      super(props);
      let params = props.route.params;
      this.state = {
          id: params.id, // ID of the subject
          subject: params.subject, // Subject-object
          updateKey: 0, // Key used to update the list (so React needs to refresh the screen)
          newExercise: false, // If the "Add exercise"-button was pressed
          modalVisible: false, // If the "Edit subject"-modal is visible
        }
        this.createData();
    }

    createData = () => {
        this.data = {
            labels: [],
            datasets: [{
                data: [],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
            }]
        }

        for(let i in this.state.subject.exercises) {
            let elem = this.state.subject.exercises[i];
            let val = Math.round(elem[0] * 100 / elem[1]);
            if(val < 0) val = 0;
            if(val > 100) val = 100;
            this.data.labels.push(parseInt(i) + 1);
            this.data.datasets[0].data.push(val);
        }
    }

    // Sets the header-text to the subject-title
    componentDidMount() {
        this.props.navigation.setOptions({headerRight: (p) => (
            <View style={{marginRight: 10}}><Button title="Anpassen" onPress={() => {
              this.setState({modalVisible: true});
            }}></Button></View>
          ),title: this.state.subject.title});
    }

    // Sends request to change the points
    changePoints = (index, points, max) => {
        let p = changeExercisePoints(this.state.id, index, points, max);
        p.then((c) => {
            this.setState({subject: c}, () => {
                // Change updateKey
                let newKey = parseInt(this.state.updateKey) + 1;
                this.setState({updateKey: newKey});
                this.createData();
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
                this.createData();
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
                    this.createData();
                });
            });
        }).catch((err) => {
            console.log(err);
            alert("Fehler beim Ändern der Punkte!");
        })
    }

    closeModal = () => {
        this.setState({modalVisible: false});
    }

    // Request edit of subject and refreshes header-title if successful
    requestSubjectEdit = (title, prozent, number) => {
        let p = editSubject(this.state.id, title, prozent, number);
        p.then((c) => {
            this.setState({subject: c}, () => {
                this.props.navigation.setOptions({title: this.state.subject.title});
            });
          }).catch((err) => {
            alert("Fehler beim Ändern des Fachs!");
          });
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
                <SubjectPopup 
                    visible={this.state.modalVisible}
                    closeFunction={this.closeModal}
                    modalTitle={"Fach bearbeiten"}
                    titleText={"Titel (alt: \"" + this.state.subject.title + "\")"}
                    prozentText={"Benötigte Prozent (alt: " + this.state.subject.needed + ")"}
                    numberText={"Anzahl der Übungen (alt: " + this.state.subject.number + ")"}
                    saveFunction={this.requestSubjectEdit}              
                    currentTitle={this.state.subject.title}
                    currentProzent={this.state.subject.needed + ""}
                    currentNumber={this.state.subject.number + ""}
                ></SubjectPopup>
            
               <ScrollView contentContainerStyle={styles.scrollViewStyle}>

               { this.state.subject.exercises.length > 2 && 
                   <LineChart
                   data={this.data}
                        width={screenWidth}
                        height={200}
                        fromZero={true}
                        yAxisSuffix={"%"}
                        chartConfig={chartConfig}
                        style={{marginBottom: 10}}
                   />
               }
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
