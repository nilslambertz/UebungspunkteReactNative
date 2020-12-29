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
    },
    subjectButtonPercentView: {
        borderRightWidth: 1,
        width: 70,
        paddingRight: 5,
    },
    subjectButtonBigText: {
        fontSize: 25
    },
    subjectButtonSmallText: {
    },
    subjectButtonTitle: {
        paddingLeft: 10,
    },

    // Style for Popup
    popupShadow: {
        flex: 1,
        position: 'relative'
    },
    popupContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        flexDirection: "column",
        height: "65%",
        flexGrow: 1
    },
    popupButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 30,
    },
    popupHeader: {
        fontSize: 30,
        textDecorationLine: "underline",
        marginBottom: 10,
        textAlign: "center"
    },
    popupSection: {
    },
    popupInput: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10
    },
    popupText: {
        fontSize: 20,
        marginBottom: 5
    },
    popupError: {
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
    },

    // Style for ExerciseView
    exerciseViewContainer: {
        borderWidth: 1,
        marginBottom: 5,
        padding: 5,
        flexDirection: "row",
        borderColor: '#5C5C5C',
        backgroundColor: 'white'
    },
    newExercise: {
        backgroundColor: "#EBB1B1"
    },
    exerciseNumber: {
        borderRightWidth: 1,
        justifyContent: "center",
        width: 50,
        paddingRight: 5,
        borderColor: "#5C5C5C"
    },
    exerciseNumberText: {
        fontSize: 25,
        textAlign: "center"
    },
    exerciseContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10
    },
    exerciseDivider: {
        fontSize: 30,
        paddingHorizontal: 10
    },
    exerciseInput: {
        fontSize: 20,
        borderColor: "gray",
        flex: 1,
        borderWidth: 1,
        padding: 5
    },
    exerciseOkayButton: {
        paddingLeft: 10,
        justifyContent: "center",
        borderLeftWidth: 1,
        borderColor: "#5C5C5C"
    }
});