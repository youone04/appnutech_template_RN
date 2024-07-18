import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  View, Text, Image, StyleSheet, ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { DataProfile } from "config/Type/type";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import HeaderCcmponent from '@components/atoms/HeaderComponent';
import WelcomeMessageComponent from '@components/atoms/WelcomeMessageComponent';
import { fetchDataBalance } from '@configRedux/actions/actionGets/fetchDataBalance';
import { RootState, AppDispatch } from '@configRedux/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataService } from '@configRedux/actions/actionGets/fetchService';
import { _removeData } from '@helper/LocalStorage';
import { fetchDataBanner } from '@configRedux/actions/actionGets/fetchDataBanner';
import Loading from '@components/atoms/Loading';
import ErrorComponent from '@components/atoms/ErrorComponent';
import { fetchDataProfile } from '@configRedux/actions/actionGets/fetchDataProfile';


const { width: screenWidth } = Dimensions.get('window');
const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [dataProfile, setDataProfile] = useState<DataProfile | null>(null);
  const [isValueVisible, setVisible] = useState<boolean>(true);
  const { balance, loading: loadingBalance, error: errorBalance } = useSelector((state: RootState) => state.dataBalance);
  const { services, loading: loadingServices, error: errorServices } = useSelector((state: RootState) => state.dataService);
  const { banner, loading: loadingBanner, error: errorBanner } = useSelector((state: RootState) => state.dataBanner);
  const { profile, loading: loadingProfile, error: errorProfile } = useSelector((state: RootState) => state.dataProfile);

  const dispatch: AppDispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const updateEndpoint = async () => {
        await fetchData();
      };
      updateEndpoint();
    }, [dispatch])
  );


  const fetchData = async () => {
    await Promise.all(
      [
        dispatch(fetchDataBalance("balance")),
        dispatch(fetchDataService("services")),
        dispatch(fetchDataBanner("banner")),
        dispatch(fetchDataProfile("profile"))
      ])
  };

  if (errorBalance || errorServices || errorBanner) {
    return (
      <ErrorComponent errorMessage={errorBalance || errorServices || errorBanner || errorProfile} />
    )
  }

  if (loadingBalance || loadingBanner || loadingServices || loadingProfile) {
    return (
      <Loading />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <HeaderCcmponent
          profile_image={profile?.profile_image}
          navigation={navigation}
        />
        {/* Welcome Message */}
        <WelcomeMessageComponent
          first_name={profile?.first_name}
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
              }).format(balance || 0)
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
          {services?.slice(0, 9).map((service: any, index: number) => (
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
          {banner?.map((promo: any, index: number) => (
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
