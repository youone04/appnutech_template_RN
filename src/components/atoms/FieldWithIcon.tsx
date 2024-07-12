import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle, KeyboardType } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Text } from 'react-native-svg';
type FieldProps = {
    placeholder?: string;
    iconName?: any;
    styleTextInput?: TextStyle;
    styleContainer?: ViewStyle;
    styleIcon?: TextStyle;
    count?: number;
    keyboardType?: KeyboardType;
    secureTextEntry?: boolean;
    onChange?:any;
    value?: string
}

const FieldWithIcon: React.FC<FieldProps> = (data) => {
    return (
        <View style={[styles.container, data.styleContainer]}>
            {
                data.iconName ?
                    <FontAwesomeIcon icon={data.iconName} style={styles.icon} /> :
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
            />
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
        color:'gray'
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 50,
        borderRadius: 5,
    }
});

export default FieldWithIcon;