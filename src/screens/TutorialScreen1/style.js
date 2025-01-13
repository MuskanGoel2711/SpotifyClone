import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  slide: {
    width,
    alignItems: 'center',
  },
  overlay: {
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '80%',
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    // color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    // color: 'white',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginHorizontal: 5,
    marginBottom: 25
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonContainer: {
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  Login: {
    backgroundColor: 'white',
    borderRadius: 80
  },
  ViewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 45
  }
});

export default styles;