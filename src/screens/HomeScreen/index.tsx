import { getDataFetch } from '@helper/api/Api';
import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView,
  Dimensions,
  TouchableOpacity, ImageSourcePropType
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface DataBanner {
  banner_name: string;
  banner_image: string;
  description: string
}

interface DataService {
  service_code: string;
  service_name: string;
  service_icon: string,
  service_tariff: number
}

const HomeScreen: React.FC = () => {
  const [dataBanner, setBanner] = useState<DataBanner[] | null>(null);
  const [dataService, setDataService] = useState<DataService[] | null>(null)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all(
      [getDataFetch(setBanner, "banner"),
      getDataFetch(setDataService, "services")])
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
          <Text style={styles.balanceAmount}>Rp ********</Text>
          <TouchableOpacity style={styles.balanceButton}>
            <Text style={styles.balanceButtonText}>Lihat Saldo</Text>
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {[
            { name: 'PBB', icon: require('@assets/logos/PBB.png') },
            { name: 'Listrik', icon: require('@assets/logos/Listrik.png') },
            { name: 'Pulsa', icon: require('@assets/logos/Pulsa.png') },
            { name: 'PDAM', icon: require('@assets/logos/PDAM.png') },
            { name: 'PGN', icon: require('@assets/logos/PGN.png') },
            { name: 'Lainnya', icon: require('@assets/logos/Televisi.png') },
          ].map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Image source={service.icon as ImageSourcePropType} style={styles.serviceIcon} />
              <Text style={styles.serviceName}>{service.name}</Text>
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
