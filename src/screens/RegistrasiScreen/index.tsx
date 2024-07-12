import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import FieldWithIcon from '@components/atoms/FieldWithIcon';

interface DataRegistrasi {
    email: string;
    namaDepan: string;
    namaBelakang: string;
    password: string;
    konfirmasiPassword: string;
}

interface DataNotif {
    notif: boolean
}

const RegistrasiScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [dataRegistrasi, setDataRegistrasi] = useState<DataRegistrasi>({
        email: "",
        namaDepan: "",
        namaBelakang: "",
        password: "",
        konfirmasiPassword: "",
    });
    const [notif, setNotif] = useState<DataNotif>({ notif: false });
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (field: keyof DataRegistrasi, text: string) => {
        setDataRegistrasi(prevData => ({
            ...prevData,
            [field]: text
        }));
    };

    const validateForm = () => {
        const invalidFields: (keyof DataRegistrasi)[] = [];
        Object.keys(dataRegistrasi).forEach((item) => {
            const key = item as keyof DataRegistrasi;
            if (!dataRegistrasi[key]) {
                invalidFields.push(key);
            }
        });
        return invalidFields;
    };

    const submit = () => {
        const invalidFields = validateForm();
        if (invalidFields.length > 0) {
            setNotif({ notif: true });
        } else if (dataRegistrasi.password !== dataRegistrasi.konfirmasiPassword) {
            return Alert.alert("Password tidak cocok dengan konfirmasi password")
        } else {
            setNotif({ notif: false });
            const payload: object = {
                email: dataRegistrasi.email,
                first_name: dataRegistrasi.namaDepan,
                last_name: dataRegistrasi.namaBelakang,
                password: dataRegistrasi.password
            };
            postData(payload);
        }

    }

    const postData = async (payload: object) => {
        try {
            setLoading(true);
            const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/registration`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const hasilResponse = await response.json();
            if (hasilResponse.status !== 200) {
                Alert.alert(hasilResponse.message)
                setDataRegistrasi({
                    email: "",
                    namaDepan: "",
                    namaBelakang: "",
                    password: "",
                    konfirmasiPassword: "",
                });
            }
            setLoading(false);

        } catch (e) {
            setLoading(false);
            setDataRegistrasi({
                email: "",
                namaDepan: "",
                namaBelakang: "",
                password: "",
                konfirmasiPassword: "",
            })

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>SIMS PPOB</Text>
            </View>

            <Text style={styles.subtitle}>Lengkapi data untuk membuat akun</Text>

            <FieldWithIcon
                placeholder="masukan email anda"
                iconName={faAt}
                keyboardType='email-address'
                value={dataRegistrasi.email}
                onChange={(text: string) => handleInputChange('email', text)}
            />

            <FieldWithIcon
                placeholder="nama depan"
                iconName={faUser}
                value={dataRegistrasi.namaDepan}
                onChange={(text: string) => handleInputChange('namaDepan', text)}

            />

            <FieldWithIcon
                placeholder="nama belakang"
                iconName={faUser}
                value={dataRegistrasi.namaBelakang}
                onChange={(text: string) => handleInputChange('namaBelakang', text)}
            />

            <FieldWithIcon
                placeholder="buat password"
                iconName={faLock}
                value={dataRegistrasi.password}
                secureTextEntry={true}
                onChange={(text: string) => handleInputChange('password', text)}
            />
            <FieldWithIcon
                placeholder="konfirmasi password"
                value={dataRegistrasi.konfirmasiPassword}
                iconName={faLock}
                secureTextEntry={true}
                onChange={(text: string) => handleInputChange('konfirmasiPassword', text)}
            />
            <View style={{ width: '100%' }}>
                {notif.notif ? <Text style={{ textAlign: 'center', color: 'red', margin: 3 }}>Semua field harus terisi</Text> : ""}
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
    banner: {
        flexDirection: 'row', // Arrange children in a row
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 20,
        marginHorizontal: 10
    },
    title: {
        fontSize: 25,
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 30,
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
