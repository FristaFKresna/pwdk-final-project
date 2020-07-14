import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { HeaderMain, Gap } from '../../components'
import { ILLogo } from '../../assets'
import { colors, fonts } from '../../utils'

const About = (props) => {
    return (
        <View style={styles.container}>
            <HeaderMain type='icon-only' title='About' button={true} onPress={()=> props.navigation.goBack()} />
            <Gap height={30} />
            <View style={styles.imgWrapper}>
                <Image source={ILLogo} style={styles.img} />
                <Text style={styles.text}>BookStore</Text>
            </View>
            <Gap height={30} />
            <View style={styles.contentText}>
                <Text style={styles.content}>BookStore adalah aplikasi penjualan Buku Online yang di buat untuk kemudahan 
                    pembelian buku secara online. Aplikasi ini dibuat sebagai project akhir pada Purwadhika Startup and Coding School.
                    Dibuat oleh Frista Friciandi Kresna, Giran Munggaran dan Afgan Taufiq Hidayat. Enjoy Shopping !!!</Text>
            </View>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    imgWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },  
    img: {
        height: 150,
        width: 150,
    },
    contentText: {
        paddingHorizontal: 20
    },
    text: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary
    },
    content: {
        maxWidth: 400,
        fontSize: 16,
        fontFamily: fonts.primary[600],
        textAlign: 'justify'
    }
})
