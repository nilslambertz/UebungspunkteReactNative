import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import style from '../../Style/style';

export default function ExerciseView({index, points, max, pressFunction, longPressFunction, newExercise, theme}) {
    const [pointText, setPointText] = useState(points);
    const [maxText, setMaxText] = useState(max);
    const [confirmed, setConfirmed] = useState(true);

    const containerStyle = (newExercise ? [style.exerciseViewContainer, theme.exerciseViewContainer, theme.newExercise] : [style.exerciseViewContainer, theme.exerciseViewContainer]);

    return (
        <TouchableOpacity onLongPress={() => {longPressFunction(index)}}>
            <View style={containerStyle}>
                <View style={[style.exerciseNumber, theme.exerciseNumber]}>
                    <Text style={[style.exerciseNumberText, theme.exerciseNumberText]}>{index+1}</Text>
                </View>
                <View style={[style.exerciseContent, theme.exerciseContent]}>
                    <TextInput style={[style.exerciseInput, theme.exerciseInput]} keyboardType='numeric' onChangeText={t => {
                        setPointText(t);
                        setConfirmed(false);
                    }}>{pointText}</TextInput>
                    <Text style={[style.exerciseDivider, theme.exerciseDivider]}>/</Text>
                    <TextInput style={[style.exerciseInput, theme.exerciseInput]} keyboardType='numeric' onChangeText={t => {
                        setMaxText(t);
                        setConfirmed(false);
                    }}>{maxText}</TextInput>
                </View>
                { !confirmed &&
                <View style={[style.exerciseOkayButton, theme.exerciseOkayButton]}>
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