import FieldWithIcon from '@components/atoms/FieldWithIcon';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { getDataFetchObj } from '@helper/api/Api';
import { formatMataUang } from '@helper/func';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { DataTransaction } from "config/Type/type";
import { getData } from '@helper/LocalStorage';

// Define your route params type
type RootStackParamList = {
    Pembayaran: {
        service_code: string,
        service_name: string,
        service_icon: string,
        service_tariff: number
    };
};

type PembayaranScreenRouteProp = RouteProp<RootStackParamList, 'Pembayaran'>;
const PembayaranScreen: React.FC<{navigation: any}> = ({navigation}) => {
    const [balance, setBalance] = useState<DataTransaction | null>(null);
    const route = useRoute<PembayaranScreenRouteProp>();
    const [loading, setLoading] = useState<boolean>(false);
    const { service_tariff, service_code, service_icon, service_name } = route.params;

    useFocusEffect(
        React.useCallback(() => {
            const updateEndpoint = async () => {
                await getDataFetchObj(setBalance, "balance")
            };
            updateEndpoint();
            return () => {

            };
        }, [])
    );

    const handlePay = async () => {
        try {
            const token = await getData();
            setLoading(true);
            const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/transaction`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                method: 'POST',
                body: JSON.stringify({ service_code })
            });
            const hasilResponse = await response.json();
            if (hasilResponse.status !== 0) {
                setLoading(false);
                return Alert.alert(hasilResponse.message);
            }
            Alert.alert(hasilResponse.message);
            setLoading(false);
            navigation.navigate('Home');
        } catch (e) {
            setLoading(false);

        }
    };

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#e74c3c', borderRadius: 10, padding: 18 }}>
                <Text style={styles.balanceText}>Saldo anda</Text>
                <Text style={styles.balanceAmount}>{formatMataUang(balance?.balance)}</Text>
            </View>

            <View style={{ marginVertical: 40 }}>
                <Text style={styles.promptText}>Pembayaran</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: service_icon }} style={styles.logo} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>{service_name}</Text>
                </View>
            </View>

            <FieldWithIcon
                styleTextInput={{ height: 40 }}
                placeholder='Masukan nominal Top Up'
                disabled={true}
                value={new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(service_tariff || 0)}
                iconName={faCalculator}
            />

            <TouchableOpacity
                style={styles.pembayaranButton}
                onPress={() => handlePay()}
                disabled={loading}
            >
                {
                    loading ?
                        <ActivityIndicator /> :
                        <Text style={styles.pembayaranButtonText}>Bayar</Text>

                }
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
