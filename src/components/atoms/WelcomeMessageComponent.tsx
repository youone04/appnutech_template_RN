import { DataProfile } from "config/Type/type";
import { View, Text, StyleSheet } from "react-native";
const WelcomeMessageComponent: React.FC<DataProfile> = (item) => {
    return(
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Selamat datang,</Text>
          <Text style={styles.userName}>{item?.first_name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
})
export default WelcomeMessageComponent;