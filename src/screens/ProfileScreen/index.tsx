import AvatarComponent from "@components/atoms/AvatarComponent";
import FieldWithIcon from "@components/atoms/FieldWithIcon";
import { faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { getDataFetchObj } from "@helper/api/Api";
import React, {useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Alert, ActivityIndicator } from 'react-native';
import { DataProfile, FieldProfile } from "config/Type/type";
import { useAuth } from "@helper/AuthContext/AuthContext";
import { getData } from "@helper/LocalStorage";
import { useFocusEffect } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
const ProfileScreen: React.FC = () => {
    const {logout} = useAuth()
    const [dataProfile, setDataProfile] = useState<DataProfile | null>(null);
    const [hanldeEdit, setHandleEdit] = useState<boolean>(false);
    const [fieldProfile, setFieldProfile] = useState<FieldProfile>({
        email: "",
        first_name: "",
        last_name: ""
    })
    const [loading , setLoading] = useState<boolean>(false);
    const [cekPhoto, setCekPhoto] = useState<string | null>(null);


    useFocusEffect(
        React.useCallback(() => {
          const updateEndpoint = async () => {
            await fetchData();
          };
          updateEndpoint();
          return () => {
    
          };

        }, [])
      );
    const fetchData = async () => {
        const profile: DataProfile = await getDataFetchObj(setDataProfile, "profile")
        setFieldProfile(prevData => {
            return {
                ...prevData,
                email: profile?.email,
                first_name: profile?.first_name,
                last_name: profile?.last_name
            }
        })
    }

    const handleInputChange = (field: string, text: string) => {
        setFieldProfile(prevData => {
            return {
                ...prevData,
                [field]: text,
            }
        })
    }

    const postData = async () => {
        try {
            setLoading(true);
            const token = await getData();
            const payload = {
                first_name: fieldProfile?.first_name,
                last_name: fieldProfile?.last_name
              }
              
            const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/profile/update`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                method: 'PUT',
                body: JSON.stringify(payload)
            });

            const hasilResponse = await response.json();
            if (hasilResponse.status !== 0) {
                setLoading(false);
                setHandleEdit(!hanldeEdit);
                return  Alert.alert(hasilResponse.message);
            }
            Alert.alert(hasilResponse.message)
            setLoading(false);
            fetchData();
            setHandleEdit(!hanldeEdit);

        } catch (e) {
            setLoading(false);
            setHandleEdit(!hanldeEdit);
        }
    }

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            console.error('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            const source = response.assets[0].uri;
            if (source) {
              setCekPhoto(source);
              handleUploadPhoto(source);
            }
          }
        });
      };

      const handleUploadPhoto = async (photoUri: string) => {
        const formData = new FormData();
        formData.append('file', {
          uri: photoUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as any);
    
        try {
            const token = await getData();
          const response = await fetch('https://take-home-test-api.nutech-integrasi.app/profile/image', {
            method: 'PUT',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
          });
          if (response.ok) {
            const responseData = await response.json();
            console.log('responseData',responseData)
            Alert.alert(responseData?.message);
            console.log('Photo uploaded successfully:', responseData);
          } else {
            const responseData = await response.json();
            console.log('responseData',responseData)
            console.error('Error uploading photo:', response.statusText);
            Alert.alert('Upload failed', 'There was an error uploading the photo. 1');
          }
        } catch (error) {
          console.error('Error uploading photo:', error);
          Alert.alert('Upload failed', 'There was an error uploading the photo. 2');
        }
      };

    return (
        <View style={styles.container}>
            <View style={[styles.box, { flex: 1 }]}>
                <AvatarComponent
                    last_name={dataProfile?.first_name}
                    first_name={dataProfile?.last_name}
                    profile_image={dataProfile?.profile_image}
                    cekPhoto={cekPhoto}
                    handleChoosePhoto={() => handleChoosePhoto()}
                />
            </View>
            <View style={[styles.box, { flex: 2 }]}>
                <View style={{
                    padding: 20
                }}>
                    <Text style={{ marginVertical: 10 }}>Email</Text>
                    <FieldWithIcon
                        placeholder="wallet@nutech.com"
                        onChange={(text: string) => handleInputChange("email", text)}
                        value={fieldProfile.email}
                        disabled={false}
                        iconName={faAt} />

                    <Text style={{ marginVertical: 10 }}>Nama Depan</Text>
                    <FieldWithIcon
                        placeholder="Nama Depan"
                        value={fieldProfile.first_name}
                        onChange={(text: string) => handleInputChange("first_name", text)}
                        disabled={hanldeEdit}
                        iconName={faUser} />

                    <Text style={{ marginVertical: 10 }}>Nama Belakang</Text>
                    <FieldWithIcon
                        placeholder="Nama Belakang"
                        value={fieldProfile.last_name}
                        onChange={(text: string) => handleInputChange("last_name", text)}
                        disabled={hanldeEdit}
                        iconName={faUser} />

                    {
                        !hanldeEdit ?
                            <>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setHandleEdit(!hanldeEdit)} style={[styles.buttonEdit]}>
                                        <Text style={styles.buttonTextEdit}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity onPress={logout} style={styles.button}>
                                        <Text style={styles.buttonText}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            :

                            <>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity disabled={loading} onPress={() => postData()} style={[styles.buttonEdit]}>
                                       {
                                        loading?
                                        <ActivityIndicator/>:
                                        <Text style={styles.buttonTextEdit}>SIMPAN</Text>
                                       }
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setHandleEdit(!hanldeEdit)} style={styles.button}>
                                        <Text style={styles.buttonText}>BATALKAN</Text>
                                    </TouchableOpacity>
                                </View>
                            </>

                    }

                </View>

            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    buttonEdit: {
        width: '100%',
        height: 50,
        backgroundColor: '#ff0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 20,
        borderColor: '#ff0000',
        borderWidth: 1
    },
    buttonTextEdit: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ff0000',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#ff0000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'

    },
    text: {
        fontSize: 20,
    },
    box: {
        height: 100,
    },
});

// flex: 1 => 1 kali lebih banyak
// flex: 2 => 2 kali lebih banyak dst

// pasangannya
// flex dan flexDirection

export default ProfileScreen;