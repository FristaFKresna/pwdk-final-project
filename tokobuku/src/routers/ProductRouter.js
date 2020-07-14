import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Home } from '../pages';
import ProductDetailRouter from './ProductDetailRouter';

const Stack = createStackNavigator()


const ProductRouter = () => {
    return(
    <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
            <Stack.Screen name='ProductList' component={ProductDetailRouter} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

// export default ProductRouter