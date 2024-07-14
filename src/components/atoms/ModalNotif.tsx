import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface  DataVisible {
    cek?: boolean
    message?: string
}
interface DataPropsModalNotif {
    modalVisible?: DataVisible
    setModalVisible: (visible: DataVisible) => void;
}
const ModalNotif: React.FC<DataPropsModalNotif> = (data) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={data?.modalVisible?.cek}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    data.setModalVisible({ ...data.modalVisible, cek: false })
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => data.setModalVisible({ ...data.modalVisible, cek: false })}>
                            <FontAwesomeIcon style={{color:'red'}} icon={faClose} size={10} />

                        </Pressable>
                        <Text style={styles.modalText}>{data.modalVisible?.message?.toLowerCase()}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        backgroundColor: '#fff5f5',
        borderRadius: 7,
        padding: 3,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        top: 10,
        right: 10,
        color:'red'
    },
    modalText: {
        bottom: 6,
        color:'red',
        right: 65
    },
});

export default ModalNotif;
