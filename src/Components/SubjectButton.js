import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function SubjectButton({subject, id, deleteAlert}) {
    let needed = subject.needed;
    let exercises = subject.exercises;
    let title = subject.title;
    let count = exercises.length;
    let reached = 20;

    return (
        <TouchableHighlight onLongPress={() => deleteAlert(id)}>
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
        </TouchableHighlight>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      margin: 6,
      marginBottom: 3,
      marginTop: 3,
      padding: 5,
      flexDirection: "row",
      borderColor: '#5C5C5C',
      backgroundColor: 'white'
     },
     percentView: {
        borderRightWidth: 1,
        paddingRight: 10,
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