import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import SettingsItem from "./SettingsItem";
import {getSettings} from "../Utils/FileManagement";

class Settings extends Component {
    constructor(props) {
        super(props);
        let p = getSettings();
        this.state = {
            settings: {}
        }
        p.then((c) => {
            this.setState({settings: c});
        })
    }

    printSettingsList = () => {
        let settings = this.state.settings;
        return Object.keys(settings).map(function(c, i) {
            let obj = settings[c];
            return <SettingsItem key={i} value={obj["value"]} description={obj["description"]} title={obj["title"]} />
        });
    }

    render() {
        return (
            <View>
                { this.printSettingsList() }
            </View>
        )
    }
}

export default Settings;