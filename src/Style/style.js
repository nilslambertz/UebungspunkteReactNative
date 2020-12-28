import {StyleSheet} from 'react-native';

// Style for container with ScrollView
const containerStyle = StyleSheet.create({
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
    }
});

// Style for SubjectButton
const subjectButtonStyle = StyleSheet.create({
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
    }
});

export default StyleSheet.flatten([containerStyle, subjectButtonStyle]);