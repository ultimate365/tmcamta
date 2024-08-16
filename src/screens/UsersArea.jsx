import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useGlobalContext} from '../context/Store';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const UsersArea = () => {
  const {state} = useGlobalContext();
  const user = state.USER;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (user.access === null) {
      navigation.navigate('SignOut');
    }
  }, [isFocused, state]);
  return (
    <View>
      <Text>UsersArea</Text>
    </View>
  );
};

export default UsersArea;

const styles = StyleSheet.create({});
