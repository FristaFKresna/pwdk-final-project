import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BottomNavigator } from '../components';
import { Cart, Home, ProductList, ProductDetail, Wishlist, Transaction, TransactionDetail, Account, About, Help, EditProfile, UploadPhoto } from '../pages';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabTop = createMaterialTopTabNavigator();

// const AccountRouter = () => {
//     return(
//         <Stack.Navigator>
//             <Stack.Screen name='Account' component={Account} options={{headerShown: false}} />
//             {/* <Stack.Screen name='About' component={About} options={{headerShown: false}} /> */}
//             {/* <Stack.Screen name='Help' component={Help} options={{headerShown: false}} />
//             <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown: false}} />
//             <Stack.Screen name='UploadPhoto' component={UploadPhoto} options={{headerShown: false}} /> */}
//         </Stack.Navigator>
//     )
// }

// const TransactionDetailRouter = () => {
//     return(
//         <Stack.Navigator>
//             <Stack.Screen name='Transaction' component={Transaction} options={{headerShown: false}} />
//         </Stack.Navigator>
//     )
// }

const WishlistTransactionRouter = () => {
    return(
        <TabTop.Navigator tabBarPosition='bottom'>
            <TabTop.Screen name='Wishlist' component={Wishlist} />
            <TabTop.Screen name='Transaction' component={Transaction} />
        </TabTop.Navigator>
    )
}

// const ProductDetailRouter = () => {
//     return(
//         <Stack.Navigator>
//             <Stack.Screen name='ProductList' component={ProductList} options={{headerShown: false}} />
//             <Stack.Screen name='ProductDetail' component={ProductDetail} options={{headerShown: false}} />
//         </Stack.Navigator>
//     )
// }

const ProductRouter = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
            <Stack.Screen name='ProductList' component={ProductList} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}


const HomeRouter = () => {
    return(
        <Tab.Navigator tabBar={props => <BottomNavigator {...props}/>}>
            <Tab.Screen name="Home" component={ProductRouter} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Dashboard" component={WishlistTransactionRouter} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    )
}

const MainAppRouter = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeRouter} options={{headerShown:false}} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} options={{headerShown: false}} />
            <Stack.Screen name='Account' component={Account} options={{headerShown: false}} />
            <Stack.Screen name='About' component={About} options={{headerShown: false}} />
            <Stack.Screen name='Help' component={Help} options={{headerShown: false}} />
            <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown: false}} />
            <Stack.Screen name='UploadPhoto' component={UploadPhoto} options={{headerShown: false}} />
            <Stack.Screen name='TransactionDetail' component={TransactionDetail} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}



export default MainAppRouter