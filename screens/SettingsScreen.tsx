import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const SettingsScreen = props => {
    return <View style={styles.container}>
        <Text>SettingsScreen</Text>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SettingsScreen;
