import FieldWithIcon from '@components/atoms/FieldWithIcon';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
// import { useAuth } from '@helper/AuthContext/AuthContext';
import { _storeData } from '@helper/LocalStorage';
import { validataForm, validateEmail } from '@helper/func';
import { DataLogin, DataNotif } from "config/Type/type"
import ModalNotif from '@components/atoms/ModalNotif';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@configRedux/store/store';
import { postData } from '@configRedux/actions/actionPosts/postLogin';
import { login } from '@configRedux/reducers/auth/reducerAuth';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { loading } = useSelector((state: RootState) => state.dataLogin);
    const dispatch: AppDispatch = useDispatch();

    const [notif, setNotif] = useState<DataNotif>({ notif: false });
    const [dataLogin, setDatalogin] = useState<DataLogin>({
        email: '',
        password: ''
    });
    const [modalVisible, setModalVisible] = useState<object>({
        cek: false,
        message: ""
    });
    const [secureTextEntry, setSecureEntry] = useState<boolean>(true);
    const handleInputChange = (field: keyof DataLogin, text: string) => {
        setDatalogin(prevData => ({
            ...prevData,
            [field]: text
        }));
    };
    const handleLogin = async () => {
        const invalidFields = validataForm(dataLogin);
        if (invalidFields.length > 0) {
            setNotif({ notif: true });
        } else if (!validateEmail(dataLogin.email)) {
            return null
        } else if (dataLogin.password.length < 8) {
            return null
        } else {
            setNotif({ notif: false });
            // await postData(setLoading, setModalVisible, payload, "login", login);
            const payload = { email: dataLogin.email, password: dataLogin.password, url: "login" };
            const resultAction = await dispatch(postData(payload));
            if (postData.rejected.match(resultAction)) {
                setModalVisible({
                    cek: true,
                    message: resultAction.payload as string,
                });
            } else {
                dispatch(login());
            }

        }
    };
    const handleSecureEntry = () => {
        setSecureEntry(prev => !prev)
    }
    const valid = validataForm(dataLogin);
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={require('@assets/logos/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>SIMS PPOB</Text>
            </View>
            <Text style={styles.subtitle}>Masuk atau buat akun untuk memulai</Text>
            <FieldWithIcon
                id='email'
                placeholder="masukan email anda"
                iconName={faAt}
                onChange={(text: string) => handleInputChange('email', text)}
                value={dataLogin.email}
                isEmail={true}
                isNull={notif.notif}
                validateForm={valid}
            />
            <FieldWithIcon
                id='password'
                placeholder="masukan pasword anda"
                iconName={faLock}
                isPassword={true}
                secureTextEntry={secureTextEntry}
                validateForm={valid}
                isNull={notif.notif}
                handleSecureEntry={handleSecureEntry}
                onChange={(text: string) => handleInputChange('password', text)}
                value={dataLogin.password}
            />
            <TouchableOpacity disabled={loading} onPress={handleLogin} style={styles.button}>
                {
                    loading ?
                        <ActivityIndicator /> :
                        <Text style={styles.buttonText}>Masuk</Text>
                }
            </TouchableOpacity>

            <Text style={styles.registerText}>
                belum punya akun? <Text onPress={() => navigation.navigate('Register')} style={styles.registerLink}>registrasi di sini</Text>
            </Text>
            <ModalNotif modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    );
};
const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row', // Arrange children in a row
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 20,
        marginHorizontal: 10
    },
    title: {
        fontSize: 25,
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#ff0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerText: {
        fontSize: 14,
        color: '#000',
    },
    registerLink: {
        color: '#ff0000',
        fontWeight: 'bold',
    },
});
export default LoginScreen;
