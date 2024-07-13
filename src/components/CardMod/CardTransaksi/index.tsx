import React from 'react';
import { View, Text } from 'react-native';
// import moment from "moment";

import { DataRecord } from "config/Type/type";
const CardTransaksi = ({ item } : { item: DataRecord }) => {
    return (
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
                {
                    item.transaction_type === "PAYMENT" ?
                        <Text style={{
                            marginBottom: 10,
                            color: 'red',
                            fontSize: 22,
                            fontWeight: '500'
                        }}>- {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(item.total_amount || 0)
                            }</Text> :
                        <Text style={{
                            marginBottom: 10,
                            color: 'green',
                            fontSize: 22,
                            fontWeight: '500'
                        }}>+ {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(item.total_amount || 0)
                            }</Text>
                }
                <Text >{item.transaction_type}</Text>
            </View>
            <View>
                <Text style={{ color: 'gray', fontSize: 12 }}>{item.created_on}</Text>
            </View>
        </View>
    )
}


export default CardTransaksi;