import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

export default function ExerciseView() {
    return (
        <TouchableOpacity onLongPress={() => {}}>
            <View style={styles.container}>
                <View style={styles.exerciseNumber}>
                    <Text style={styles.exerciseNumberText}>1</Text>
                </View>
                <View style={styles.centerView}> 
                    <Text>test</Text>
                </View>
                <View style={styles.okayButtonView}>
                    <Button title="Okay" onPress={() => {}}></Button>
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
     exerciseNumber: {
        borderRightWidth: 1,
        width: 50,
        paddingRight: 5,
        borderColor: "#5C5C5C"
     },
     exerciseNumberText: {
         fontSize: 25,
         textAlign: "center"
     },
     centerView: {
        flex: 1
     },
     okayButtonView: {
        paddingLeft: 5,
        borderLeftWidth: 1,
        borderColor: "#5C5C5C"
     }
  });