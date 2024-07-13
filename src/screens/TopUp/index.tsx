import FieldWithIcon from '@components/atoms/FieldWithIcon';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { formatNumber, removeFormatting } from '@helper/func';
import { _storeData, getData } from '@helper/LocalStorage';
import { DataTransaction } from "config/Type/type";
import { getDataFetchObj } from '@helper/api/Api';

const TopUpScreen: React.FC= () => {
  const [balance, setBalance] = useState<DataTransaction | null>(null);
  const [topUpAmount, setTopUpAmount] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getDataFetchObj(setBalance, "balance")
  };

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setTopUpAmount(`Rp${formatNumber(numericValue)}`);
  };

  const handleButtonPress = (amount:any) => {
    setTopUpAmount(`Rp${amount.toLocaleString('id-ID')}`);
  };

  const handleTopUp = async () => {
    const nominal = removeFormatting(topUpAmount);
    try {
      const token = await getData();
      setLoading(true);
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
        setTopUpAmount('');
        return Alert.alert(hasilResponse.message);
      }
      Alert.alert(hasilResponse.message);
      fetchData();
      setTopUpAmount('');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setTopUpAmount('');

    }
  }


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
        disabled={loading}
        onPress={() => handleTopUp()}
      >
        {
          loading ?
            <ActivityIndicator /> :
            <Text style={styles.topUpButtonText}>Top Up</Text>
        }
      </TouchableOpacity>
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
