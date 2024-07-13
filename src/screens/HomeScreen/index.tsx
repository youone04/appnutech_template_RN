import { getDataFetchArray, getDataFetchObj } from '@helper/api/Api';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  View, Text, Image, StyleSheet, ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { DataBanner, DataService, DataTransaction, DataProfile } from "config/Type/type";
import { faEye } from '@fortawesome/free-solid-svg-icons';
const { width: screenWidth } = Dimensions.get('window');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [dataBanner, setBanner] = useState<DataBanner[] | null>(null);
  const [dataService, setDataService] = useState<DataService[] | null>(null);
  const [dataTransaction, setDataTransaction] = useState<DataTransaction | null>(null);
  const [dataProfile, setDataProfile] = useState<DataProfile | null>(null);
  const [isValueVisible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const updateEndpoint = async () => {
        await getDataFetchObj(setDataTransaction, "balance");
        await getDataFetchObj(setDataProfile, "profile");
      };
      updateEndpoint();
      return () => {

      };
    }, [])
  );

  const fetchData = async () => {
    await Promise.all(
      [
        getDataFetchArray(setBanner, "banner"),
        getDataFetchArray(setDataService, "services"),
      ])
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
            <Text style={{ marginLeft: 8 }}>SIMS PPOB</Text>
          </View>
          <Image source={{ uri: dataProfile?.profile_image }} style={styles.userIcon} />
        </View>

        {/* Welcome Message */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Selamat datang,</Text>
          <Text style={styles.userName}>{dataProfile?.first_name}</Text>
        </View>

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
              }).format(dataTransaction?.balance || 0)
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
          {dataService?.slice(0, 9).map((service, index) => (
            <TouchableOpacity onPress={() => navigation.navigate('Pembayaran', service)}>
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
          {dataBanner?.map((promo, index) => (
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 25,
    height: 25,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcome: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#888888',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
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
    alignSelf:'center'
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 18,
    alignContent:'center'
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
