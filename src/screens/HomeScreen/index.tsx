import { getDataFetchArray, getDataFetchObj } from '@helper/api/Api';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  View, Text, Image, StyleSheet, ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { DataBanner, DataService, DataTransaction } from "config/Type/type";
// import { useAuth } from '@helper/AuthContext/AuthContext';
const { width: screenWidth } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [dataBanner, setBanner] = useState<DataBanner[] | null>(null);
  const [dataService, setDataService] = useState<DataService[] | null>(null);
  const [dataTransaction, setDataTransaction] = useState<DataTransaction | null>(null);
  // const { logout } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const updateEndpoint = async () => {
        await getDataFetchObj(setDataTransaction, "balance")
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
  // logout()
  // 
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
            <Text style={{ marginLeft: 8 }}>SIMS PPOB</Text>
          </View>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.userIcon} />
        </View>

        {/* Welcome Message */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Selamat datang,</Text>
          <Text style={styles.userName}>Kristanto Wibowo</Text>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceText}>Saldo anda</Text>
          <Text style={styles.balanceAmount}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(dataTransaction?.balance || 0)
            }
          </Text>
          <TouchableOpacity style={styles.balanceButton}>
            <Text style={styles.balanceButtonText}>Lihat Saldo</Text>
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {dataService?.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Image source={{ uri: service.service_icon }} style={styles.serviceIcon} />
              <Text style={styles.serviceName}>{service.service_name}</Text>
            </View>
          ))}
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
  },
  balanceButtonText: {
    color: '#ffffff',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 16,
  },
  serviceItem: {
    width: 70,
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
