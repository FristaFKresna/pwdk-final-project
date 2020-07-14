import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import ListBook from './../ListBook/index'
import NumberFormat from 'react-number-format'
import { Gap } from '../../atoms'
import { IconMinusButton, IconPlusButton } from '../../../assets'
import Axios from 'axios'
import { API_URL } from '../../../supports/constants/urlApi'

const ProductDetailContent = (props) => {

    return (
        <View style={{flex:1}}>
                <View style={styles.container}>
                    <Image source={props.image} style={styles.img} />
                </View>

                <View style={styles.info}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.author}>{props.author}</Text>
                    <Text style={styles.author}>{props.publisher}</Text>
                </View>

                <View style={styles.detail}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flex:1, alignItems:'center', borderRightWidth: 0.5, marginHorizontal:5}}>
                            <Text style={styles.title_detail}>Halaman</Text>
                            <Text style={styles.text}>{props.halaman}</Text>
                        </View>
                        <View style={{flex:1, alignItems:'center',borderRightWidth: 0.5}}>
                            <Text style={styles.title_detail}>Tahun Terbit</Text>
                            <Text style={styles.text}>{props.tahun}</Text>
                        </View>
                        <View style={{flex:1, alignItems:'center',borderRightWidth: 0.5}}>
                            <Text style={styles.title_detail}>Bahasa</Text>
                            <Text style={styles.text}>{props.bahasa}</Text>
                        </View>
                        <View style={{flex:1, alignItems:'center'}}>
                            <Text style={styles.title_detail}>Stock</Text>
                            <Text style={styles.text}>{props.stock}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.info}>
                    <Text style={styles.deskripsi}>Deskripsi</Text>
                    <Text style={styles.text}>{props.deskripsi}</Text>
                </View>


                {/* SLOT BUAT RATING & REVIEW */}

        </View>
    )
}

export default ProductDetailContent

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.border,
        width: 'auto',
        height: 290,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    img: {
        alignSelf : 'center',
        width: 200,
        height: 250,
        resizeMode: 'stretch'
    },
    info: {
        marginVertical : 5,
        marginHorizontal : 20
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary
    },
    deskripsi: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary,
        borderBottomWidth:0.5,
        borderBottomColor: colors.text.secondary
    },
    author: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.secondary
    },
    title_detail: {
        fontSize: 13,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.secondary
    },
    text: {
        fontSize: 15,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.primary
    },
    price: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        marginBottom: 10,
        color: colors.text.primary
    },
    detail:{
        backgroundColor: colors.border,
        width: 'auto',
        height: 80,
        paddingVertical: 15,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    wrapperScroll: {
        marginHorizontal: -20,
    },
    rated: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    footer:{
        backgroundColor: colors.border,
        width: 'auto',
        height: 75
    },
    content2: {
        flexDirection: 'row',    
        alignSelf : 'center'
    }
})
