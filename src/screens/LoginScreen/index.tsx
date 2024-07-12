import FieldWithIcon from '@components/atoms/FieldWithIcon';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '@helper/AuthContext/AuthContext';
import { _storeData } from '@helper/LocalStorage';

interface DataLogin {
    email: string;
    password: string;
}
const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { login } = useAuth();
    const [dataLogin, setDatalogin] = useState<DataLogin>({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (field: keyof DataLogin, text: string) => {
        setDatalogin(prevData => ({
            ...prevData,
            [field]: text
        }));
    };


    const handleLogin = () => {
        const payload: object = {
            email: dataLogin.email,
            password: dataLogin.password
        };
        postData(payload)
    };

    const postData = async (payload: object) => {
        try {
            setLoading(true);
            const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/login`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const hasilResponse = await response.json();
            if (hasilResponse.status !== 0) {
                setLoading(false);
                setDatalogin({
                    email: "",
                    password: "",
                });
                return  Alert.alert(hasilResponse.message);
            }
            Alert.alert(hasilResponse.message)
            // hasilResponse.data.token
            _storeData(hasilResponse.data.token);
            login();
            setLoading(false);

        } catch (e) {
            setLoading(false);
            setDatalogin({
                email: "",
                password: "",
            })

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>SIMS PPOB</Text>
            </View>

            <Text style={styles.subtitle}>Masuk atau buat akun untuk memulai</Text>

            <FieldWithIcon
                placeholder="masukan email anda"
                iconName={faAt}
                onChange={(text: string) => handleInputChange('email', text)}
                value={dataLogin.email}
            />
            <FieldWithIcon
                placeholder="masukan pasword anda"
                iconName={faLock}
                secureTextEntry={true}
                onChange={(text: string) => handleInputChange('password', text)}
                value={dataLogin.password}
            />
            <TouchableOpacity disabled={loading} onPress={handleLogin} style={styles.button}>
                {
                    loading ?
                        <ActivityIndicator /> :
                        <Text style={styles.buttonText}>Masuk</Text>
                }
            </TouchableOpacity>

            <Text style={styles.registerText}>
                belum punya akun? <Text onPress={() => navigation.navigate('Register')} style={styles.registerLink}>registrasi di sini</Text>
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

export default LoginScreen;
