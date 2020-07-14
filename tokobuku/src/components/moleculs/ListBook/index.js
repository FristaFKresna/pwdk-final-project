import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ILBook1 } from '../../../assets'
import { colors, fonts } from '../../../utils'
import NumberFormat from 'react-number-format'

const ListBook = (props) => {
    return (
        <View style={styles.container}>
            <Image source={props.image} style={styles.img} />
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.author}>{props.author}</Text>
            <NumberFormat 
                value={props.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                renderText={value=><Text style={styles.price}>{value}</Text>} />
        </View>
    )
}

export default ListBook

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.border,
        alignSelf: 'flex-start',
        marginRight: 10,
        marginLeft : 10,
        width: 170,
        height: 270,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    img: {
        width: 130,
        height: 150,
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary
    },
    author: {
        fontSize: 12,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.secondary
    },
    price: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        marginBottom: 10,
        color: colors.text.primary
    }
})
