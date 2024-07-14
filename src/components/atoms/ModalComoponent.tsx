import { formatMataUang } from '@helper/func';
import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
interface DataVisible {
    cek?: boolean
    message?: string,
}
interface DataPropsModalComponent {
    modalVisible?: DataVisible
    setModalVisible: (visible: DataVisible) => void
    handlePay?: () => void
    handleCloseAllStateModal?: () => void
    service_tarif?: number
    service_name?: string
    urlImage?: any
    isSucces?: boolean
    isFailed?: boolean
    navigation?: any
    loading?: boolean
    textButton?: string
}
const ModalComponent: React.FC<DataPropsModalComponent> = (data) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={data.modalVisible?.cek}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    data.setModalVisible({
                        ...data.modalVisible,
                        cek: !data.modalVisible?.cek
                    });
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            <Image source={data.isSucces || data.isFailed ? { uri: data.urlImage } : data.urlImage}
                                style={styles.logo} />
                            <View>
                                <Text style={styles.modalTextDesc}>{data.service_name}</Text>
                                <Text style={styles.modalTextPrice}>{formatMataUang(data.service_tarif || 0)}</Text>
                                {data.isSucces && <Text style={styles.modalTextSuccess}>berhasil!!!</Text>}
                                {data.isFailed && <Text style={styles.modalTextSuccess}>gagal</Text>}

                            </View>
                        </View>

                        <View style={styles.buttonGroup}>
                            {!data.isSucces && !data.isFailed ? <>
                                <Pressable
                                    style={[styles.button]}
                                    disabled={data.loading}
                                    onPress={data.handlePay}>
                                    {
                                        data.loading ?
                                            <Text style={styles.textStyle}>tunggu..</Text> :
                                            <Text style={styles.textStyle}>{data.textButton}</Text>

                                    }
                                </Pressable>
                                <Pressable
                                    style={[styles.button]}
                                    disabled={data.loading}
                                    onPress={() => data.setModalVisible({
                                        ...data.modalVisible,
                                        cek: !data.modalVisible?.cek
                                    })}>
                                    {
                                        data.loading ?
                                            <Text></Text> :
                                            <Text style={styles.textStyleCancel}>Batalkan</Text>


                                    }
                                </Pressable>
                            </> :
                                <Pressable
                                    style={[styles.button]}
                                    onPress={data.handleCloseAllStateModal}>
                                    <Text style={styles.textStyle}>Kembali ke beranda</Text>
                                </Pressable>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        padding: 20
    },
    buttonGroup: {
        flexDirection: 'column',
        gap: 20,
    },
    modalView: {
        margin: 20,
        height: 320,
        width: '100%',
        flexDirection: 'column',
        gap: 35,
        backgroundColor: 'white',
        borderRadius: 13,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalContent: {
        flexDirection: 'column',
        gap: 30
    },
    logo: {
        width: 70,
        height: 70,
        alignSelf: 'center'
    },
    button: {
        borderRadius: 20,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'red',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTextDesc: {
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 20
    },
    modalTextPrice: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'

    },
    modalTextSuccess: {
        textAlign: 'center',
        marginTop: 5
    },
    textStyleCancel: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
        fontWeight: 'bold'
    }
});
export default ModalComponent;