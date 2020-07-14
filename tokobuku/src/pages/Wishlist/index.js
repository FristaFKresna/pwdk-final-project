import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button, Alert, TouchableOpacity, RefreshControl } from 'react-native'
import { HeaderMain, Loading, NullWishlist } from '../../components';
import { colors, fonts } from './../../utils';
import { Gap } from './../../components/atoms'
import Axios from 'axios';
import { API_URL } from '../../supports/constants/urlApi';
import NumberFormat from 'react-number-format';
import { connect} from 'react-redux'


const Wishlist = (props) => {

    const [data, setData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=>{getDataWishlist()},[])

    const getDataWishlist = () => {
        let id_user = props.user.id  // //id user dummy nanti ambil dari redux atau props params route dari home

        Axios.get(API_URL+'wishlist/'+id_user)
        .then((res)=>{
            if(!res.data.error){
                setData(res.data.data)
                setRefreshing(false)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const addToCart = (id_product, id_user, id) => {
        Axios.get(API_URL+'cart/'+id_user)
        .then((res)=>{
            if(!res.data.error){
                let filtered = res.data.data.filter((val)=>{
                    return val.id_product === id_product
                })
    
                if(filtered.length === 0){
                    Axios.post(API_URL+'cart', {id_user : id_user, id_product : id_product, qty : 1})
                    .then((res)=>{
                        if(!res.data.error){

                            Axios.delete(API_URL+'wishlist/'+id)
                            .then((res)=>{
                                if(!res.data.error){
                                    Alert.alert('Add To Cart Success!')
                                    getDataWishlist()
                                }
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }else{
                    Alert.alert('This Product Is Already On Cart')
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    const deleteDataWishlist = (id) => {
        Axios.delete(API_URL+'wishlist/'+id)
        .then((res)=>{
            if(!res.data.error){
                Alert.alert('Delete Success')
                getDataWishlist()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    const renderWishlist = () => {
        return data.map((val)=>{
            return(
                <View key={val.id}>
                    <Gap height={10} />
                    <View style={styles.page}>
                        <TouchableOpacity onPress={()=>props.navigation.navigate('ProductDetail', {title : val.name, id : val.id_product})}>
                            <Image source={{uri:API_URL+val.url_image}} style={styles.img} />
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <Text style={styles.title}>{val.name.length > 28 ? val.name.slice(0,20) + ' . . .' : val.name}</Text>
                            <Gap height={5} />
                            <Text style={styles.author}>{val.author}</Text>
                            <Gap height={20} />
                            <NumberFormat 
                                value={val.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                                renderText={value=><Text style={styles.price}>{value}</Text>} />
                        </View>
                        <View style={styles.content2}>
                            <View style={{marginVertical:10}}><Button onPress={()=>addToCart(val.id_product, val.id_user, val.id)} title="Add To Cart" /></View>
                            <View style={{marginVertical:10}}><Button onPress={()=>deleteDataWishlist(val.id)} color='red' title="Delete" /></View>
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

    if(data.length === 0){
        return(
           <NullWishlist />
        )
    }

    return (
        <View style={{flex:1}}>
            <HeaderMain title='Wishlist' />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={()=>{
                            setRefreshing(true)
                            getDataWishlist()
                        }}
                        />}
                >
                    {renderWishlist()}
                </ScrollView>  
            </View>
        </View>       
    )
}

const mapStateToProps = (state) => {
    return{
        user : state.user.data
    }
}

export default connect(mapStateToProps)(Wishlist);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding : 10
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
        justifyContent:'center' 
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
