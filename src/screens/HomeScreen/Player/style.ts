import { StyleSheet, Dimensions } from "react-native";
import { vh, vw } from '../../../utils/Dimensions';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222833'
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    left: {
        width: vw(30),
        height: vh(30),
        tintColor: 'white'
    },
    imageContainer: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // activeSong: { borderColor: '#FFD369', borderWidth: 1 },
    imageWrapper: {
        width: vw(300),
        height: vh(350),
        marginBottom: 30,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,

    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE',
        alignItems: 'center'
    },
    artistName: {
        fontSize: 16,
        fontWeight: '200',
        textAlign: 'center',
        color: '#EEEEEE',
        marginTop: 7
    },
    flatListContent: {
        alignItems: 'center',
    },
    progressContainer: {
        width: vw(320),
        height: vh(40),
        marginTop: 25,
        flexDirection: 'row',
    },
    progressLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    progressLabelText: {
        color: '#fff'
    },
    musicControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginTop: 28
    },
    icon: { marginTop: 10 },
    bottomView: {
        width: width,
        alignItems: 'center',
        paddingVertical: 15,
    },
    bottomIconsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    }
})
export default styles;