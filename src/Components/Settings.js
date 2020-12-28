import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import SettingsItem from "./SettingsItem";
import {changeSettings, getSettings} from "../Utils/FileManagement";

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

    changeValue = (id, newValue) => {
        changeSettings(id, newValue).then((s) => {
            this.setState({settings: s});
        }).catch((err) => {
            alert("Error while changing setting!");
            console.log(err);
        })
    }

    printSettingsList = () => {
        let settings = this.state.settings;
        let changeFunction = this.changeValue;
        return Object.keys(settings).map(function(c, i) {
            let obj = settings[c];
            return <SettingsItem key={c} id={c} value={obj["value"]} description={obj["description"]} title={obj["title"]} changeFunction={changeFunction}/>
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