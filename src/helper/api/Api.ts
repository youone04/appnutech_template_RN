import { getData } from "@helper/LocalStorage";
import { Alert } from "react-native";
import { DataBanner, DataService } from "config/Type/type";
type DataType = DataBanner | DataService;

export async function getDataFetch<T extends DataType>(
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
            Alert.alert(hasilResponse?.message || "Tidak dapat mengambil data")
        }

    } catch (e) {
        console.log(e);
        Alert.alert("Terjadi kesalahan, coba beberapa saat lagi")
    }
}