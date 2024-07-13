import AvatarComponent from "@components/atoms/AvatarComponent";
import FieldWithIcon from "@components/atoms/FieldWithIcon";
import { faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { getDataFetchObj } from "@helper/api/Api";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {DataProfile, FieldProfile} from "config/Type/type";
const ProfileScreen: React.FC = () => {
    const [dataProfile , setDataProfile] = useState<DataProfile | null>(null);
    const [hanldeEdit, setHandleEdit] = useState<boolean>(false);
    const [fieldProfile , setFieldProfile] = useState<FieldProfile>({
        email: "",
        first_name: "",
        last_name: ""
    })
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
       const profile:DataProfile =  await getDataFetchObj(setDataProfile, "profile")
        setFieldProfile(prevData => {
            return{
                ...prevData,
                email: profile?.email,
                first_name: profile?.first_name,
                last_name: profile?.last_name
            }
        })
    }

    const handleInputChange = (field:string , text:string) => {
        setFieldProfile(prevData => {
            return{
                ...prevData,
                [field]: text,
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={[styles.box, { flex: 1 }]}>
                <AvatarComponent 
                last_name={dataProfile?.first_name}
                first_name={dataProfile?.last_name}
                profile_image={dataProfile?.profile_image}
                />
            </View>
            <View style={[styles.box, { flex: 2 }]}>
                <View style={{
                    padding: 20
                }}>
                    <Text style={{ marginVertical: 10 }}>Email</Text>
                    <FieldWithIcon
                        placeholder="wallet@nutech.com"
                        onChange={(text:string) => handleInputChange("email", text)}
                        value={fieldProfile.email}
                        disabled={!hanldeEdit}
                        iconName={faAt} />

                    <Text style={{ marginVertical: 10 }}>Nama Depan</Text>
                    <FieldWithIcon
                        placeholder="Nama Depan"
                        value={fieldProfile.first_name}
                        onChange={(text:string) => handleInputChange("first_name", text)}
                        disabled={!hanldeEdit}
                        iconName={faUser} />

                    <Text style={{ marginVertical: 10 }}>Nama Belakang</Text>
                    <FieldWithIcon
                        placeholder="Nama Belakang"
                        value={fieldProfile.last_name}
                        onChange={(text:string) => handleInputChange("last_name", text)}
                        disabled={!hanldeEdit}
                        iconName={faUser} />

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.buttonEdit}>
                            <Text style={styles.buttonTextEdit}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Batal</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    buttonEdit: {
        width: '100%',
        height: 50,
         backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 20,
        borderColor: '#ff0000',
        borderWidth: 1
    },
    buttonTextEdit: {
        color:  '#ff0000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#ff0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
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