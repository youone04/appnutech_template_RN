import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  View, Text, Image, StyleSheet, ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import HeaderCcmponent from '@components/atoms/HeaderComponent';
import WelcomeMessageComponent from '@components/atoms/WelcomeMessageComponent';
import { _removeData } from '@helper/LocalStorage';
import Loading from '@components/atoms/Loading';
import ErrorComponent from '@components/atoms/ErrorComponent';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@configRedux/dinamisRedux/store';
import { fetchDataPrivate } from '@configRedux/dinamisRedux/actions';
import { logout } from '@configRedux/reducers/auth/reducerAuth';

const { width: screenWidth } = Dimensions.get('window');
const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isValueVisible, setVisible] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  const dataRedux = useSelector((state: RootState) => state.data);

  useFocusEffect(
    React.useCallback(() => {
      const updateEndpoint = async () => {
        await fetchDataGet();
      };
      updateEndpoint();
    }, [dispatch])
  );

  const fetchDataGet = async () => {
    await Promise.all(
      [
        dispatch(fetchDataPrivate({ idredux: "balance", endpoint: 'https://take-home-test-api.nutech-integrasi.app/balance', method: 'GET', logOut: () => dispatch(logout()) })),
        dispatch(fetchDataPrivate({ idredux: "services", endpoint: 'https://take-home-test-api.nutech-integrasi.app/services', method: 'GET' })),
        dispatch(fetchDataPrivate({ idredux: "banner", endpoint: 'https://take-home-test-api.nutech-integrasi.app/banner', method: 'GET' })),
        dispatch(fetchDataPrivate({ idredux: "profile", endpoint: 'https://take-home-test-api.nutech-integrasi.app/profile', method: 'GET' }))
      ])
  };

  if (dataRedux?.balance?.error || dataRedux?.profile?.error ||
    dataRedux?.banner?.error || dataRedux?.services?.error

  ) {
    return (
      <>
        {Alert.alert(`${dataRedux?.balance?.error || dataRedux?.profile?.error ||
          dataRedux?.banner?.error || dataRedux?.services?.error}`)}
        <ErrorComponent errorMessage={
          dataRedux?.balance?.error ||
          dataRedux?.profile?.error ||
          dataRedux?.banner?.error ||
          dataRedux?.services?.error
        } />
      </>
    )
  }

  if (dataRedux?.balance?.loading || dataRedux?.profile?.loading ||
    dataRedux?.banner?.loading || dataRedux?.services?.loading

  ) {
    return (
      <Loading />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <HeaderCcmponent
          profile_image={dataRedux?.profile?.items?.data?.profile_image}
          navigation={navigation}
        />
        {/* Welcome Message */}
        <WelcomeMessageComponent
          first_name={dataRedux?.profile?.items?.data?.first_name}
        />
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceText}>Saldo anda</Text>
          {
            isValueVisible ? <Text style={styles.balanceAmount}>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(dataRedux?.balance?.items?.data?.balance || 0)
              }
            </Text> :
              <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                {
                  [1, 2, 3, 4, 5, 6, 7, 9, 10].map((_, i) => {
                    return (
                      <View key={i} style={styles.circle} />

                    )
                  })
                }
              </View>
          }
          <TouchableOpacity onPress={() => setVisible(!isValueVisible)} style={styles.balanceButton}>
            <Text style={styles.balanceButtonText}>Lihat Saldo</Text>
            <FontAwesomeIcon icon={faEye} style={styles.balanceButtonText} />
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {dataRedux?.services?.items?.data?.slice(0, 9).map((service: any, index: number) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Pembayaran', service)}>
              <View key={index} style={styles.serviceItem}>
                <Image source={{ uri: service.service_icon }} style={styles.serviceIcon} />
                <Text style={styles.serviceName}>{service.service_name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate('Pembayaran')}>
            <View style={styles.serviceItem}>
              <Image source={{ uri: require('@assets/logos/Zakat.png') }} style={styles.serviceIcon} />
              <Text style={styles.serviceName}>Lainnya</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Promotional Banners */}
        <Text style={{ paddingLeft: 25, fontWeight: 'bold' }}>Tentukan Promo Menarik</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.promoContainer}>
          {dataRedux?.banner?.items?.data?.map((promo: any, index: number) => (
            <View key={index} style={styles.promoItem}>
              <Image source={{ uri: promo.banner_image }} style={styles.promoImage} />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  circle: {
    width: 11,
    height: 11,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 5
  },
  container: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: '#ff5252',
    borderRadius: 10,
    margin: 16,
    padding: 16,
  },
  balanceText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  balanceButton: {
    borderRadius: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  balanceButtonText: {
    color: '#ffffff',
    marginHorizontal: 3,
    alignSelf: 'center'
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 18,
    alignContent: 'center'
  },
  serviceItem: {
    width: 73,
    alignItems: 'center',
    marginVertical: 10,
  },
  serviceIcon: {
    width: 40,
    height: 40,
  },
  serviceName: {
    marginTop: 8,
    textAlign: 'center',
  },
  promoContainer: {
    width: screenWidth,
    padding: 16,
  },
  promoItem: {
    width: 230,
    alignItems: 'center',
    marginHorizontal: 5
  },
  promoImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  promoText: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#dddddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
  },
});
export default HomeScreen;
