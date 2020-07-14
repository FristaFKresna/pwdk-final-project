import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const NullWishlist = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Oops...</Text>
            <Text style={styles.text2}>Wishlist mu Kosong !!!</Text>
        </View>
    )
}

export default NullWishlist

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary
    },
    text2: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary

    }
})
