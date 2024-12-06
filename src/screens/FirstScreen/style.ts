import { StyleSheet } from "react-native";
import {vw,vh} from '../../utils/Dimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    image: {
        width: vw(80),
        height: vh(80),
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    buttonContainer: {
        borderRadius: 30,
        marginTop: 30,
        borderWidth: 1,
        paddingHorizontal: 90,
        paddingVertical: 10,
        backgroundColor: '#2ade78'
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold'
    },
    buttonCont: {
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 15,
        width: '75%'
    },
    image1: {
        width: vw(20),
        height: vh(20),
        tintColor: 'white'
    },
    buttonText1: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 15,
        fontWeight: 'bold'
    },
    Text: {
        color: 'white',
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default styles;