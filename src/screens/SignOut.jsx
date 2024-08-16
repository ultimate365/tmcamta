import React, {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {THEME_COLOR} from '../utils/Colors';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import {useGlobalContext} from '../context/Store';
const SignOut = () => {
  const {setState} = useGlobalContext();
  const navigation = useNavigation();
  const signOut = async () => {
    await EncryptedStorage.clear();

    await auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login');
        setState({
          USER: {
            access: null,
            id: null,
          },
          MEMBER: {
            id: null,
            name: null,
            email: null,
            phone: null,
            role: null,
          },
        });
      })
      .catch(e => {
        console.log(e);
        navigation.navigate('Login');
      });
  };
  useEffect(() => {
    signOut();
  }, []);
  return (
    <View>
      <Text>SignOut</Text>
    </View>
  );
};

export default SignOut;
