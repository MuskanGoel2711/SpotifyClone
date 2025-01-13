import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import {vh,vw} from '../../utils/Dimensions';

const styles = StyleSheet.create<{
    MainContainer: ViewStyle;
    RootView: ViewStyle;
    ChildView: ViewStyle;
    gif: ImageStyle;
}>({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
        // backgroundColor: '#050505',
    },
    RootView: {
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    ChildView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: vw(380),
        height: vh(250),
    },
});

export default styles;