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
            width: vw(5),
            height: vh(5)
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        fontSize: 16,
        marginBottom: 10,
      },
      modalButton: {
        color: '#FFD369',
        fontWeight: 'bold',
      },
})
export default styles;