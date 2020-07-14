import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Alert, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import { ILLogo } from '../../assets'
import { Link, Button, Gap } from '../../components'
import { colors } from '../../utils'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { connect } from 'react-redux'
import { saveUserData } from './../../redux/actions/userAction'


const ResetPassword = (props) => {

    const [newPassword, setNewPassword] = useState(null)
    const [confirm, setConfirm] = useState(null)
    const [code, setCode] = useState(null)

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('data_user', jsonValue)
          console.log('success async storage')
        } catch (e) {
          console.log(e)
        }
    }

    const resetPasswordBtn = () => {
        let data = {
            password : newPassword,
            id : props.route.params.id,
            email : props.route.params.email
        }
        
        let verify = {
            id : props.route.params.id,
            email : props.route.params.email,
            otp : Number(code)
        }

        if(newPassword && confirm && code){
            if(newPassword === confirm){
                if(code){
                    Axios.post(API_URL+'auth/verify', verify)
                    .then((res)=>{
                    if(!res.data.error){
                        Axios.post(API_URL+'auth/reset-password', data)
                        .then((res)=>{
                            if(!res.data.error){
                                Axios.post(API_URL+'auth/login', {email : data.email, password : newPassword})
                                .then((res)=>{
                                    if(res.data !== undefined || res.data !== null){
                                        storeData(res.data)
                                        props.saveUserData(res.data)
                                        props.navigation.navigate('Home')
                                    }
                                })
                                .catch((err)=>{
                                    console.log(err)
                                    setLoading(false)
                                })
                            }
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    }else{
                        Alert.alert(res.data.message)
                    }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })  
                }

            }else{
                Alert.alert('New Password & Confirm Password not Match')
            }
        }else{
            Alert.alert('All Form Must Be Filled')
        }
    }



    return (
        <KeyboardAvoidingView style={{flex:1 ,backgroundColor:"white"}}>
            <ScrollView style={colors.white}>
                <View style={styles.page}>
                    <View style={{alignSelf:'center'}}>
                        <Image source={ILLogo} style={styles.logo} />
                    </View>
                    <Text style={styles.title}>Reset Your Password</Text>
                    <TextInput style={styles.input} placeholder='Enter New Password' secureTextEntry={true} onChangeText={(text)=>setNewPassword(text)} value={newPassword} />
                    <Gap height={10} />
                    <TextInput style={styles.input} placeholder='Confirm New Password' secureTextEntry={true} onChangeText={(text)=>setConfirm(text)} value={confirm} />
                    <Gap height={20} />
                    <Text style={styles.code}>Enter Your Verification Code Here</Text>
                    <TextInput style={styles.otp} placeholder='Code' maxLength={4} keyboardType='number-pad' onChangeText={(text)=>setCode(text)} value={code} />
                    <Gap height={50} />
                    <Button title='Submit' onPress={resetPasswordBtn} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => {
    return{
        user : state.user.data
    }
}

export default connect(mapStateToProps,{saveUserData})(ResetPassword)

const styles = StyleSheet.create({
    page: {
        padding: 40,
        paddingTop : 50,
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
        borderWidth : 0.5,
        alignSelf : 'center',
        textAlign : 'center'
    },
    otp: {
        backgroundColor: colors.white,
        width: 100,
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        borderWidth : 1,
        alignSelf : 'center',
        textAlign : 'center'
    },
    code: {
        fontFamily: 'Nunito-SemiBold',
        color: colors.text.primary,
        textAlign : 'center',
        marginBottom : 5
    }
})
