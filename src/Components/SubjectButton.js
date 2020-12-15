import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SubjectButton({subject, id, deleteAlert, navigation}) {
    let needed = subject.needed;
    let exercises = subject.exercises;
    let title = subject.title;
    let count = exercises.length;
    let points = 0;
    let max = 0;
    for(let x of exercises) {
        points += x[0];
        max += x[1];
    }
    let reached = Number.parseInt(Math.round((points / max) * 100));

    return (
        <TouchableOpacity onLongPress={() => deleteAlert(id)} onPress={() => {
            navigation.navigate('SubjectScreen', { subject, id });
        }
        }>
            <View style={styles.container}>
                <View style={styles.percentView}>
                    <Text style={styles.bigText}>{reached}%</Text>
                    <Text style={styles.smallText}>/{needed}%</Text>
                </View>
                <View style={styles.titleView}> 
                    <Text style={styles.bigText}>{title}</Text>
                    <Text style={styles.smallText}>{parseInt(count) === 1 ? "Eine Übung" : count + " Übungen"}</Text>
                </View>
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
     percentView: {
        borderRightWidth: 1,
        width: 70,
        paddingRight: 5,
        borderColor: "#5C5C5C"
     },
     bigText: {
         fontSize: 25
     },
     smallText: {
         color: "#7D7D7D"
     },
     titleView: {
        paddingLeft: 10,
     }
  });