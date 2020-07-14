import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { Account, About, Help, EditProfile, UploadPhoto } from '../pages'

const Stack = createStackNavigator()

const AccountRouter = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Account' component={Account} options={{headerShown: false}} />
            <Stack.Screen name='About' component={About} options={{headerShown: false}} />
            <Stack.Screen name='Help' component={Help} options={{headerShown: false}} />
            <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown: false}} />
            <Stack.Screen name='UploadPhoto' component={UploadPhoto} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

// export default AccountRouter