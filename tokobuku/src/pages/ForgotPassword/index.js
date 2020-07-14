import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Alert, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import { ILLogo } from '../../assets'
import { Link, Button, Gap, Loading } from '../../components'
import { colors } from '../../utils'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'


const ForgotPassword = (props) => {

    const [email, setEmail] = useState(null)

    const sendEmailOtp = () => {
        if(email){
            let newOtp = ''
            for(var i = 0; i < 4; i++){
                newOtp += Math.round(Math.random() * 9)
            }
            
            let data = {                       
                email : email,
                otp : Number(newOtp)
            }
            Axios.post(API_URL+'auth/send-reset-code', data)
            .then((res)=>{
                if(!res.data.error){
                    Alert.alert('Your Code Has Been Sent')
                    props.navigation.navigate('ResetPassword',{id : res.data.data[0].id, email : res.data.data[0].email})   
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            Alert.alert('Please Enter Your Email')
        }

    }


    return (
        <KeyboardAvoidingView style={{flex:1 ,backgroundColor:"white"}}>
            <ScrollView style={colors.white}>
                <View style={styles.page}>
                    <View style={{alignSelf:'center'}}>
                        <Image source={ILLogo} style={styles.logo} />
                    </View>
                    <Text style={styles.title}>Forgot Password?</Text>
                    <TextInput style={styles.input} placeholder='Enter Email' onChangeText={(text)=>setEmail(text)} />
                    <Gap height={50} />
                    <Button title='Send Email' onPress={sendEmailOtp}  />
                    <Gap height={15} />
                    <Link title='Back To Sign In' onPress={()=>props.navigation.navigate('Login')} size={15} align='center'/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


export default ForgotPassword

const styles = StyleSheet.create({
    page: {
        padding: 40,
        paddingTop : 80,
        flex: 1,
        backgroundColor: colors.white,
        alignContent : 'center'
    },
    logo: {
        height: 80,
        width: 80
    },
    title: {
        fontSize: 20,
        fontFamily: 'Nunito-SemiBold',
        color: colors.text.primary,
        marginTop: 50,
        marginBottom: 30,
        textAlign : 'center'
    },
    input: {
        backgroundColor: colors.white,
        width: 330,
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        borderWidth : 0.2,
        alignSelf : 'center',
        textAlign : 'center'
    }
})
