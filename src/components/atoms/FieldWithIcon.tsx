import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FieldProps {
    placeholder?: string;
    iconName : string;
    styleTextInput?: TextStyle;
    styleContainer?: ViewStyle;
    styleIcon?: TextStyle;
    // count: number;
    // onClick: () => void;
  } 
const FieldWithIcon: React.FC<FieldProps> = (data) => {
    return(
        <View style={[styles.container , data.styleContainer]}>
        <Icon name={data.iconName} size={20} color="#aaa" style={[styles.icon, data.styleIcon]} />
        <TextInput
            style={[styles.input, data.styleTextInput]}
            placeholder={data.placeholder}
            placeholderTextColor="#aaa"
            keyboardType="email-address"
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
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 50,
        borderRadius: 5,
    }
});

export default FieldWithIcon;