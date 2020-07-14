import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import { ILLogo } from '../../assets'
import { Input, Link, Button, Gap } from '../../components'
import { colors } from '../../utils'
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { connect } from 'react-redux'
import { saveUserData } from './../../redux/actions/userAction'


const Login = (props) => {
    
    const [email, setEmail]= useState(null)
    const [password, setPassword]= useState(null)
    const [loading, setLoading]= useState(false)

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('data_user', jsonValue)
          console.log('success async storage')
        } catch (e) {
          console.log(e)
        }
    }


    const onLoginBtn = () => {
        setLoading(true)
        if(email && password){
            Axios.post(API_URL+'auth/login', {email : email, password : password})
            .then((res)=>{
                // console.log(res)
                if(res.data !== undefined || res.data !== null){
                    storeData(res.data)
                    props.saveUserData(res.data)
                }
            })
            .catch((err)=>{
                console.log(err)
                setLoading(false)
            })
        }else{
            Alert.alert('Form Must be Filled')
            setLoading(false)
        }
    }


    return (
        <KeyboardAvoidingView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
                <View style={styles.page}>
                    <View>
                        <Image source={ILLogo} style={styles.logo} />
                    </View>
                    <Text style={styles.title}>Login Book Store</Text>
                    <Input label='Email' onChangeText={(text)=>setEmail(text)} value={email} />
                    <Gap height={25} />
                    <Input label='Password' secureTextEntry={true} onChangeText={(text)=>setPassword(text)} value={password} />
                    <Gap height={10} />
                    <Link title='Forget Password' size={12} onPress={()=>props.navigation.navigate('ForgotPassword')} />
                    <Gap height={50} />
                    <Button title='Sign In' onPress={onLoginBtn} />
                    <Gap height={30} />
                    <Link title='Create New Account' onPress={()=>props.navigation.navigate('Register')} size={16} align='center'/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default connect(null,{saveUserData})(Login)

const styles = StyleSheet.create({
    page: {
        flex:1,
        padding: 40,
        backgroundColor: colors.white,

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
        marginBottom: 40
    }
})
