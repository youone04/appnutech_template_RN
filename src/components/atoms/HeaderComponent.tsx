import { DataProfile } from "config/Type/type";
import { View, Image, Text, StyleSheet } from "react-native";

const HeaderCcmponent: React.FC<DataProfile> = (item) => {
    return(
        <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
          <Text style={{ marginLeft: 8 }}>SIMS PPOB</Text>
        </View>
        <Image source={{ uri: item?.profile_image }} style={styles.userIcon} />
      </View>
    )
}

const styles = StyleSheet.create({
   
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
    }
  });

export default HeaderCcmponent;