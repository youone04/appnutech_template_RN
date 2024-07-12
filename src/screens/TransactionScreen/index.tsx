import CardTransaksi from '@components/CardMod/CardTransaksi';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TransactionScreen: React.FC = () => {
    const [balance, setBalance] = useState<number>(10000);
    const [topUpAmount, setTopUpAmount] = useState<string>('');

    const handleTopUp = (amount: number) => {
        setBalance(balance + amount);
    };

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#e74c3c', borderRadius: 10, padding: 18 }}>
                <Text style={styles.balanceText}>Saldo anda</Text>
                <Text style={styles.balanceAmount}> {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(balance)}</Text>
            </View>
            <View style={{ marginVertical: 25 }}>
                <Text style={styles.promptText}>Transaksi</Text>
            </View>
            <CardTransaksi />
            <CardTransaksi />
            <CardTransaksi />
            <CardTransaksi />
            <TouchableOpacity
                style={styles.pembayaranButton}
                onPress={() => handleTopUp(Number(topUpAmount))}
            >
                <Text style={styles.pembayaranButtonText}>Show more</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 35,
        height: 35,
        marginRight: 8,
        alignSelf: 'center'
    },
    promptText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
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
        // backgroundColor: '#e74c3c',
        alignItems: 'center',
        borderRadius: 5,
    },
    pembayaranButtonText: {
        fontSize: 14,
        color: '#e74c3c',
        fontWeight: 'bold',
    },
});

export default TransactionScreen;
