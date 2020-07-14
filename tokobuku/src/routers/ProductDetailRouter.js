import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { ProductList, ProductDetail } from '../pages';

const Stack = createStackNavigator()

const ProductDetailRouter = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='ProductList' component={ProductList} options={{headerShown: false}} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

// export default ProductDetailRouter