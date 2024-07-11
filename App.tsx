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
import TopUpScreen from '@screens/TopUp';
import PembayaranScreen from '@screens/PembayaranScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const HomeStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Home" component={HomeScreen} />
//   </Stack.Navigator>
// );

// const TopUpStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name='TopUp' component={TopUpScreen} />
//   </Stack.Navigator>
// )


// const AppNavigator = () => (
//   <Tab.Navigator
    // screenOptions={({ route }) => ({
    //   tabBarIcon: ({ color, size }) => {
    //     let iconName;

    //     if (route.name === 'Home') {
    //       iconName = 'home';
    //     } else if (route.name === 'TopUp') {
    //       iconName = 'cash';
    //     }else{
    //       iconName = 'cash'
    //     }

    //     return <Icon name={iconName as any} size={size} color={color} />;
    //   },
    // })}
//   >
// <Tab.Screen name="Home" component={HomeStack} />
// <Tab.Screen name="TopUp" component={TopUpStack}/>
// <Tab.Screen name="Trasnsaction" component={TopUpStack}/>
// <Tab.Screen name="Profile" component={TopUpStack}/>
//   </Tab.Navigator>
// );

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="TopUp" component={TopUpScreen} />
      <Tab.Screen name="Trasnsaction" component={TopUpScreen} />
      <Tab.Screen name="Profile" component={TopUpScreen} />
    </Tab.Navigator>
  );
}

// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Screen name="Register" component={RegistrasiScreen} />
//     <Stack.Screen name='Pembayaran' component={PembayaranScreen} />
//   </Stack.Navigator>
// );

const RootNavigator = () => {
  // const isLoggedIn: boolean = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrasiScreen} />
        <Stack.Screen name='Pembayaran' component={PembayaranScreen} />
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
