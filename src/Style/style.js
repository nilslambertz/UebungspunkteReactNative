import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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