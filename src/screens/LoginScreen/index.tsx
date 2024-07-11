import FieldWithIcon from '@components/atoms/FieldWithIcon';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>SIMS PPOB</Text>
            </View>

            <Text style={styles.subtitle}>Masuk atau buat akun untuk memulai</Text>

            <TextInput
                style={styles.input}
                placeholder="masukan email anda"
                placeholderTextColor="#888"
            />

            <FieldWithIcon
                placeholder="masukan email anda"
                iconName="leftcircle"
                styleIcon={{}}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Masuk</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>
                belum punya akun? <Text style={styles.registerLink}>registrasi di sini</Text>
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