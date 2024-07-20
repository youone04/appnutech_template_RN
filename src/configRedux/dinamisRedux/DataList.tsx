import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchData } from './actions';

const DataList: React.FC = () => {
    const data = useSelector((state: RootState) => state.data);
    const dispatch: AppDispatch = useDispatch();

    const [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(fetchData({ idredux: "todosGet", endpoint: 'https://jsonplaceholder.typicode.com/todos', method: 'GET' }));
        // dispatch(fetchData({ idredux: "postsGet", endpoint: 'https://jsonplaceholder.typicode.com/posts', method: 'GET' }));
    }, [dispatch]);

    const handlePostData = () => {
        const newItem = { id: Date.now(), title };
        dispatch(fetchData({ idredux: "postPost", endpoint: 'https://jsonplaceholder.typicode.com/todos', method: 'POST', body: newItem }));
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
            {/* {Object.keys(data).map((endpoint) => (
                <View key={endpoint} style={styles.endpointContainer}>
                    <Text style={styles.endpointTitle}>{endpoint}</Text>
                    {data['postsGet'].loading && <Text>Loading...</Text>}
                    {data[endpoint].error && <Text>{data[endpoint].error}</Text>}
                    <FlatList
                        data={data[endpoint].items}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Text>{item.title}</Text>}
                    />
                </View>
            ))} */}

            <FlatList
                data={data['todosGet'].items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.title}</Text>}
            />
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
    endpointContainer: {
        marginVertical: 20,
    },
    endpointTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default DataList;
