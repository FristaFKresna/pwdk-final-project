import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity, Button } from 'react-native'
import { colors, fonts } from '../../utils';
import { HeaderMain, ProductDetailContent, Loading } from '../../components';
import Axios from 'axios';
import { API_URL } from '../../supports/constants/urlApi';
import NumberFormat from 'react-number-format'
import { Gap } from './../../components/atoms'
import ListBook from './../../components/moleculs/ListBook/index'
import { IconMinusButton, IconPlusButton } from './../../assets'
import { connect} from 'react-redux'

const ProductDetail = (props) => {
    
    const [data, setData] = useState(null)
    const [dataTerkait, setDataTerkait] = useState(null)
    const [qty, setQty] = useState(1)

    useEffect(()=>{getData()},[])

    const onPlusQtyHandler = () => {
        qty < data[0].stock ? setQty(qty + 1) : data[0].stock
    }

    const onMinQtyHandler = () => {
        qty > 1 ?  setQty(qty - 1) : qty
    }

    const getData = () => {
        let id = props.route.params.id 
        Axios.get(API_URL + 'products/' + id)
        .then((res)=>{
            setData(res.data.data)
            var category = res.data.data[0].category
            if(res.data.data[0].category.includes('&')){
                category = res.data.data[0].category.replace('&', '%26')
            }else{
                category = res.data.data[0].category
            }
            Axios.get(API_URL + 'category/categoryfiltered?category=' + category)
            .then((res)=>{
                Axios.get(API_URL + 'products/filter-category/' + res.data.data[0].id  )
                .then((res)=>{
                    setDataTerkait(res.data.data)
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const renderDataTerkait = () => {
        let filtered = dataTerkait.filter((val)=>{
            return data[0].title !== val.title
        })

        return filtered.map((val)=>{
            return(

                <TouchableOpacity key={val.id} onPress={()=>props.navigation.push('ProductDetail', {title : val.title, id : val.id})}>
                     <View style={styles.rated} key={val.id}>
                        <Gap width={20} />
                            <ListBook
                                image={{uri : API_URL + val.url_image}}
                                title={val.title.length > 18 ? val.title.slice(0,10) + ' . . .' 
                                : val.title
                                }
                                author={val.author}
                                price={val.price}
                            />
                        <Gap width={10} />
                    </View>
                </TouchableOpacity>
            )
        })
    }

    const addToCartBtn = () => {
        let addToCart = {
            id_user : props.user.id,      //id user dummy nanti ambil dari redux
            id_product : data[0].id,
            qty : qty
        }

        let getSpecificCart = {
            id_user : props.user.id, //id user dummy nanti ambil dari redux
            id_product : data[0].id
        }

        Axios.post(API_URL+'cart/detail', getSpecificCart)
        .then((res)=>{
            if(res.data.data.length > 0){
                let qty_lama = res.data.data[0].qty
                let qty_baru = qty_lama + qty
                let stock = data[0].stock

                if(qty_baru > stock){
                    return Alert.alert('Stock tidak cukup')
                }

                Axios.patch(API_URL+'cart/'+res.data.data[0].id, {qty : qty_baru})
                .then((res)=>{
                    if(!res.data.error){
                        Alert.alert('Update Qty Cart Success!')
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })

            }else{

                Axios.post(API_URL+'cart', addToCart)
                .then((res)=>{
                    if(!res.data.error){
                        Alert.alert('Add To Cart Success!')
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
    }


    const addToWishlistBtn = () => {
        let id_user = props.user.id  //id user dummy nanti ambil dari redux
        let id_product = data[0].id
        
        Axios.get(API_URL+'wishlist/'+id_user)
        .then((res)=>{
            let filtered = res.data.data.filter((val)=>{
                return val.id_product === data[0].id
            })

            if(filtered.length === 0){
                Axios.post(API_URL+'wishlist', {id_user:id_user, id_product:id_product})
                .then((res)=>{
                    if(!res.data.error){
                        Alert.alert('Add To Wishlist Success!')
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }else{
                Alert.alert('This Product Is Already On Wishlist')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
      



    return (
        <View style={styles.container}>
            <HeaderMain button={true} style={styles.header} type='icon-only' title={props.route.params.title} onPress={() => props.navigation.goBack()} />
            {
            data === null || dataTerkait === null ?
            <Loading/>
            :
            <View style={{flex:1}}>
                <ScrollView>
                    <ProductDetailContent
                        image = {{uri:API_URL + data[0].url_image}}
                        title = {data[0].title}
                        author = {data[0].author}
                        publisher = {data[0].publisher}
                        halaman = {data[0].halaman}
                        tahun = {data[0].tahun_terbit}
                        bahasa = {data[0].bahasa}
                        stock = {data[0].stock}
                        deskripsi = {data[0].description}
                        category = {data[0].category}
                    />

                    <View style={styles.info}>
                        <Text style={styles.title}>Produk Terkait</Text>
                        <View style={styles.wrapperScroll}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {renderDataTerkait()}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row', paddingHorizontal:20, justifyContent:'space-between'}}>
                        <NumberFormat 
                        value={data[0].price * qty} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                        renderText={value=><Text style={styles.title}>{value}</Text>} />
                        
                        <View style={styles.content2}>
                            <TouchableOpacity onPress={()=>onMinQtyHandler()}>
                                <IconMinusButton />
                            </TouchableOpacity>
                                <Gap width={5} />
                                <Text>{qty}</Text>
                                <Gap width={5} />
                            <TouchableOpacity onPress={()=>onPlusQtyHandler()}>
                                <IconPlusButton />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Button title='Add To Cart' color={colors.primary} onPress={()=>{addToCartBtn()}}/>
                        </View>
                        <View style={{flex:1}}>
                            <Button title='Add To Wishlist' color={colors.secondary} onPress={()=>{addToWishlistBtn()}}/>
                        </View>
                    </View>
                </View>
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

export default connect(mapStateToProps)(ProductDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary
    },
    img: {
        alignSelf : 'center',
        width: 200,
        height: 250,
        resizeMode: 'stretch'
    },
    info: {
        marginVertical : 5,
        marginHorizontal : 20
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary
    },
    deskripsi: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary,
        borderBottomWidth:0.5,
        borderBottomColor: colors.text.secondary
    },
    author: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.secondary
    },
    title_detail: {
        fontSize: 13,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.secondary
    },
    text: {
        fontSize: 15,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.primary
    },
    price: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        marginBottom: 10,
        color: colors.text.primary
    },
    detail:{
        backgroundColor: colors.border,
        width: 'auto',
        height: 80,
        paddingVertical: 15,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    wrapperScroll: {
        marginHorizontal: -20,
    },
    rated: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    footer:{
        backgroundColor: colors.border,
        width: 'auto',
        height: 75
    },
    content2: {
        flexDirection: 'row',    
        alignSelf : 'center'
    }
})