
import { enableScreens } from 'react-native-screens';
enableScreens(false);
import React, { useEffect, useState } from 'react';
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
import { faHome, faSackDollar, faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons';
import DataList from '@screens/DataList';
import { Provider } from 'react-redux';
import store from '@configRedux/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@configRedux/store/store';
import { getData } from '@helper/LocalStorage';
import { login } from '@configRedux/reducers/auth/reducerAuth';
import Loading from '@components/atoms/Loading';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: any;
        if (route.name === 'Home') {
          iconName = faHome;
        } else if (route.name === 'TopUp') {
          iconName = faSackDollar;
        } else if (route.name === 'Trasnsaction') {
          iconName = faCreditCard
        } else {
          iconName = faUser
        }
        return <FontAwesomeIcon icon={iconName} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="TopUp" component={TopUpScreen} />
    <Tab.Screen name="Trasnsaction" component={TransactionScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);



const RootNavigator: React.FC = () => {
  // const { isLoggedIn, login } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const { login:cekLogin} = useSelector((state: RootState) => state.dataAuth);
  const [loadingAuth, seLoading] = useState<boolean>(false);
  useEffect(() => {
    const hasil = async () => {
      seLoading(true);
      const token = await getData();
      if (token) {
        dispatch(login());
        seLoading(false);
      }
      seLoading(false);
    }
    hasil();
  }, [dispatch]);

  if (loadingAuth) {
    return (
      <Loading/>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
         cekLogin?
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
              <Stack.Screen name="List" component={DataList} />
            </Stack.Group>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App: React.FC = () => {
  return (
    <Provider store={store}>
       <RootNavigator />
    </Provider>
  );
}


export default App;

