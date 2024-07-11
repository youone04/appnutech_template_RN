import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native';

const HomeScreen : React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
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
        <View style={styles.promoContainer}>
          {[
            { image: require('@assets/banner/Banner1.png'), text: 'Saldo Gratis!' },
            { image: require('@assets/banner/Banner2.png'), text: 'Diskon Listrik!' },
          ].map((promo, index) => (
            <View key={index} style={styles.promoItem}>
              <Image source={promo.image as ImageSourcePropType} style={styles.promoImage} />
              <Text style={styles.promoText}>{promo.text}</Text>
            </View>
          ))}
        </View>
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
    width: 50,
    height: 50,
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
    alignItems: 'center',
  },
  balanceText: {
    color: '#ffffff',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  balanceButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  balanceButtonText: {
    color: '#ff5252',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  promoItem: {
    width: '45%',
    alignItems: 'center',
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
