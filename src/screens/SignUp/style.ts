import { StyleSheet } from "react-native";
import { vw, vh } from '../../utils/Dimensions';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    viewContainer: {
        flexDirection: 'row',
    },
    leftContainer: {

    },
    left: {
        width: vw(30),
        height: vh(30),
        tintColor: 'white'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        width: '80%'
    },
    inpCont: {
        margin: 8
    },
    placeholderText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 20
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#70706e',
        position: 'relative',
        marginTop: 5,
        color: 'white'
    },
    eyeContainer: {
        position: 'absolute',
        right: 20,
        top: 17
    },
    eye: {
        width: vw(30),
        height: vh(30),
    },
    buttonContainer: {
        backgroundColor: '#70706e',
        borderRadius: 50,
        padding: 20,
        width: '30%',
        marginTop: 40,
        marginLeft: 140
    },
    buttonDisabled: {
        backgroundColor: '#292525',
        borderRadius: 50,
        padding: 20,
        width: '30%',
        marginTop: 40,
        marginLeft: 140
    },
    buttonText: {
        color: '#c9c4c3',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    }
})

export default styles;