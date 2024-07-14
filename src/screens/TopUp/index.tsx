import FieldWithIcon from '@components/atoms/FieldWithIcon';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { delay, formatNumber, removeFormatting } from '@helper/func';
import { _storeData, getData } from '@helper/LocalStorage';
import { DataTransaction } from "config/Type/type";
import { getDataFetchObj } from '@helper/api/Api';
import ModalComponent from '@components/atoms/ModalComoponent';
import { useFocusEffect } from '@react-navigation/native';
const TopUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [balance, setBalance] = useState<DataTransaction | null>(null);
  const [topUpAmount, setTopUpAmount] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<object>({
    cek: false,
    message: ""
  });
  const [modalVisibleSucces, setModalVisibleSucces] = useState<object>({
    cek: false,
    message: ""
  });
  const [modalVisibleFailed, setModalVisibleFailed] = useState<object>({
    cek: false,
    message: ""
  });
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
        return () => {
          setTopUpAmount('0');
        };
    }, [])
);
  const fetchData = async () => {
    await getDataFetchObj(setBalance, "balance")
  };
  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setTopUpAmount(`Rp${formatNumber(numericValue)}`);
  };
  const handleButtonPress = (amount: any) => {
    setTopUpAmount(`Rp${amount.toLocaleString('id-ID')}`);
  };
  const handleTopUp = async () => {
    const nominal = removeFormatting(topUpAmount);
    try {
      const token = await getData();
      setLoading(true);
      await delay(3000);
      const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/topup`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({ top_up_amount: nominal })
      });
      const hasilResponse = await response.json();
      if (hasilResponse.status !== 0) {
        setLoading(false);
        handleRepsonseFailed();
      }
      fetchData();
      setLoading(false);
      handleRepsonseSucces()
    } catch (e) {
      setLoading(false);
      handleRepsonseFailed();
    }
  }
  const handleRepsonseFailed = async () => {
    setModalVisible(prev => {
      return {
        ...prev,
        cek: false
      }
    })
    await delay(1000);
    setModalVisibleFailed(prev => {
      return {
        ...prev,
        cek: true
      }
    })
  }
  const handleRepsonseSucces = async () => {
    setModalVisible(prev => {
      return {
        ...prev,
        cek: false
      }
    })
    await delay(1000);
    setModalVisibleSucces(prev => {
      return {
        ...prev,
        cek: true
      }
    })
  }
  const handleCloseAllStateModal =  async() => {
    await delay(500);
    setModalVisible(prev => {
      return {
        ...prev,
        cek: false,
        message:""
      }
    })
    setModalVisibleSucces(prev => {
      return {
        ...prev,
        cek: false,
        message: ""
      }
    })
    setModalVisibleFailed(prev => {
      return {
        ...prev,
        cek: false,
        message: ""
      }
    })
    navigation.navigate("Home")
  }
  const nominal = Number(removeFormatting(topUpAmount));
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#e74c3c', borderRadius: 10, padding: 18 }}>
        <Text style={styles.balanceText}>Saldo anda</Text>
        <Text style={styles.balanceAmount}>{new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(balance?.balance || 0)}</Text>
      </View>
      <View style={{ marginVertical: 40 }}>
        <Text style={styles.promptText}>Silahkan masukan</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>nominal Top Up</Text>
      </View>
      <FieldWithIcon
        styleTextInput={{ height: 40 }}
        placeholder='Masukan nominal Top Up'
        value={topUpAmount}
        keyboardType='numeric'
        onChange={(text: string) => handleInputChange(text)}
        iconName={faCalculator}
      />
      <View style={styles.buttonContainer}>
        {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={styles.button}
            onPress={() => {
              handleButtonPress(amount)
            }}
          >
            <Text style={styles.buttonText}>Rp{amount.toLocaleString('id-ID')}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.topUpButton}
        disabled={loading || (nominal < 10000)}
        onPress={() => setModalVisible(prev => ({
          ...prev,
          cek: true
        }))}
      >
        {
          loading ?
            <ActivityIndicator /> :
            <Text style={styles.topUpButtonText}>Top Up</Text>
        }
      </TouchableOpacity>
      <ModalComponent
        handlePay={() => handleTopUp()}
        urlImage={require('@assets/logos/Logo.png')}
        service_name="Anda yakin untuk Top Up sebesar"
        service_tarif={Number(removeFormatting(topUpAmount))}
        modalVisible={modalVisible}
        loading={loading}
        textButton='Ya, lanjutkan Top Up'
        setModalVisible={setModalVisible} />
      <ModalComponent
        isSucces={true}
        loading={loading}
        navigation={navigation}
        urlImage={'https://w7.pngwing.com/pngs/399/483/png-transparent-check-complete-done-green-success-valid-greenline-icon-thumbnail.png'}
        service_name={`Top Up sebesar`}
        service_tarif={Number(removeFormatting(topUpAmount))}
        modalVisible={modalVisibleSucces}
        handleCloseAllStateModal={() => handleCloseAllStateModal()}
        setModalVisible={setModalVisibleSucces} />
      <ModalComponent
        isFailed={true}
        loading={loading}
        navigation={navigation}
        urlImage={'https://cdn-icons-png.flaticon.com/512/6659/6659895.png'}
        service_name={`Top Up sebesar`}
        service_tarif={Number(removeFormatting(topUpAmount))}
        modalVisible={modalVisibleFailed}
        handleCloseAllStateModal={() => handleCloseAllStateModal()}
        setModalVisible={setModalVisibleFailed} />
    </View>
  );
};
const styles = StyleSheet.create({
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
  topUpButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'gray',
    alignItems: 'center',
    borderRadius: 5,
  },
  topUpButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default TopUpScreen;
