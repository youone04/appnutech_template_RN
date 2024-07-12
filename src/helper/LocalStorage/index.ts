import AsyncStorage from '@react-native-async-storage/async-storage';
export const _storeData = async (value:string) => {
    try {
      await AsyncStorage.setItem("@token", value);
    } catch (error) {
        console.log(error)
      // Error saving data
    }
  };

  export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      return value
    } catch (e) {
        return "error";
    }
  };