import React from 'react';
import { Text, View, Alert, Switch} from 'react-native';
import style from '../../Style/style';

export default function SettingsItem({id, title, description, value, changeFunction, theme}) {
    function changeValue(x) {
        changeFunction(id, x);
    }

    return (
        <View style={[style.settingsItem, theme.settingsItem]}>
            <View style={[style.settingsItemLeft, theme.settingsItemLeft]}>
                <Text style={[style.settingsItemTitle, theme.settingsItemTitle]}>{title}</Text>
                <Text style={[style.settingsItemDescription, theme.settingsItemDescription]}>{description}</Text>
            </View>
            <View style={[style.settingsItemRight, theme.settingsItemRight]}>
                <Switch value={value} onValueChange={changeValue}/>
            </View>
        </View>
    )
}