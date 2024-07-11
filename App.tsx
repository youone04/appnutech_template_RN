/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { enableScreens } from 'react-native-screens';

enableScreens(false);
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import HomeScreen from '@screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RegistrasiScreen from '@screens/RegistrasiScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);


const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'TopUp') {
          iconName = 'cash';
        } else if (route.name === 'Transaction') {
          iconName = 'list';
        } else if (route.name === 'Account') {
          iconName = 'person';
        }

        return <Icon name={iconName as any} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegistrasiScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const isLoggedIn: boolean = false;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppNavigator />
      ) : (
        <AuthStack />
      )}
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
