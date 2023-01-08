import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ChatSettingsScreen = props => {
    return <View style={styles.container}>
        <Text>ChAT SETTING SCREEN</Text>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ChatSettingsScreen;
