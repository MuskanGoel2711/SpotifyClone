import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff'},
    slide: { width, flex:2},
    image: { width: '100%', flex: 0.79 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: 'black'},
    description: { fontSize: 16, textAlign: 'center', marginTop: 10, paddingHorizontal: 20, color: 'black' },
    bottomContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    progressCircleContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressCircle: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderColor: '#f00',
        borderRadius: 25
    },
    arrowContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrowText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }

});

export default styles;
