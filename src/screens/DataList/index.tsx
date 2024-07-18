import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@configRedux/store/store';
import { postData } from '@configRedux/actions/actionPosts/postLogin';
// import { fetchData, postData } from '@configRedux/actions/index';

const DataList: React.FC = () => {
  const {loading, error } = useSelector((state: RootState) => state.dataLogin);
  const dispatch: AppDispatch = useDispatch();

  const [title, setTitle] = useState('');

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  // const handlePostData = () => {
  //   const newItem = { id: Date.now(), title };
  //   dispatch(postData(newItem));
  //   setTitle('');
  // };

  const handlePostData = () => {
    const newItem = { email: "user@user.com", password: "12345678" , url:"login"};
    dispatch(postData(newItem));
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter item title"
      />
      <Button title="Post Data" onPress={handlePostData} />
      {/* <Button title="Fetch Data" onPress={() => dispatch(fetchData())} /> */}
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {/* <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
});

export default DataList;
