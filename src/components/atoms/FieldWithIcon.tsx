import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle, KeyboardType, Text, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

type FieldProps = {
    placeholder?: string;
    iconName?: any;
    styleTextInput?: TextStyle;
    styleContainer?: ViewStyle;
    styleIcon?: TextStyle;
    count?: number;
    keyboardType?: KeyboardType;
    secureTextEntry?: boolean;
    onChange?: any;
    value?: string;
    disabled?: boolean
    id?: string
    isNull?: boolean
    validateForm?: any

}

const FieldWithIcon: React.FC<FieldProps> = (data) => {
    let dataNotValid = [];
    if (data?.validateForm) {
        dataNotValid = data?.validateForm;
    }
    console.log(data.isNull)
    return (
        <View style={{ width: SCREEN_WIDTH - 40, marginBottom: 7 }}>
            <View style={
                [styles.container,
                data.styleContainer,
                dataNotValid.includes(data.id) && data.isNull?
                    { borderColor: 'red' } : {}
                ]}>
                {
                    data.iconName ?
                        <FontAwesomeIcon icon={data.iconName} style={[
                            dataNotValid.includes(data.id) && data.isNull?
                            styles.iconRed:
                            styles.icon

                        ]} /> :
                        <Text></Text>

                }
                <TextInput
                    style={[styles.input, data.styleTextInput]}
                    placeholder={data.placeholder}
                    placeholderTextColor="#aaa"
                    keyboardType={data.keyboardType}
                    secureTextEntry={data.secureTextEntry}
                    onChangeText={data.onChange}
                    value={data.value}
                    editable={data.disabled}
                    autoCapitalize='none'
                    id={data.id}
                />
            </View>
            {
                dataNotValid.includes(data.id) && data.isNull ?
                    <Text style={{
                        color: 'red',
                        right: 6,
                        bottom: 0,
                        position: 'absolute'
                    }}>Field tidak boleh kosong</Text> : null

            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 20
    },
    icon: {
        marginRight: 10,
        color: 'gray'
    },
    iconRed: {
        marginRight: 10,
        color: 'red'
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 45,
        borderRadius: 5

    }
});

export default FieldWithIcon;