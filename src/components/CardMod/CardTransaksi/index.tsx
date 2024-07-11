import React from 'react';
import { View, Text } from 'react-native';

const CardTransaksi: React.FC = () => {
    return (
        <>
            <View style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 20,
                marginBottom: 10
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        marginBottom: 10,
                        color: 'green',
                        fontSize: 25
                    }}>+ Rp.10.000</Text>
                    <Text >Top Up Saldo</Text>
                </View>
                <View>
                    <Text style={{ color: 'gray' }}>17 Agustus 2023 13:30 WIB</Text>
                </View>
            </View>
        </>
    )
}


export default CardTransaksi;