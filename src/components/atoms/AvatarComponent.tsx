import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {DataProfile} from "config/Type/type";

const AvatarComponent: React.FC<DataProfile> = (item) => {
  let cekPhoto = null;
  if(item?.profile_image&&item.profile_image?.split('/').pop()!=="null"){
    cekPhoto = item.profile_image;
  }else{
    cekPhoto = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png"
  }
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: cekPhoto
            
          }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <FontAwesomeIcon icon={faPen} />
        </TouchableOpacity>
      </View>
      <Text style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
      }}>{`${item.first_name}`}</Text>
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
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default AvatarComponent;
