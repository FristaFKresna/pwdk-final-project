import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ILTroli } from '../../../assets'
import { Button } from '../../atoms'
import { colors, fonts } from '../../../utils'


const NullCarts = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.troli}>
                <Image source={ILTroli} style={styles.img} />
                <Text style={styles.title}>Sayang Sekali Keranjang Belanjamu Kosong</Text>
                <Text style={styles.info}>Silahkan lakukan pemesanan Buku yang kamu inginkan untuk melanjutkan transaksi</Text>
            </View>
            <View>
                <Button title='Order a Book' onPress={()=>props.navigation.navigate('Home')} />
            </View>
        </View>
    )
}

export default NullCarts

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    troli: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 110,
        height: 100
    },
    title: {
        fontSize: 15,
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    info: {
        fontSize: 13,
        fontFamily: fonts.primary.normal,
        textAlign: 'center',
        color: colors.text.secondary
    }
})
