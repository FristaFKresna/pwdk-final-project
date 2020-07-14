import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { HeaderMain, Gap } from '../../components'
import { ILLogo } from '../../assets'
import { colors, fonts } from '../../utils'

const Help = (props) => {
    return (
        <View style={styles.container}>
            <HeaderMain type='icon-only' title='Help' button={true} onPress={()=> props.navigation.goBack()} />
            <Gap height={30} />
            <View style={styles.imgWrapper}>
                <Image source={ILLogo} style={styles.img} />
                <Text style={styles.text}>BookStore</Text>
            </View>
            <Gap height={30} />
            <View style={styles.contentText}>
                <Text style={styles.content}>
                Apabila menemukan masalah atau kesulitan tentang aplikasi ini, bisa menghubungi :
                </Text>
                <Gap height={15} />
                <Text style={styles.content}>1. Frista F.K       fristaf.kresna@gmail.com</Text>
                <Gap height={10} />
                <Text style={styles.content}>2. Giran M         klikace123@gmail.com</Text>
                <Gap height={10} />
                <Text style={styles.content}>3. Afgan T.H     ganafgan@gmail.com</Text>
            </View>
        </View>
    )
}

export default Help

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
