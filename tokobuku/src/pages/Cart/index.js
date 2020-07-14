import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ContentCarts, NullCarts, HeaderMain } from '../../components/'
import { colors } from '../../utils'

const Cart = (props) => { 
    return (
        <View style={styles.container}>
            <HeaderMain title='Cart' />
            <ContentCarts navigation={props.navigation}/>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})
