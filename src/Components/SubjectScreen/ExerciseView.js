import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import style from '../../Style/style';

export default function ExerciseView({index, points, max, pressFunction, longPressFunction, newExercise}) {
    const [pointText, setPointText] = useState(points);
    const [maxText, setMaxText] = useState(max);
    const [confirmed, setConfirmed] = useState(true);

    const containerStyle = (newExercise ? [style.exerciseViewContainer, style.newExercise] : style.exerciseViewContainer);

    return (
        <TouchableOpacity onLongPress={() => {longPressFunction(index)}}>
            <View style={containerStyle}>
                <View style={style.exerciseNumber}>
                    <Text style={style.exerciseNumberText}>{index+1}</Text>
                </View>
                <View style={style.exerciseContent}>
                    <TextInput style={style.exerciseInput} keyboardType='numeric' onChangeText={t => {
                        setPointText(t);
                        setConfirmed(false);
                    }}>{pointText}</TextInput>
                    <Text style={style.exerciseDivider}>/</Text>
                    <TextInput style={style.exerciseInput} keyboardType='numeric' onChangeText={t => {
                        setMaxText(t);
                        setConfirmed(false);
                    }}>{maxText}</TextInput>
                </View>
                { !confirmed &&
                <View style={style.exerciseOkayButton}>
                    <Button title={"Speichern"} onPress={() => {
                        setConfirmed(true);
                        pressFunction(index, parseFloat(pointText + ""), parseFloat(maxText + ""));
                    }}/>
                </View>
                }
            </View>
        </TouchableOpacity>
    );
}