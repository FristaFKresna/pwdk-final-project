import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ILBookCat, IconBookCat } from '../../../assets'
import { colors, fonts } from '../../../utils'

const StatusTransaction = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
        </View>
    )
}

export default StatusTransaction

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: colors.border,
        alignSelf: 'flex-start',
        marginRight: 10,
        width: 200,
        height: 50,
        borderRadius:50
    },
    label: {
        textAlign:'center',
        fontSize: 15,
        fontFamily: fonts.primary[300],
        color: colors.text.primary
    }
})