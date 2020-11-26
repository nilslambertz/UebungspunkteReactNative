import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function SubjectButton({reached, needed, title, count}) {
    return (
        <TouchableHighlight>
            <View style={styles.container}>
                <View style={styles.percentView}>
                    <Text style={styles.bigText}>{reached}%</Text>
                    <Text style={styles.smallText}>/{needed}%</Text>
                </View>
                <View style={styles.titleView}> 
                    <Text style={styles.bigText}>{title}</Text>
                    <Text style={styles.smallText}>{count} Übung{parseInt(count) === 1 ? "" : "en"}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      margin: 5,
      marginBottom: 0,
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
         fontSize: 23
     },
     smallText: {
         color: "#7D7D7D"
     },
     titleView: {
        paddingLeft: 10,
     }
  });