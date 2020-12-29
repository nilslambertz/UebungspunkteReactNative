import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import {changeExercisePoints, deleteExercise, addExercise, editSubject, getSettings} from '../../Utils/FileManagement';
import ExerciseView from './ExerciseView';
import SubjectPopup from '../Popup/SubjectPopup';
import { Chart, VerticalAxis, HorizontalAxis, Line, Area } from 'react-native-responsive-linechart'
import style from '../../Style/style';

class SubjectScreen extends Component {  
    data = [];
    neededData = [];

    constructor(props) {
      super(props);
      let params = props.route.params;
      this.state = {
          id: params.id, // ID of the subject
          subject: params.subject, // Subject-object
          theme: params.theme, // Current theme
          updateKey: 0, // Key used to update the list (so React needs to refresh the screen)
          newExercise: false, // If the "Add exercise"-button was pressed
          modalVisible: false, // If the "Edit subject"-modal is visible
          drawGraph: false // If the graph should be drawn
        }
        this.createData();

      getSettings().then((c) => {
          let draw = c["drawGraph"]["value"];
          this.setState({drawGraph: draw});
      })
    }

    createData = () => {
        this.data = [];
        this.neededData = [];
        let needed = this.state.subject.needed;

        for(let i in this.state.subject.exercises) {
            let elem = this.state.subject.exercises[i];
            let val = Math.round(elem[0] * 100 / elem[1]);
            if(val < 0) val = 0;
            if(val > 100) val = 100;
            let index = parseInt(i)+1;
            this.data.push({x: index, y: val});
            this.neededData.push({x: index, y: needed});
        }
    }

    // Sets the header-text to the subject-title
    componentDidMount() {
        this.props.navigation.setOptions({headerRight: (p) => (
            <View style={{marginRight: 10}}><Button title="Anpassen" onPress={() => {
                this.setState({modalVisible: true});
            }}/></View>
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
        let theme = this.state.theme;

        for(let i = 0; i < len; i++) {
            let c = this.state.subject.exercises[i];
            exerciseList.push(<ExerciseView key={this.state.updateKey.toString() + "-" + i.toString()} theme={theme} index={i} points={c[0]} max={c[1]} pressFunction={this.changePoints} longPressFunction={this.exerciseDeleteAlert}/>)
        }

        let maxPt = (len === 0 ? 10 : this.state.subject.exercises[len-1][1]);


        return (
            <View style={[style.container, theme.container]}>
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
                    theme={theme}
                />

                <ScrollView
                    contentContainerStyle={[style.containerScrollView, theme.containerScrollView]}
                    ref={ref => this.scrollView = ref}
                >

               { this.state.drawGraph && this.state.subject.exercises.length > 2 &&
                   <Chart
                    style={{ height: 200, width: '100%', marginBottom: 5 }}
                    xDomain={{ min: 1, max: this.data.length }}
                    yDomain={{ min: 0, max: 100 }}
                    padding={{ left: 20, top: 10, bottom: 20, right: 10 }}
                    disableTouch={true}
                    disableGestures={true}
                    >
                    <VerticalAxis tickValues={[25, 50, 75, 100]} />
                    <HorizontalAxis tickCount={this.data.length} />
                    <Area 
                        theme={{ gradient: { from : { color: '#FF0000', opacity: 0.3 }, to : { color: '#FF0000' , opacity: 0.2 } } }} 
                        smoothing="none"
                        data={this.neededData} 
                    />
                    <Area 
                        theme={{ gradient: { from : { color: '#316CD4', opacity: 0.6 }, to : { color: '#81A8EE' , opacity: 0.2 } } }} 
                        smoothing="cubic-spline"
                        data={this.data} 
                    />
                    <Line data={this.neededData} smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
                    <Line data={this.data} smoothing="cubic-spline" theme={{ stroke: { color: '#316CD4', width: 1 }, scatter: { default: { width: 6, height: 6, rx: 6, color: '#316CD4' }}}} />
                    </Chart>
               }
                  {
                     exerciseList
                  }
                  { this.state.newExercise === true &&
                      <ExerciseView
                          key={"newExercise"}
                          index={len}
                          points={0}
                          max={maxPt}
                          pressFunction={this.requestExerciseAdd}
                          longPressFunction={() => {}}
                          newExercise={true}
                          theme={theme}
                      />
                  }
                </ScrollView>
                <TouchableOpacity style={[style.bottomButton, theme.bottomButton]} onPress={this.newSubjectPress}>
                    <View>
                        <Text style={[style.bottomButtonText, theme.bottomButtonText]} onPress={this.newExercisePress}>Übung hinzufügen</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };
}

export default SubjectScreen;