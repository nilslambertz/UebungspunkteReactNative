import React from 'react';
import { Text, View, Alert, Switch} from 'react-native';
import style from '../../Style/style';

export default function SettingsItem({id, title, description, value, changeFunction}) {
    function changeValue(x) {
        changeFunction(id, x);
    }

    return (
        <View style={style.settingsItem}>
            <View style={style.settingsItemLeft}>
                <Text style={style.settingsItemTitle}>{title}</Text>
                <Text style={style.settingsItemDescription}>{description}</Text>
            </View>
            <View style={style.settingsItemRight}>
                <Switch value={value} onValueChange={changeValue}/>
            </View>
        </View>
    )
}