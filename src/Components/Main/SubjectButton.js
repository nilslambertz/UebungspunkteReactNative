import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import style from '../../Style/style';

export default function SubjectButton({subject, id, deleteAlert, navigation}) {
    let needed = subject.needed; // Percent needed for this subject
    let exercises = subject.exercises; // All exercises
    let count = exercises.length; // Number of exercises

    let points = 0; // Total reached points
    let max = 0; // Maximum points which could be reached
    let reachedPercent = 0; // Reached percent (points/max)
    for(let x of exercises) {
        points += x[0];
        max += x[1];
    }
    if(max !== 0) {
        reachedPercent = Number.parseInt(Math.round((points / max) * 100));
        if(reachedPercent > 100) reachedPercent = 100;
        if(reachedPercent < 0) reachedPercent = 0;
    }

    let uebungsText = count + " Übungen";
    if(count === 0) uebungsText = "Noch keine Übung :'(";
    if(count === 1) uebungsText = "Eine Übung";

    return (
        <TouchableOpacity onLongPress={() => deleteAlert(id)} onPress={() => {
            navigation.navigate('SubjectScreen', { subject, id });
        }}>
            <View style={style.subjectButtonContainer}>
                <View style={style.subjectButtonPercentView}>
                    <Text style={style.subjectButtonBigText}>{reachedPercent}%</Text>
                    <Text style={style.subjectButtonSmallText}>/{needed}%</Text>
                </View>
                <View style={style.subjectButtonTitle}>
                    <Text style={style.subjectButtonBigText}>{subject.title}</Text>
                    <Text style={style.subjectButtonSmallText}>{uebungsText}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  }