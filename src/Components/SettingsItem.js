import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Switch} from 'react-native';

export default function SettingsItem({title, description, value}) {
    return (
        <View style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
                <Text style={styles.settingsItemTitle}>{title}</Text>
                <Text style={styles.settingsItemDescription}>{description}</Text>
            </View>
            <View style={styles.settingsItemRight}>
                <Switch value={value}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsItem: {
        borderBottomWidth: 1,
        marginHorizontal: 5,
        borderColor: "black",
        flexDirection: "row",
    },
    settingsItemLeft: {
        borderColor: "black",
        padding: 5,
        flex: 1
    },
    settingsItemTitle: {
        fontSize: 30
    },
    settingsItemDescription: {
        fontSize: 15,
        color: "#606060"
    },
    settingsItemRight: {
        justifyContent: 'center',
        paddingLeft: 10,
        marginVertical: 10,
        borderColor: "#D2D2D2",
        borderLeftWidth: 1
    }
});