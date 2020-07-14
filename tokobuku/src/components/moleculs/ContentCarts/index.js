import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button, Alert, TouchableOpacity, RefreshControl } from 'react-native'
import { ILBook1, ILBook2, ILBook3, IconMinusButton, IconPlusButton } from '../../../assets'
import { Gap } from '../../atoms'
import { colors, fonts } from '../../../utils'
import Axios from 'axios'
import { API_URL } from '../../../supports/constants/urlApi'
import NumberFormat from 'react-number-format';
import NullCarts from '../NullCarts'
import { connect } from 'react-redux'
import Loading from '../Loading'

const ContentCarts = (props) => {
   
    const [data, setData] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=>{getDataCart()},[]) 
    useEffect(()=>{getDataCart()},[data]) 
    
    const getDataCart = () => {
        let user_id = props.user.id  //nanti get data user dari redux

        Axios.get(API_URL+'cart/'+user_id)
        .then((res)=>{
            if(!res.data.error){
                setData(res.data.data)
                var totalPrice = 0
                res.data.data.map((val)=>{
                    totalPrice += (val.price * val.qty)
                })
                setTotalPrice(totalPrice)
                setRefreshing(false)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const onChangeQtyHandler = (minOrPlus, id, qtyNow, index) => {
        let qtyUpdate;
        if(minOrPlus === 'min'){
            if(qtyNow === 1){
                return
            }
            qtyUpdate = Number(qtyNow) - 1
        }else{
            if(qtyNow === data[index].stock){
                return 
            }
            qtyUpdate = Number(qtyNow) + 1
        }

        Axios.patch(API_URL + 'cart/' + id, {qty:qtyUpdate})
        .then((res)=>{
            if(!res.data.error){
                getDataCart()
            }else{
                console.log(res.data)
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    const onDeleteBtn = (id) => {
        Axios.delete(API_URL+'cart/'+id)
        .then((res)=>{
            if(!res.data.error){
                Alert.alert('Delete Cart Success')
                getDataCart()
                totalPriceCount()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const createTwoButtonAlert = () => 
    Alert.alert(
        "Checkout",
        "Are You Sure Want to Checkout",
        [
            {
                text:"Cancel",
                onPress : ()=>console.log('Cancel Pressed'),
                style:"cancel"
            },
            { text : "Yes", onPress: onBayarClick }
        ],
        { cancelable : false }
    );

    const onBayarClick = () => {
        Alert.alert('checkout berhasil')
        let dataTransaction = {
            total_transaction : totalPrice,
            total_item : data.length,
            transaction_status_id : 1,
            users_id : props.user.id      // masi dummy nanti ambil dari redux
        }
        let dataTransactionDetail = data.map((val)=>{
            return{
                product_name : val.name,
                product_price : val.price,
                qty : val.qty
            }
        })

        Axios.post(API_URL + 'transaction', {dataTransaction, dataTransactionDetail})
        .then((res)=>{
            if(!res.data.error){
                Alert.alert(res.data.message)  // alertnya masi ngebug 2 kali muncul
                getDataCart()
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    }


    const renderDataCart = () => {
        return data.map((val, index)=>{
            return(
                <View key={val.id}>
                    <View style={styles.page}>
                        <TouchableOpacity onPress={()=>props.navigation.navigate('ProductDetail', {title : val.name, id : val.id_product})}>
                            <Image source={{uri:API_URL+ val.url_image}} style={styles.img} />
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <Text style={styles.title}>{val.name.length > 28 ? val.name.slice(0,20) + ' . . .' : val.name}</Text>
                            <Gap height={5} />
                            <Text style={styles.author}>{val.author}</Text>
                            <Gap height={20} />
                            <NumberFormat 
                                value={val.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                                renderText={value=> <Text style={styles.price}>{value}</Text>} />
                        </View>
                        <View style={{flex:1, justifyContent:'space-around'}}>
                            <View style={styles.content2}>
                                <IconMinusButton onPress={()=>onChangeQtyHandler('min', val.id, val.qty, index)} />
                                <Gap width={5} />
                                <Text>{val.qty}</Text>
                                <Gap width={5} />
                                <IconPlusButton onPress={()=>onChangeQtyHandler('plus', val.id, val.qty, index)}/>
                            </View>
                            <View>
                                <Button title='delete' color='red' onPress={()=>onDeleteBtn(val.id)} />
                            </View>
                        </View>
                    </View>
                    <Gap height={20} />
                </View>
            )
        })
    }

    if(data === null){
        return(
            <Loading/>
        )
    }

    return (
        <View style={styles.container}>
            {
                data.length === 0 ?
                    <NullCarts navigation={props.navigation}/>
                :
                
                
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={()=>{
                            setRefreshing(true)
                            getDataCart()
                        }}
                        />
                    }>
                    {renderDataCart()}
                </ScrollView>  
            }


            {
                data.length === 0 ?
                <View/>

                :

                <View style={{flexDirection:'row', justifyContent:'space-between', height:60, backgroundColor: '#7D8797', marginLeft:-20, marginRight:-20, marginBottom:-20,}}>
                    <View style={{justifyContent:'center', alignItems:'center',paddingLeft:20}}>
                        <NumberFormat 
                            value={totalPrice} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                            renderText={value=><Text style={styles.price}>TOTAL : {value}</Text>} />
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', paddingRight:20}}>
                        <Button title="Checkout" onPress={createTwoButtonAlert} />
                    </View>
                </View>                 
            }
            

            
            </View>
    )
}

const mapStateToProps = (state) => {
    return{
        user : state.user.data
    }
}

export default connect(mapStateToProps)(ContentCarts)

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.white, 
        flex :1    
    },
    page: {
        padding: 20,
        backgroundColor: colors.border,
        flexDirection: 'row'
    },
    content: {
        marginLeft: 20,
        flex:1,        
    },
    content2: {
        flexDirection: 'row',
        marginLeft: 20,      
    },
    img: {
        height: 150,
        width: 100
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary
    },
    author: {
        fontSize: 14,
        fontFamily: fonts.secondary[400],
        color: colors.text.secondary
    },
    price: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary
    },
    btn: {
        height: 50,
        width: 50
    }
})
