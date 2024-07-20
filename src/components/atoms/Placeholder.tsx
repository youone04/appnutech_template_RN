import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Placeholder = () => {
    return (
        <>
            {
                [1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                    <View style={styles.container}>
                        <SkeletonPlaceholder borderRadius={4}>
                            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                {/* <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} /> */}
                                <SkeletonPlaceholder.Item marginHorizontal={50}>
                                    <SkeletonPlaceholder.Item width={300} height={20} />
                                    <SkeletonPlaceholder.Item marginTop={6} width={300} height={20} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>
                ))
            }


        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        padding: 1,               // Optional: Add padding around the edges
    },
});

export default Placeholder;
