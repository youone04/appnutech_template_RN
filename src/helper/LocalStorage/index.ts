import AsyncStorage from '@react-native-async-storage/async-storage';
export const _storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem("@token", value);
  } catch (error) {
    console.log(error)
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
export const _removeData = async () => {
  try {
    await AsyncStorage.removeItem('@token');
  } catch (e) {
    console.log(e);
  }
}