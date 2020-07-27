import React, { useState } from 'react'
import { StyleSheet, View, Alert, Text, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Button, Gap, Header, Input } from '../../components'
import { colors } from '../../utils'
import Validator from 'validator'
import { API_URL } from '../../supports/constants/urlApi'
import Axios from 'axios'

const Register = (props) => {

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirm, setConfirm] = useState(null)

    const onRegisterPressBtn = () => {
        let otp = ''
        for(var i = 0; i < 4; i++){
            otp += Math.round(Math.random() * 9)
        }

        if(username && email && password && confirm){
            if(!Validator.isEmail(email)){
                return Alert.alert('Email Format Incorrect')
            }
            
            if(password !== confirm){
                return Alert.alert("Password didn't match")
            }

            const data = {
                username : username,
                email : email,
                password : password,
                otp : otp
            }

            Axios.post(API_URL + 'auth/register', data)
            .then((res)=>{
                if(!res.data.error){
                    Alert.alert(res.data.message)
                    props.navigation.navigate('Otp', {email : email, password : password})
                }else{
                    Alert.alert(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            Alert.alert('Form Must be Filled')
        }

    }



    return (
        <KeyboardAvoidingView style={{flex:1,backgroundColor:'white'}}>
            <ScrollView>
                <View style={styles.page}>
                    <Header onPress={()=> props.navigation.goBack()} title='Daftar Akun'/>
                    <View style={styles.content}>
                        <Input label='Username' onChangeText={(value) => setUsername(value)} value={username} />
                        <Gap height={24} />
                        <Input label='Email' onChangeText={(value) => setEmail(value)} value={email} />
                        <Gap height={24} />
                        <Input label='Password' secureTextEntry={true} onChangeText={(value) => setPassword(value)} value={password} />
                        <Gap height={24} />
                        <Input label='Confirm Password' secureTextEntry={true} onChangeText={(value) => setConfirm(value)} value={confirm} />
                        <Gap height={40} />
                        <Button title='Continue' onPress={onRegisterPressBtn}/>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    
    )
}

export default Register

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    },
    content: {
        padding: 40, 
        paddingTop: 0
    }
})
