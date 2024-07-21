import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const IsEmptyComp: React.FC = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.textNoData}>No Data</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    textNoData:{
        color: 'gray',
        fontSize: 20,
        alignSelf:'center',
        textAlignVertical:'center'
    }
})

export default IsEmptyComp;

