import FieldWithIcon from '@components/atoms/FieldWithIcon';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { delay, formatNumber, removeFormatting } from '@helper/func';
import ModalComponent from '@components/atoms/ModalComoponent';
import { useFocusEffect } from '@react-navigation/native';
import ErrorComponent from '@components/atoms/ErrorComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@configRedux/store/store';
import { postDataTopUp } from '@configRedux/actions/actionPosts/postTopUp';
import Loading from '@components/atoms/Loading';

const TopUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();
  const { balance, loading, error } = useSelector((state: RootState) => state.dataBalance);
  const { loading: loadingBalance, error: errorBalance } = useSelector((state: RootState) => state.dataTopUp);
  const [loadingButton , setLoading] = useState<boolean>(false);


  const [topUpAmount, setTopUpAmount] = useState<string>('0');
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
      return () => {
        setTopUpAmount('0');
      };
    }, [])
  );

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setTopUpAmount(`Rp${formatNumber(numericValue)}`);
  };
  const handleButtonPress = (amount: any) => {
    setTopUpAmount(`Rp${amount.toLocaleString('id-ID')}`);
  };
  const handleTopUp = async () => {
    const nominal = removeFormatting(topUpAmount);
    const payload = { top_up_amount: Number(nominal), url: "topup" }
    setLoading(true);
    await delay(3000);
    const resultAction = await dispatch(postDataTopUp(payload));
    if (postDataTopUp.rejected.match(resultAction)) {
      return handleRepsonseFailed();
    }
    setLoading(false);
    handleRepsonseSucces()
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
  const handleCloseAllStateModal = async () => {
    await delay(500);
    setModalVisible(prev => {
      return {
        ...prev,
        cek: false,
        message: ""
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

  if (errorBalance || error) {
    <ErrorComponent errorMessage={errorBalance || error} />
  }

  if(loading){
    <Loading/>
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
        }).format(balance || 0)}</Text>
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
        disabled={loadingButton || loadingBalance || (nominal < 10000)}
        onPress={() => setModalVisible(prev => ({
          ...prev,
          cek: true
        }))}
      >
        {
          loadingButton || loadingBalance ?
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
        loading={loadingButton || loadingBalance}
        textButton='Ya, lanjutkan Top Up'
        setModalVisible={setModalVisible} />
      <ModalComponent
        isSucces={true}
        loading={loadingButton || loadingBalance}
        navigation={navigation}
        urlImage={'https://w7.pngwing.com/pngs/399/483/png-transparent-check-complete-done-green-success-valid-greenline-icon-thumbnail.png'}
        service_name={`Top Up sebesar`}
        service_tarif={Number(removeFormatting(topUpAmount))}
        modalVisible={modalVisibleSucces}
        handleCloseAllStateModal={() => handleCloseAllStateModal()}
        setModalVisible={setModalVisibleSucces} />
      <ModalComponent
        isFailed={true}
        loading={loadingBalance || loadingBalance}
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
