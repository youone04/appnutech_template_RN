
import { enableScreens } from 'react-native-screens';
enableScreens(false);
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import HomeScreen from '@screens/HomeScreen';
import RegistrasiScreen from '@screens/RegistrasiScreen';
import TopUpScreen from '@screens/TopUp';
import PembayaranScreen from '@screens/PembayaranScreen';
import TransactionScreen from '@screens/TransactionScreen';
import ProfileScreen from '@screens/ProfileScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faSackDollar, faCreditCard, faUser, faL } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({color, size}) => {
        let iconName:any;
        if (route.name === 'Home') {
          iconName = faHome;
        } else if (route.name === 'TopUp') {
          iconName = faSackDollar;
        } else if(route.name === 'Trasnsaction'){
          iconName = faCreditCard
        }else {
          iconName = faUser
        }
        return <FontAwesomeIcon icon={iconName}/>;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="TopUp" component={TopUpScreen} />
    <Tab.Screen name="Trasnsaction" component={TransactionScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const RootNavigator = () => {
  const isLoggedIn: boolean = false;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLoggedIn ?
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={AppNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen name='Pembayaran' component={PembayaranScreen} />
            </Stack.Group> :
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegistrasiScreen} />
            </Stack.Group>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App: React.FC = () => {
  return (
    <RootNavigator />
  );
}
//penggunaan auth helper
{/* <AuthProvider>
      <RootNavigator />
    </AuthProvider> */}


export default App;
