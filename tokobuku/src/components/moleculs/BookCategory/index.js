import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ILBookCat, IconBookCat } from '../../../assets'
import { colors, fonts } from '../../../utils'

const Bookcategory = (props) => {
    return (
        <View style={styles.container}>
            <Image source={ILBookCat} style={styles.img} />
            <Text style={styles.label}>{props.label}</Text>
            <Text style={styles.category}>{props.category}</Text>
        </View>
    )
}

export default Bookcategory

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: colors.border,
        alignSelf: 'flex-start',
        marginRight: 10,
        width: 100,
        height: 130
    },
    img: {
      width: 40,
      height: 50,
      borderRadius: 10  ,
      marginBottom: 15
    },
    label: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.primary
    },
    category: {
        fontSize: 12,
        fontFamily: fonts.primary[600],
        color: colors.text.primary
    }
})