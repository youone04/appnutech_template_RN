import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import FieldWithIcon from '@components/atoms/FieldWithIcon';
import { DataRegistrasi, DataNotif } from "config/Type/type"
import { validataForm, validateEmail } from '@helper/func';
import { DataSecureEntry, PayloadRegistrasi} from "config/Type/type";

import { useDispatch} from 'react-redux';
import {  AppDispatch } from '@configRedux/dinamisRedux/store';
import { fetchData } from '@configRedux/dinamisRedux/actions';

const RegistrasiScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();
    const [dataRegistrasi, setDataRegistrasi] = useState<DataRegistrasi>({
        email: "",
        namaDepan: "",
        namaBelakang: "",
        password: "",
        konfirmasiPassword: "",
    });
    const [notif, setNotif] = useState<DataNotif>({ notif: false });
    const [loading, setLoading] = useState<boolean>(false);
    const [secureTextEntry, setSecureEntry] = useState<DataSecureEntry>({
        password: true,
        konfirmasiPassword: true
    });
    const handleInputChange = (field: keyof DataRegistrasi, text: string) => {
        setDataRegistrasi(prevData => ({
            ...prevData,
            [field]: text
        }));
    };
    const submit = async () => {
        const invalidFields = validataForm(dataRegistrasi);
        if (invalidFields.length > 0) {
            setNotif({ notif: true });
        }
        else if (dataRegistrasi.password !== dataRegistrasi.konfirmasiPassword) {
            return null;
        } 
        else if (!validateEmail(dataRegistrasi.email)) {
            return null
        } 
        else if (dataRegistrasi.password.length < 8) {
            return null
        } else {
            setLoading(true);
            setNotif({ notif: false });
            const payload: PayloadRegistrasi = {
                email: dataRegistrasi.email,
                first_name: dataRegistrasi.namaDepan,
                last_name: dataRegistrasi.namaBelakang,
                password: dataRegistrasi.password
            };
            const resultAction: any = await dispatch(fetchData({
                idredux: "registrasiPost",
                endpoint: 'https://take-home-test-api.nutech-integrasi.app/registration',
                method: 'POST',
                body: payload
            }));
            if (fetchData.rejected.match(resultAction)) {
                setLoading(false);
                return Alert.alert(`${resultAction?.payload || "Gagal registrasi"} `);

            }
            Alert.alert('Berhasil registrasi, silahkan login');
            setDataRegistrasi({
                email: "",
                namaDepan: "",
                namaBelakang: "",
                password: "",
                konfirmasiPassword: "",
            });
            setLoading(false);
        }
    }
    
    const handleSecureEntry = (konfirmasiPassword: boolean) => {
        if (konfirmasiPassword) {
            setSecureEntry(prev => {
                return {
                    ...prev,
                    konfirmasiPassword: !secureTextEntry.konfirmasiPassword
                }
            })
        } else {
            setSecureEntry(prev => {
                return {
                    ...prev,
                    password: !secureTextEntry.password
                }
            })
        }
    }
    const valid = validataForm(dataRegistrasi);
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>SIMS PPOB</Text>
            </View>
            <Text style={styles.subtitle}>Lengkapi data untuk membuat akun</Text>
            <FieldWithIcon
                id='email'
                placeholder="masukan email anda"
                isEmail={true}
                iconName={faAt}
                keyboardType='email-address'
                value={dataRegistrasi.email}
                onChange={(text: string) => handleInputChange('email', text)}
                isNull={notif.notif}
                validateForm={valid}
            />
            <FieldWithIcon
                id='namaDepan'
                placeholder="nama depan"
                iconName={faUser}
                value={dataRegistrasi.namaDepan}
                onChange={(text: string) => handleInputChange('namaDepan', text)}
                validateForm={valid}
                isNull={notif.notif}

            />
            <FieldWithIcon
                id='namaBelakang'
                placeholder="nama belakang"
                iconName={faUser}
                value={dataRegistrasi.namaBelakang}
                onChange={(text: string) => handleInputChange('namaBelakang', text)}
                validateForm={valid}
                isNull={notif.notif}
            />
            <FieldWithIcon
                id='password'
                placeholder="buat password"
                isPassword={true}
                iconName={faLock}
                value={dataRegistrasi.password}
                secureTextEntry={secureTextEntry.password}
                onChange={(text: string) => handleInputChange('password', text)}
                handleSecureEntry={handleSecureEntry}
                validateForm={valid}
                isNull={notif.notif}
            />
            <FieldWithIcon
                id='konfirmasiPassword'
                isPassword={true}
                placeholder="konfirmasi password"
                value={dataRegistrasi.konfirmasiPassword}
                iconName={faLock}
                valuePassword={dataRegistrasi.password}
                secureTextEntry={secureTextEntry.konfirmasiPassword}
                onChange={(text: string) => handleInputChange('konfirmasiPassword', text)}
                validateForm={valid}
                isNull={notif.notif}
                handleSecureEntry={handleSecureEntry}
                konfirmasiPW={true}
            />
            <View style={{ width: '100%', marginTop: 25 }}>
                <TouchableOpacity disabled={loading} onPress={submit} style={styles.button}>
                    {
                        loading ?
                            <ActivityIndicator /> :
                            <Text style={styles.buttonText}>Registasi</Text>
                    }
                </TouchableOpacity>
            </View>

            <Text style={styles.registerText}>
                sudah punya akun? <Text onPress={() => navigation.navigate('Login')} style={styles.registerLink}>login di sini</Text>
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    banner: {
        flexDirection: 'row', // Arrange children in a row
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        color: '#000',
        marginBottom: 20,
        alignSelf: 'center'
    },
    logo: {
        width: 30,
        height: 30,
        marginBottom: 20,
        marginHorizontal: 10
    },

    subtitle: {
        fontSize: 28,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
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
    registerText: {
        fontSize: 14,
        color: '#000',
    },
    registerLink: {
        color: '#ff0000',
        fontWeight: 'bold',
    },
});
export default RegistrasiScreen;
