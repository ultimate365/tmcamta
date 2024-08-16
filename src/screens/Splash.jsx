import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  StatusBar,
  Linking,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {THEME_COLOR} from '../utils/Colors';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import EncryptedStorage from 'react-native-encrypted-storage';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useGlobalContext} from '../context/Store';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import RNExitApp from 'react-native-exit-app';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Indicator from '../components/Indicator';
import {appVersion} from '../modules/constants';

const Splash = () => {
  const {setState} = useGlobalContext();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showLoader, setShowLoader] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const gerua = useSharedValue(-responsiveWidth(100));
  const white = useSharedValue(-responsiveWidth(100));
  const green = useSharedValue(-responsiveWidth(100));
  const tmcLogo = useSharedValue(0);
  const [showTmcLogo, setShowTmcLogo] = useState(false);
  const maaMatiManush = useSharedValue(0);
  const [showMMM, setShowMMM] = useState(false);
  const tmcJindabad = useSharedValue(0);
  const mamataJindabad = useSharedValue(0);
  const avishekJindabad = useSharedValue(0);
  const sukantaJindabad = useSharedValue(0);
  const jonogonImage = useSharedValue(0);
  const [showJonogon, setShowJonogon] = useState(false);
  const mamataImage = useSharedValue(0);
  const [showMamataImage, setShowMamataImage] = useState(false);
  const avishekImage = useSharedValue(0);
  const [showAvishekImage, setShowAvishekImage] = useState(false);
  const sukantaImage = useSharedValue(0);
  const [showSukantaImage, setShowSukantaImage] = useState(false);
  const logoImage = useSharedValue(0);
  const flagAnimation = () => {
    setTimeout(() => {
      gerua.value = withTiming(responsiveWidth(0));
      setTimeout(() => {
        white.value = withTiming(responsiveWidth(0), 100);
        setTimeout(() => {
          setShowMMM(true);
          maaMatiManush.value = withTiming(responsiveFontSize(7), 1000);
          setShowJonogon(true);
          jonogonImage.value = withTiming(responsiveWidth(60), 1000);
          setTimeout(() => {
            maaMatiManush.value = 0;
            setShowMMM(false);
            setShowJonogon(false);
            jonogonImage.value = 0;
            setTimeout(() => {
              setShowTmcLogo(true);
              tmcJindabad.value = withTiming(responsiveFontSize(7), 1000);
              tmcLogo.value = withTiming(1.15, 1000);
              setTimeout(() => {
                tmcJindabad.value = 0;
                setTimeout(() => {
                  mamataJindabad.value = withTiming(
                    responsiveFontSize(7),
                    1000,
                  );
                  setShowMamataImage(true);
                  mamataImage.value = withTiming(responsiveWidth(60), 1000);
                  setTimeout(() => {
                    mamataJindabad.value = 0;
                    mamataImage.value = withTiming(0, 1000);
                    setShowMamataImage(true);
                    setTimeout(() => {
                      avishekJindabad.value = withTiming(
                        responsiveFontSize(5),
                        1000,
                      );
                      setShowAvishekImage(true);
                      avishekImage.value = withTiming(
                        responsiveWidth(60),
                        1000,
                      );
                      setTimeout(() => {
                        avishekJindabad.value = 0;
                        avishekImage.value = withTiming(0, 1000);
                        setShowAvishekImage(false);
                        setTimeout(() => {
                          sukantaJindabad.value = withTiming(
                            responsiveFontSize(7),
                            1000,
                          );
                          setShowSukantaImage(true);
                          sukantaImage.value = withTiming(
                            responsiveWidth(60),
                            1000,
                          );
                          setTimeout(() => {
                            sukantaJindabad.value = 0;
                            sukantaImage.value = 0;
                            setShowSukantaImage(false);
                            setShowTmcLogo(false);
                            setShowFlag(false);
                            logoImage.value = withTiming(
                              responsiveWidth(60),
                              1000,
                            );
                            setShowLoader(true);
                            // next iteration
                            setTimeout(() => {
                              getDetails();
                            }, 2000);
                          }, 1000);
                        }, 200);
                      }, 1000);
                    }, 200);
                  }, 1000);
                }, 200);
              }, 1000);
            }, 200);
          }, 1000);
        }, 200);
      }, 500);
      green.value = withTiming(responsiveWidth(0), 500);
    }, 500);
  };

  const getDetails = async () => {
    console.log('Called');
    const userDetails = JSON.parse(await EncryptedStorage.getItem('user'));
    const memberDetails = JSON.parse(await EncryptedStorage.getItem('member'));
    const loggedAt = parseInt(await EncryptedStorage.getItem('loggedAt'));
    const token = await EncryptedStorage.getItem('token');
    try {
      await firestore()
        .collection('appUpdate')
        .get()
        .then(async snapshot => {
          const data = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }))[0];
          console.log(data.appVersion >= appVersion);
          if (data.update) {
            if (data.appVersion === appVersion) {
              if (userDetails != null) {
                if ((Date.now() - loggedAt) / 1000 / 60 / 15 < 1) {
                  setState({
                    USER: userDetails,
                    MEMBER: memberDetails,
                    TOKEN: token,
                    LOGGEDAT: loggedAt,
                  });
                  console.log('User Not Logged');

                  setTimeout(() => {
                    setShowLoader(false);
                    navigation.navigate('Home');
                  }, 1000);
                } else {
                  console.log('User Logged');
                  await firestore()
                    .collection('usermembers')
                    .where('userid', '==', userDetails.userid)
                    .get()
                    .then(snapshot => {
                      let userData = snapshot.docs[0]._data;

                      if (userData.disabled) {
                        console.log('User Disabled');

                        showToast(
                          'error',
                          'Your Account Has Been Disabled.',
                          'Contact TMC AMTA Admin',
                        );
                        setTimeout(() => {
                          setShowLoader(false);
                          navigation.navigate('SignOut');
                        }, 1000);
                      } else {
                        setState({
                          USER: userDetails,
                          MEMBER: memberDetails,
                          TOKEN: token,
                          LOGGEDAT: loggedAt,
                        });

                        console.log('User Settled going to Home Page');
                        setTimeout(() => {
                          setShowLoader(false);
                          navigation.navigate('Home');
                        }, 1000);
                      }
                    })
                    .catch(async e => {
                      setShowLoader(false);
                      console.log(e);
                      await EncryptedStorage.clear();
                      navigation.navigate('Login');
                    });
                }
              } else {
                setTimeout(async () => {
                  setShowLoader(false);
                  navigation.navigate('Home');
                  console.log('Going to Home Page');
                }, 1000);
              }
            }
          }
        })
        .catch(e => {
          setShowLoader(false);
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 1500,
      position: 'top',
      topOffset: 500,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowFlag(true);
      flagAnimation();
    }, 200);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/gorjon2.jpg')}
        style={{
          zIndex: -4,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: responsiveWidth(100),
          height: responsiveHeight(100),
        }}
      />
      <View style={{marginTop: responsiveHeight(5)}}>
        {showMMM && (
          <Animated.Text
            style={[
              styles.jindabad,
              {fontSize: maaMatiManush},
            ]}>{`মা-মাটি-মানুষ\nজিন্দাবাদ`}</Animated.Text>
        )}
        {showTmcLogo && (
          <Animated.Text
            style={[
              styles.jindabad,
              {fontSize: tmcJindabad},
            ]}>{`তৃণমূল\nকংগ্রেস\nজিন্দাবাদ`}</Animated.Text>
        )}
        {showMamataImage && (
          <Animated.Text
            style={[
              styles.jindabad,
              {fontSize: mamataJindabad},
            ]}>{`মমতা\nব্যানার্জী\nজিন্দাবাদ`}</Animated.Text>
        )}
        {showAvishekImage && (
          <Animated.Text
            style={[
              styles.jindabad,
              {fontSize: avishekJindabad},
            ]}>{`অভিষেক\nব্যানার্জী\nজিন্দাবাদ`}</Animated.Text>
        )}
        {showSukantaImage && (
          <Animated.Text
            style={[
              styles.jindabad,
              {fontSize: sukantaJindabad},
            ]}>{`সুকান্ত\nপাল\n জিন্দাবাদ`}</Animated.Text>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          top: responsiveHeight(37.5),
          left: responsiveWidth(20),
          zIndex: -1,
        }}>
        {showJonogon && (
          <Animated.Image
            source={require('../assets/images/jonogon.jpg')}
            width={jonogonImage ? jonogonImage + 100 : jonogonImage}
            height={jonogonImage}
            style={{
              left: -responsiveWidth(20),
              top: -responsiveHeight(2),
              borderRadius: responsiveWidth(2),
            }}
          />
        )}
        {showMamataImage && (
          <Animated.Image
            source={require('../assets/images/mamata.png')}
            width={mamataImage}
            height={mamataImage}
          />
        )}
        {showAvishekImage && (
          <Animated.Image
            source={require('../assets/images/ab.png')}
            width={avishekImage}
            height={avishekImage}
          />
        )}
        {showSukantaImage && (
          <Animated.Image
            source={require('../assets/images/sp.png')}
            width={sukantaImage}
            height={sukantaImage}
          />
        )}
      </View>

      {showFlag && (
        <View style={{position: 'absolute'}}>
          {showTmcLogo && (
            <Animated.Image
              source={require('../assets/images/tmc.png')}
              style={{
                width: responsiveWidth(60),
                height: responsiveWidth(60),
                position: 'absolute',
                top: responsiveHeight(37),
                left: responsiveWidth(20),
                zIndex: -2,
                transform: [{scale: tmcLogo}],
              }}
            />
          )}
          <View style={{position: 'absolute', top: 0, zIndex: -3}}>
            <Animated.View
              style={{
                height: responsiveHeight(33.33),
                width: responsiveWidth(100),
                backgroundColor: '#FB7C24',
                left: gerua,
              }}></Animated.View>

            <Animated.View
              style={{
                height: responsiveHeight(33.33),
                width: responsiveWidth(100),
                backgroundColor: '#fff',
                left: white,
              }}></Animated.View>

            <Animated.View
              style={{
                height: responsiveHeight(33.33),
                width: responsiveWidth(100),
                backgroundColor: 'darkgreen',
                right: green,
              }}></Animated.View>
          </View>
        </View>
      )}
      {showLoader && (
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              position: 'absolute',
              top: responsiveHeight(30),
            }}>
            <Animated.Image
              source={require('../assets/images/logo.png')}
              width={logoImage}
              height={logoImage}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              top: responsiveHeight(15),
            }}>
            <Indicator pattern={'Ball'} size={40} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
  jindabad: {
    fontSize: 0,
    color: 'white',
    fontFamily: 'charu',

    textAlign: 'center',
  },
});
