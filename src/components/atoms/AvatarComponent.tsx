import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AvatarComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ 
            uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }} // Replace with your avatar image URL
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Icon name="pencil" size={18} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={{
        textAlign:'center', 
        fontWeight:'bold',
        fontSize: 25
        }}>Kristanto Wibowo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 8,
  },
});

export default AvatarComponent;
