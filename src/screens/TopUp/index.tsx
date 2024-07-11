import FieldWithIcon from '@components/atoms/FieldWithIcon';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TopUpScreen: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [topUpAmount, setTopUpAmount] = useState<string>('');

  const handleTopUp = (amount: number) => {
    setBalance(balance + amount);
  };

  return (
    <View style={styles.container}>
     <View style={{backgroundColor:'#e74c3c', borderRadius:10, padding: 18}}>
     <Text style={styles.balanceText}>Saldo anda</Text>
     <Text style={styles.balanceAmount}>Rp {balance}</Text>
     </View>

      <View style={{marginVertical: 40}}>
      <Text style={styles.promptText}>Silahkan masukan</Text>
      <Text style={{fontSize:16, fontWeight:'bold'}}>nominal Top Up</Text>
      </View>
      <FieldWithIcon
      styleTextInput={{height: 40}}
      placeholder='Masukan nominal Top Up'
      iconName='calculator'
      />

      <View style={styles.buttonContainer}>
        {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={styles.button}
            onPress={() => handleTopUp(amount)}
          >
            <Text style={styles.buttonText}>Rp{amount.toLocaleString('id-ID')}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.topUpButton}
        onPress={() => handleTopUp(Number(topUpAmount))}
      >
        <Text style={styles.topUpButtonText}>Top Up</Text>
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