import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';

export default function ExerciseView({index, points, max, pressFunction, longPressFunction, newExercise}) {
    const [pointText, setPointText] = useState(points);
    const [maxText, setMaxText] = useState(max);
    const [confirmed, setConfirmed] = useState(true);

    const containerStyle = (newExercise ? [styles.container, styles.newExercise] : styles.container);

    return (
        <TouchableOpacity onLongPress={() => {longPressFunction(index)}}>
            <View style={containerStyle}>
                <View style={styles.exerciseNumber}>
                    <Text style={styles.exerciseNumberText}>{index+1}</Text>
                </View>
                <View style={styles.centerView}> 
                    <TextInput style={styles.input} keyboardType='numeric' onChangeText={t => {
                        setPointText(t);
                        setConfirmed(false);
                    }}>{pointText}</TextInput>
                    <Text style={styles.centerDivider}>/</Text>
                    <TextInput style={styles.input} keyboardType='numeric' onChangeText={t => {
                        setMaxText(t);
                        setConfirmed(false);
                    }}>{maxText}</TextInput>
                </View>
                { !confirmed &&
                <View style={styles.okayButtonView}>
                    <Button title={"Speichern"} onPress={() => {
                        setConfirmed(true);
                        pressFunction(index, parseFloat(pointText), parseFloat(maxText));
                    }}/>
                </View>
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      marginBottom: 5,
      padding: 5,
      flexDirection: "row",
      borderColor: '#5C5C5C',
      backgroundColor: 'white'
    },
    newExercise: {
        backgroundColor: "#EBB1B1"
    },
    exerciseNumber: {
        borderRightWidth: 1,
        justifyContent: "center",
        width: 50,
        paddingRight: 5,
        borderColor: "#5C5C5C"
     },
     exerciseNumberText: {
         fontSize: 25,
         textAlign: "center"
     },
     centerView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10
     },
     centerDivider: {
        fontSize: 30,
        paddingHorizontal: 10
     },
     input: {
        fontSize: 20,
        borderColor: "gray",
        flex: 1,
        borderWidth: 1,
        padding: 5
     },
     okayButtonView: {
        paddingLeft: 10,
        justifyContent: "center",
        borderLeftWidth: 1,
        borderColor: "#5C5C5C"
     }
  });