import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useGlobalContext} from '../context/Store';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const AdminsArea = () => {
  const {state} = useGlobalContext();
  const user = state.USER;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (user.access !== 'admin') {
      navigation.navigate('SignOut');
    }
  }, [isFocused, state]);
  return (
    <View>
      <Text>AdminsArea</Text>
    </View>
  );
};

export default AdminsArea;

const styles = StyleSheet.create({});
