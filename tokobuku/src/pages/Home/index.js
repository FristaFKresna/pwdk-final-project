import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderSearch, BookCategory, RatedBook, Gap, Penerbit, NullCarts, ListBook, Loading } from '../../components';
import { fonts, colors } from '../../utils';
import Axios from 'axios';
import { API_URL } from './../../supports/constants/urlApi';
import {connect} from 'react-redux'

const Home = (props) => {

    const [category, setCategory] = useState(null)
    const [publishers, setPublishers] = useState(null)
    const [dataBook, setDataBook] = useState(null)
    const [search, setSearch] = useState('')
    
    useEffect(()=>{getCategory(),getDataBook(),getPublishers()},[])

    const getCategory = () => {
        Axios.get(API_URL + 'category')
        .then((res)=>{
            setCategory(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getPublishers = () => {
        Axios.get(API_URL + 'publishers')
        .then((res)=>{
            setPublishers(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getDataBook = () => {
        Axios.get(API_URL + 'products')
        .then((res)=>{
            setDataBook(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const renderRatedBook = () => {
        //Buat Nyari Buku Pilihan Cari 10 Produk yang paling laku
        let filtered = dataBook.slice(0,10)

        return filtered.map((val)=>{
            return(
                <TouchableOpacity key={val.id} onPress={()=>props.navigation.navigate('ProductDetail', {title : val.title, id : val.id})}>
                    <RatedBook 
                        image={{uri : API_URL + val.url_image}}
                        title={val.title.length > 18 ? val.title.slice(0,10) + ' . . .' 
                        : val.title
                        }
                        author={val.author}
                        price={val.price}
                        />
                </TouchableOpacity>
            )
        })
    }

    const renderNewBook = () => {
        //Buat Nyari Buku Terbitan Baru
        let newBook = dataBook.filter((val)=>{
            return val.tahun_terbit === 2020
        })

        return newBook.map((val)=>{
            return(
                <TouchableOpacity key={val.id} onPress={()=>props.navigation.navigate('ProductDetail', {title : val.title, id : val.id})}>
                    <RatedBook 
                        image={{uri : API_URL + val.url_image}}
                        title={val.title.length > 18 ? val.title.slice(0,10) + ' . . .' 
                        : val.title
                        }
                        author={val.author}
                        price={val.price}
                        />
                </TouchableOpacity>
            )
        })
    }

    const renderSearchBook = () => {
        
        let searchBook = dataBook.filter((val)=>{
            return val.title.toLowerCase().includes(search.toLowerCase())
        })

        return searchBook.map((val)=>{
            return(
                <TouchableOpacity style={{marginVertical:10}} key={val.id} onPress={()=>props.navigation.navigate('ProductDetail', {title : val.title, id : val.id})}>
                    <ListBook 
                        image={{uri : API_URL + val.url_image}}
                        title={val.title.length > 18 ? val.title.slice(0,10) + ' . . .' 
                        : val.title
                        }
                        author={val.author}
                        price={val.price}
                        />
                </TouchableOpacity>
            )
        })
    }

    if(category === null || publishers === null || dataBook === null){
        return(
            <View style={styles.page}>
                <Loading />
            </View>
        )
    }

    return (
        <View style={styles.page}>
            <HeaderSearch 
            title='Cari Buku Favorite' 
            width={330} 
            onChangeText={(text)=>setSearch(text)} 
            value={search} 
            onPressFavorit={()=>props.navigation.navigate('Dashboard')}
            />
                
            {

            search ?

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.search}>
                    {renderSearchBook()}  
                    </View>
                </ScrollView>

            :

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.welcome}>Hello {props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}, Temukan Buku Favoritmu di BookStore</Text>
                    <View style={styles.wrapperScroll}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.category}>
                                <Gap width={20} />
                                    <TouchableOpacity onPress={()=>props.navigation.navigate('ProductList', {header : 'Semua Buku'})}>
                                        <BookCategory category='Semua Buku' />
                                    </TouchableOpacity>
                                {
                                    category.map((val)=>{
                                        return(
                                            <TouchableOpacity key={val.id} onPress={()=>props.navigation.navigate('ProductList', {header: val.category, category : val.id})}>
                                                <BookCategory
                                                    label='Saya mencari'
                                                    category={'Buku ' + val.category} />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                                <Gap width={10} />
                            </View>
                        </ScrollView>
                    </View>

                    <Text style={styles.title}>Buku Pilihan</Text>
                    <View style={styles.wrapperScroll}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.rated}>
                                <Gap width={20} />
                                    {renderRatedBook()}
                                <Gap width={10} />
                            </View>
                        </ScrollView>
                    </View>

                    <Text style={styles.title}>Buku Baru</Text>
                    <View style={styles.wrapperScroll}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.rated}>
                                <Gap width={20} />
                                    {renderNewBook()}
                                <Gap width={10} />
                            </View>
                        </ScrollView>
                    </View>

                    <Text style={styles.title}>Penerbit</Text>
                        <View style={styles.wrapperScroll}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.rated}>
                                    <Gap width={20} />
                                            {
                                            publishers.map((val)=>{
                                                return(
                                                    <TouchableOpacity key={val.id} onPress={()=>props.navigation.navigate('ProductList', {header: val.name, publisher : val.id})}>
                                                        <Penerbit
                                                            image={{uri:API_URL + val.url_publisher_logo}}
                                                            name={val.name}
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            })
                                            }
                                    <Gap width={10} />
                                </View>
                            </ScrollView>
                        </View>
                </ScrollView>
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


export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        paddingHorizontal: 20,
        flex: 1,

    },
    welcome: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        maxWidth: 250,
        marginTop: 20,
        marginBottom: 20
    },
    category: {
        flexDirection: 'row',
        marginBottom: 20
    },
    wrapperScroll: {
        marginHorizontal: -20,
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        // marginTop: 20,
        // marginBottom: 20
    },
    rated: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    search : {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'center',
        flex: 1,
        margin:10
    },
    ratedWrapper: {

    },
})
