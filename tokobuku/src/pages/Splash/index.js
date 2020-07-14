import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ILLogo } from '../../assets'
import { colors } from '../../utils'

const Splash = ({navigation}) => {

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         navigation.replace('GetStarted')
    //     }, 3000)
    // }, [])

    return (
        <View style={styles.page}>
            <Image source={ILLogo} style={styles.img} />
            <View style={{height: 10}} />
            <Text style={styles.text}>Book Store</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    img: {
        width: 90,
        height: 90
    },
    text: {
        fontSize: 20,
        fontFamily: 'Nunito-SemiBold',
        color: colors.black
    
    }
})
