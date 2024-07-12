import FieldWithIcon from '@components/atoms/FieldWithIcon';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PembayaranScreen: React.FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const [topUpAmount, setTopUpAmount] = useState<string>('');

    const handleTopUp = (amount: number) => {
        setBalance(balance + amount);
    };

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#e74c3c', borderRadius: 10, padding: 18 }}>
                <Text style={styles.balanceText}>Saldo anda</Text>
                <Text style={styles.balanceAmount}>Rp {balance}</Text>
            </View>

            <View style={{ marginVertical: 40 }}>
                <Text style={styles.promptText}>Pembayaran</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('@assets/logos/Listrik.png')} style={styles.logo} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Listrik Prabayar</Text>
                </View>
            </View>

            <FieldWithIcon
                styleTextInput={{ height: 40 }}
                placeholder='Masukan nominal Top Up'
                iconName={faCalculator}
            />

            <TouchableOpacity
                style={styles.pembayaranButton}
                onPress={() => handleTopUp(Number(topUpAmount))}
            >
                <Text style={styles.pembayaranButtonText}>Bayar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 35,
        height: 35,
        marginRight: 8,
        alignSelf:'center'
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    balanceText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 5,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    promptText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 12
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        width: '30%',
        padding: 10,
        backgroundColor: '#f1f1f1',
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    pembayaranButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e74c3c',
        alignItems: 'center',
        borderRadius: 5,
    },
    pembayaranButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PembayaranScreen;
