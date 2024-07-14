import { _storeData, getData } from "@helper/LocalStorage";
import { Alert } from "react-native";
import {
    DataBanner, DataService, DataTransaction,
    DataHistoryTransaction, DataRecord,
    DataProfile,
    DataModalVisible
} from "config/Type/type";
import React from "react";
type DataType = DataBanner | DataService | DataTransaction |
    DataHistoryTransaction | DataRecord | DataProfile | DataModalVisible;
export async function getDataFetchArray<T extends DataType>(
    setData: React.Dispatch<React.SetStateAction<T[] | null>>,
    url: string
): Promise<void> {
    try {
        const token = await getData();
        const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/${url}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        const hasilResponse = await response.json();
        if (hasilResponse?.status === 0) {
            setData(hasilResponse.data);
        } else {
            Alert.alert(hasilResponse?.message || "Tidak dapat mengambil data");
        }
    } catch (e) {
        Alert.alert("Terjadi kesalahan, coba beberapa saat lagi")
    }
}
export async function getDataFetchObj<T extends DataType>(
    setData: React.Dispatch<React.SetStateAction<T | null>>,
    url: string
): Promise<object | any> {
    try {
        const token = await getData();
        const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/${url}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },

        });
        const hasilResponse = await response.json();
        if (hasilResponse?.status === 0) {
            setData(hasilResponse.data);
            return hasilResponse.data;
        } else {
            Alert.alert(hasilResponse?.message || "Tidak dapat mengambil data")
        }

    } catch (e) {
        console.log(e);
        Alert.alert("Terjadi kesalahan, coba beberapa saat lagi")
    }
}
export async function getDataFetchObjWithPagination<T extends DataType>(
    setData: React.Dispatch<React.SetStateAction<T[]>>,
    url: string,
    offset: number
): Promise<void> {
    try {
        const token = await getData();
        const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/${url}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },

        });
        const hasilResponse = await response.json();
        if (hasilResponse?.status === 0) {
            if (offset === 0) {
                setData(hasilResponse.data.records);
            } else {
                const records = hasilResponse.data.records
                setData(prevData => [...prevData, ...records])
            }
        } else {
            Alert.alert(hasilResponse?.message || "Tidak dapat mengambil data");
        }
    } catch (e) {
        console.log(e);
        Alert.alert("Terjadi kesalahan, coba beberapa saat lagi")
    }
}

export async function postData<T extends DataType>(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setModalVisible: React.Dispatch<React.SetStateAction<T>>,
    payload?: object,
    url?: string,
    login?: () => void
) {
    try {
        setLoading(true);
        const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/${url}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const hasilResponse = await response.json();
        setLoading(false);
        if (hasilResponse.status !== 0) {
            setModalVisible((prev) => ({
                ...prev,
                cek: true,
                message: hasilResponse.message
            }));
        } else {
            Alert.alert(hasilResponse.message)
            _storeData(hasilResponse.data.token);
            login;
        }

    } catch (e) {
        setLoading(false);
    }
}