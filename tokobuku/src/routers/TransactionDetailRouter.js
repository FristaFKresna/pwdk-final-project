import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Transaction, TransactionDetail } from "../pages"

const Stack = createStackNavigator();

const TransactionDetailRouter = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Transaction' component={Transaction} options={{headerShown: false}} />
            <Stack.Screen name='TransactionDetail' component={TransactionDetail} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

// export default TransactionDetailRouter