import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorComponent:React.FC<any> = ({ errorMessage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error: {errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ErrorComponent;
