import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Button} from 'react-native';
import SettingsItem from "./SettingsItem";
import {changeSettings, getSettings, resetSettings} from "../Utils/FileManagement";

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

    requestSettingsReset = () => {
        Alert.alert(
            'Warnung',
            "Willst du die Einstellungen wirklich zurücksetzen?",
            [
                {
                    text: "JA, zurücksetzen",
                    style: 'destructive',
                    onPress: () => {
                        resetSettings().then((s) => {
                            console.log(s);
                            this.setState({settings: s});
                        }).catch((err) => {
                            alert("Error while resetting settings!");
                            console.log(err);
                        })
                    }
                },
                {
                    text: "NEIN, abbrechen",
                    style: 'cancel'
                }
            ]
        )
    }

    render() {
        return (
            <ScrollView>
                { this.printSettingsList() }
                <View style={styles.resetButton}>
                    <Button color={"red"} onPress={this.requestSettingsReset} title={"Einstellungen zurücksetzen"}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    resetButton: {
        marginTop: 40,
        marginHorizontal: 50
    }
});

export default Settings;