import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Wishlist } from '../pages';
import TransactionDetailRouter from './TransactionDetailRouter';

const TabTop = createMaterialTopTabNavigator();

const WishlistTransactionRouter = () => {
    return(
        <TabTop.Navigator>
            <TabTop.Screen name='Wishlist' component={Wishlist} />
            <TabTop.Screen name='Transaction' component={TransactionDetailRouter} />
        </TabTop.Navigator>
    )
}

// export default WishlistTransactionRouter