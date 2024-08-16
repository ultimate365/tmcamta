import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Dashboard from '../screens/Dashboard';
import SignOut from '../screens/SignOut';
import PublicArea from '../screens/PublicArea';
import UsersArea from '../screens/UsersArea';
import AdminsArea from '../screens/AdminsArea';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignOut"
          component={SignOut}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PublicArea"
          component={PublicArea}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UsersArea"
          component={UsersArea}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminsArea"
          component={AdminsArea}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
