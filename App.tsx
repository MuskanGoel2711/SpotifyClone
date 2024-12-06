import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import NativeStack from './src/navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <NativeStack />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>


  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
