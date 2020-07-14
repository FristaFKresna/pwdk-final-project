import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../utils';
import { HeaderMain } from '../../components';

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <HeaderMain title='Dashboard' />
            <Text>Dashboard Page</Text>
        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})
