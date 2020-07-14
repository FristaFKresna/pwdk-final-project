import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { colors } from '../../utils';
import { HeaderMain, ListBook, Gap, Loading } from '../../components';
import Axios from 'axios';
import { API_URL } from '../../supports/constants/urlApi';


const ProductList = (props) => {

    const [data,setData] = useState(null)

    useEffect(()=>{getDataBook()}, [])
    
    const getDataBook = () => {
        let category = props.route.params.category
        let publisher = props.route.params.publisher
        
        if(category){
            Axios.get(API_URL + 'products/filter-category/' + category)
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })

        }else if(publisher){
            Axios.get(API_URL + 'products/filter-publisher/' + publisher)
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })

        }else{
            Axios.get(API_URL + 'products')
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const renderData = () => {
        return data.map((val) => {
            return(
                <TouchableOpacity style={styles.margin} key={val.id} onPress={()=>props.navigation.navigate('ProductDetail', {title : val.title, id : val.id})}>
                    <ListBook 
                        image={{uri : API_URL + val.url_image}}
                        title={val.title.length > 15 ? val.title.slice(0,10) + ' . . .' 
                        : val.title
                        }
                        author={val.author}
                        price={val.price}/>
                </TouchableOpacity>
            )
        })
    }


    return (
        <View style={styles.container}>
            <HeaderMain button={true} style={styles.header} type='icon-only' title={props.route.params.header} onPress={() => props.navigation.goBack()} />
            {
                data === null ? 
                <Loading/>
                :

                data.length === 0 ?
                <View>
                    <Text>Buku Tidak Ada (BIKIN PAGE KOSONG)</Text>
                </View>
                :

                <ScrollView>
                    <View style={styles.wrapper}>
                        {renderData()}
                    </View>
                </ScrollView>

            }
        </View>
    )
}

export default ProductList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    wrapper : {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'center'
    },
    margin : {
        marginVertical: 10
    }
})
