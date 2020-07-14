import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Alert, TextInput } from 'react-native'
import { ILLogo } from '../../assets'
import { Link, Button, Gap } from '../../components'
import { colors } from '../../utils'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { connect } from 'react-redux'

const Otp = (props) => {

    const [code, setCode] = useState(null)

    const verifyBtn = () => {
        let data = {                            /// (PAKE TOKEN KALO KEBURU)
            id : props.user.id,
            email : props.user.email,
            otp : Number(code)
        }
        console.log(data)
        if(code){
            Axios.post(API_URL+'auth/verify', data)
            .then((res)=>{
                if(!res.data.error){
                    Alert.alert(res.data.message)
                    props.navigation.navigate('Home')
                }else{
                    Alert.alert(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })  
        }
    }


    const resendOtp = () => {
        let newOtp = ''
        for(var i = 0; i < 4; i++){
            newOtp += Math.round(Math.random() * 9)
        }

        let data = {
            id : props.user.id,                          /// (PAKE TOKEN KALO KEBURU)
            email : props.user.email,
            otp : Number(newOtp)
        }

        Axios.post(API_URL+'auth/otp', data)
        .then((res)=>{
            if(!res.data.error){
                Alert.alert(res.data.message)
                props.navigation.replace('Otp')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return (
        <View style={styles.page}>
            <View style={{alignSelf:'center'}}>
                <Image source={ILLogo} style={styles.logo} />
            </View>
            <Text style={styles.title}>Enter Your Verification Code</Text>
            <TextInput style={styles.input} maxLength={4} keyboardType='number-pad' onChangeText={text=>setCode(text)} value={code} />
            <Gap height={10} />
            <View style={{alignSelf:'center'}}>
                <Link title='Resend OTP' size={14} onPress={resendOtp}  />
            </View>
            <Gap height={50} />
            <Button title='Verify' onPress={verifyBtn} />
        </View>
    )
}

const mapStateToProps = (state) => {
    return{
        user : state.user.data
    }
}

export default connect(mapStateToProps)(Otp)

const styles = StyleSheet.create({
    page: {
        padding: 40,
        flex: 1,
        backgroundColor: colors.white,
        justifyContent : 'center',
    },
    logo: {
        height: 80,
        width: 80
    },
    title: {
        fontSize: 20,
        fontFamily: 'Nunito-SemiBold',
        color: colors.text.primary,
        marginTop: 40,
        marginBottom: 30,
        textAlign : 'center'
    },
    input: {
        backgroundColor: colors.white,
        width: 100,
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        borderWidth : 1,
        alignSelf : 'center',
        textAlign : 'center'
    }
})
