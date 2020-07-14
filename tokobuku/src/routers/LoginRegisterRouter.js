import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { GetStarted, Login, Register, Otp, ForgotPassword, ResetPassword } from '../pages';

const Stack = createStackNavigator()

const LoginRegisterRouter = () => {
    return(
        <Stack.Navigator screenOptions={{header:()=>null}}>
            <Stack.Screen name='GetStarted' component={GetStarted} options={{headerShown: false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
            <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
            <Stack.Screen name='Otp' component={Otp} options={{headerShown: false}} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown: false}} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default LoginRegisterRouter