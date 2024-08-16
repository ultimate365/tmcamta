import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {
  BOT_API_TOKEN,
  MEMBER_GROUP_ID,
  MESSAGING_KEY,
} from '../modules/constants';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
export const notificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

export const sendNotifications = async (token, title, body) => {
  var data = JSON.stringify({
    data: {},
    notification: {
      body: body,
      title: title,
    },
    to: token,
  });
  var config = {
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      Authorization: `key=${MESSAGING_KEY}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(token, title, body);
};

export const notifyAll = async (title, body) => {
  await firestore()
    .collection('tokens')
    .get()
    .then(async snapshot => {
      const datas = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      datas.map(el => sendNotifications(el.token, title, body));
      await sendToTelegram(title + '\n' + body);
    });
};
export const notifyAllApp = async (title, body) => {
  await firestore()
    .collection('tokens')
    .get()
    .then(async snapshot => {
      const datas = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      datas.map(el => sendNotifications(el.token, title, body));
    });
};

export async function onDisplayNotification(title, body) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export const sendToTelegram = async message => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`,
      {
        chat_id: MEMBER_GROUP_ID, // Replace 'CHAT_ID' with your actual chat ID
        text: message,
      },
    );
    // console.log('Message sent:', response.data);
  } catch (error) {
    // console.error('Error sending message:', error);
  }
};
