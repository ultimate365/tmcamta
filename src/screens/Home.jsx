import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {useGlobalContext} from '../context/Store';
import RNExitApp from 'react-native-exit-app';
import AdminsArea from './AdminsArea';
import PublicArea from './PublicArea';
import UsersArea from './UsersArea';
import BottomNav from './BottomNav';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {THEME_COLOR} from '../utils/Colors';
import Toast from 'react-native-toast-message';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const Home = () => {
  const {state, setActiveTab} = useGlobalContext();

  const userDetails = state.USER;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [backPressCount, setBackPressCount] = useState(0);

  const handleBackPress = useCallback(() => {
    if (backPressCount === 0) {
      setBackPressCount(prevCount => prevCount + 1);
      setTimeout(() => setBackPressCount(0), 2000);
    } else if (backPressCount === 1) {
      RNExitApp.exitApp();
    }
    return true;
  }, [backPressCount]);

  const showConfirmDialog = () => {
    return Alert.alert(
      'Hold On!',
      'Are You Sure? This Can Delete All App Data',
      [
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'Cancel',
          onPress: () => showToast('success', 'User Not Logged Out'),
        },

        {
          text: 'Yes, Only Logout',
          onPress: async () => {
            await EncryptedStorage.removeItem('user');
            navigation.navigate('Splash');
          },
        },

        // The "Yes" button
        {
          text: 'Yes, Delete All Data',
          onPress: async () => {
            await EncryptedStorage.clear();

            navigation.navigate('Splash');
          },
        },
      ],
    );
  };
  useEffect(() => {
    const backListener = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return backListener.remove;
  }, [handleBackPress]);
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          onPress={() => {
            setActiveTab(0);
            navigation.navigate('Home');
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'baseline',
              alignSelf: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Image
              source={require('../assets/images/mamata.png')}
              style={{width: 60, height: 60}}
            />
            <Image
              source={require('../assets/images/ab.png')}
              style={{width: 50, height: 50, marginLeft: -responsiveWidth(5)}}
            />
            <Image
              source={require('../assets/images/sp.png')}
              style={{width: 40, height: 40, marginLeft: -responsiveWidth(5)}}
            />
          </View>
          <Image
            source={require('../assets/images/logo.png')}
            style={{width: 70, height: 70}}
          />
          <Text style={styles.logoTitle}>{`আমতা কেন্দ্র\nতৃণমূল কংগ্রেস`}</Text>
          {userDetails.access !== null ? (
            <TouchableOpacity
              onPress={async () => {
                showConfirmDialog();
              }}>
              <MaterialCommunityIcons name="logout" size={30} color={'red'} />
              <Text style={{color: 'red'}}>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                navigation.navigate('Login');
              }}>
              <MaterialCommunityIcons name="login" size={30} color={'green'} />
              <Text style={{color: 'green'}}>Log in</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: responsiveHeight(9)}}>
        {userDetails?.access === 'admin' ? (
          <AdminsArea />
        ) : userDetails?.access === 'user' ? (
          <UsersArea />
        ) : (
          <PublicArea />
        )}
        <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
          <BottomNav />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    fontSize: responsiveFontSize(2),
    color: THEME_COLOR,
    textAlign: 'center',
  },
  header: {
    position: 'absolute',
    width: responsiveWidth(100),
    height: responsiveHeight(8.5),
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    borderBottomLeftRadius: responsiveWidth(3),
    borderBottomRightRadius: responsiveWidth(3),
    paddingBottom: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
  },
  title: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(5),
    color: THEME_COLOR,
  },
  logoTitle: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    paddingHorizontal: responsiveWidth(2),

    color: THEME_COLOR,
    fontFamily: 'kalpurush',
  },
});
