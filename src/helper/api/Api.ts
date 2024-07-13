import { getData } from "@helper/LocalStorage";
import { Alert } from "react-native";
import { 
    DataBanner, DataService, DataTransaction, 
    DataHistoryTransaction, DataRecord,
    DataProfile
 } from "config/Type/type";
import { useAuth } from "@helper/AuthContext/AuthContext";

type DataType = DataBanner | DataService | DataTransaction | 
DataHistoryTransaction | DataRecord | DataProfile;

export async function getDataFetchArray<T extends DataType>(
    setData: React.Dispatch<React.SetStateAction<T[] | null>>,
    url: string
): Promise<void> {
    // const {logout} = useAuth();
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
            // logout();

        }

    } catch (e) {
        console.log(e);
        Alert.alert("Terjadi kesalahan, coba beberapa saat lagi")
    }
}

export async function getDataFetchObj<T extends DataType>(
    setData: React.Dispatch<React.SetStateAction<T | null>>,
    url: string
): Promise<object | any> {
    // const {logout} = useAuth();
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
            // logout();
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
        // console.log(hasilResponse)
        if (hasilResponse?.status === 0) {
            if(offset===0){
                setData(hasilResponse.data.records);
            }else{
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