import {View, LogBox, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GlobalContextProvider} from './src/context/Store';
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <GlobalContextProvider>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <GestureHandlerRootView style={{flex: 1}}>
            <KeyboardAvoidingView style={{flex: 1}}>
              <AppNavigator />
            </KeyboardAvoidingView>
          </GestureHandlerRootView>
        </View>
      </SafeAreaView>
    </GlobalContextProvider>
  );
};

export default App;
