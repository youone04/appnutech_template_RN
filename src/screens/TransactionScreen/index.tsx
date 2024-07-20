import CardTransaksi from '@components/CardMod/CardTransaksi';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { DataRecord } from "config/Type/type";

import Loading from '@components/atoms/Loading';
import ErrorComponent from '@components/atoms/ErrorComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@configRedux/dinamisRedux/store';
import { fetchDataPrivate } from '@configRedux/dinamisRedux/actions';
import { logout } from '@configRedux/reducers/auth/reducerAuth';

const TransactionScreen: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const dataRedux = useSelector((state: RootState) => state.data);
    const [DataHistoriTransaction, setHistoruTransaction] = useState<DataRecord[]>([])
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            return () => {
            };
        }, [dispatch])
    );
    const fetchData = async () => {
        const hasil: any = await Promise.all([
            dispatch(fetchDataPrivate({
                idredux: "transaction",
                endpoint: `https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=${offset}&limit=${5}`,
                method: 'GET',
                logOut: () => dispatch(logout())
            }))

        ]);
        setHistoruTransaction(hasil[0].payload.data.data.records)
    }
    const loadMore = () => {
        setLoading(true);
        setTimeout(async () => {
            setOffset((prev) => prev + 1);
          const hasil:any =  await Promise.all([
            await dispatch(fetchDataPrivate({
                idredux: "transaction",
                endpoint: `https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=${offset + 1}&limit=${5}`,
                method: 'GET',
                logOut: () => dispatch(logout())
            }))
          ])
            setHistoruTransaction(prevData => [...prevData, ...hasil[0].payload.data.data.records])
            setLoading(false);

        }, 3000)
    }

    if (dataRedux?.balance?.error || dataRedux?.transaction?.error) {
        <ErrorComponent error={dataRedux?.balance?.error || dataRedux?.transaction?.error} />
    }

    if (dataRedux?.balance?.loading || dataRedux?.transaction?.loading) {
        <Loading />
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#e74c3c', borderRadius: 10, padding: 18 }}>
                <Text style={styles.balanceText}>Saldo anda</Text>
                <Text style={styles.balanceAmount}> {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(dataRedux?.balance?.items?.data?.balance || 0)}</Text>
            </View>
            <View style={{ marginVertical: 25 }}>
                <Text style={styles.promptText}>Transaksi</Text>
            </View>
            <FlatList
                data={DataHistoriTransaction}
                keyExtractor={(item) => `${item?.invoice_number}`}
                renderItem={CardTransaksi}
                onEndReachedThreshold={0.5}
            />
            {
                loading ?
                    <ActivityIndicator /> :
                    <TouchableOpacity
                        onPress={loadMore}
                        style={styles.pembayaranButton}
                    >
                        <Text style={styles.pembayaranButtonText}>Show more</Text>
                    </TouchableOpacity>
            }
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
