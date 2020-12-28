import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    // Style for container with ScrollView
    container: {
        flex: 1,
    },
    containerScrollView: {
        padding: 5,
        paddingBottom: 65
    },
    bottomButton: {
        bottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 2,
        alignSelf: "center",
        borderWidth: 1,
        position: "absolute",
    },
    bottomButtonText: {
        fontSize: 20,
    },

    // Style for SubjectButton
    subjectButtonContainer: {
        borderWidth: 1,
        marginBottom: 5,
        padding: 5,
        flexDirection: "row",
        borderColor: '#5C5C5C',
        backgroundColor: 'white'
    },
    subjectButtonPercentView: {
        borderRightWidth: 1,
        width: 70,
        paddingRight: 5,
        borderColor: "#5C5C5C"
    },
    subjectButtonBigText: {
        fontSize: 25
    },
    subjectButtonSmallText: {
        color: "#7D7D7D"
    },
    subjectButtonTitle: {
        paddingLeft: 10,
    },

    // Style for Popup
    popupShadow: {
        flex: 1,
        position: 'relative',
        backgroundColor: "rgba(0,0,0,0.7)"
    },
    popupContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        flexDirection: "column",
        backgroundColor: "#EFEFEF",
        height: "65%",
        flexGrow: 1
    },
    popupButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 30,
    },
    popupHeader: {
        color: "black",
        fontSize: 30,
        textDecorationLine: "underline",
        marginBottom: 10,
        textAlign: "center"
    },
    popupSection: {
    },
    popupInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: "black",
        paddingHorizontal: 10
    },
    popupText: {
        color: "black",
        fontSize: 20,
        marginBottom: 5
    },
    popupError: {
        color: "red",
        fontSize: 16
    },

    // Style for Settings
    settingsResetButton: {
        marginTop: 40,
        marginHorizontal: 50
    },
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