import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Alert } from 'react-native'
import { HeaderMain, ListTransactionDetail, Loading, Link, Gap, Input } from '../../components'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { colors, fonts } from './../../utils'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'

const TransactionDetail = (props) => {

    const [data, setData] = useState(null)
    const [alamat, setAlamat] = useState(null)
    const [nomor, setNomor] = useState(null)
    const [nama, setNama] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(()=>{getTransactionDetail(), getUserDetail()},[])

    const getTransactionDetail = () => {
        const id_transaction = props.route.params.id
        Axios.get(API_URL+'transaction/detail/'+id_transaction)
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getUserDetail = () => {
        const id_user = props.user.id
        Axios.get(API_URL+'user/'+ id_user)
        .then((res)=>{
            setAlamat(res.data.data[0])
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    const onUploadClick = () => {
        ImagePicker.showImagePicker({title : 'Select Your Image'}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri , type : response.type, name : response.fileName};
                console.log(source)
                setImage(source)
              }
        })
    }

    const onPressConfirmPayment = () => {
        console.log('Masuk')
        if(nomor && nama && image){
            const fd = new FormData()
            let data = {name_bank_account : nama, bank_account : nomor}
            data = JSON.stringify(data)

            console.log(data)
            fd.append('pay_image', image)
            fd.append('data', data)

            Axios.post(API_URL + 'uploader/payment/'+ props.route.params.id, fd)
            .then((res)=>{
                console.log(res)
                if(!res.data.error){
                    Alert.alert('Bukti Terkirim')
                    props.navigation.replace('Transaction')
                
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            Alert.alert('All Form Must be Filled')
        }
    }


    if(data === null || alamat === null || props.user === null) return <Loading/>
    return (
        <View style={{flex:1}}>
            <HeaderMain type='icon-only' button={true} onPress={()=>props.navigation.goBack()} title='Transaction Detail'/>
            <ScrollView style={{flex:1}}>
                {
                    data.map((val)=>{
                        return(
                            <View style={{flex:1}} key={val.id}>
                                <ListTransactionDetail
                                    qty = {val.qty}
                                    product_name = {val.product_name}
                                    product_price = {val.product_price}
                                    total = {val.product_price * val.qty}
                                />
                            </View>
                        )
                    })
                }

            <View>
                <NumberFormat 
                    value={props.route.params.total} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                    renderText={value=><Text style={styles.title}>Grand Total : {value} </Text>} />
            </View>

            {
                alamat.address === null ? 
                <View style={styles.container}>
                    <Text style={styles.title}>Lengkapi Dahulu Profile Detail Anda</Text>
                    <View style={{alignItems:'center'}}>
                        <Link title='Go to edit user' onPress={()=>props.navigation.navigate('EditProfile', {id_user : props.user.id})} />
                    </View>
                </View>

                :

                <View style={styles.container}>
                    <Text style={styles.title}>Alamat Pengiriman</Text>
                    <Text style={styles.author}> {alamat.address}, {alamat.kelurahan}, {alamat.kecamatan}, {alamat.kota}, {alamat.provinsi}  </Text>
                </View>
            }

                <View style={styles.container}>
                    <Text style={styles.title}>{props.route.params.status}</Text>
                </View>

            {

                props.route.params.status === 'Waiting for Payment' ?

                    <View style={styles.payment}>
                        <Text style={styles.title}>Payment Confirmation</Text>
                        <Gap height={10} />
                        <Input label='Nomor Rekening' value={nomor} onChangeText={(text)=>setNomor(text)} />
                        <Gap height={10} />
                        <Input label='Nama Rekening' value={nama} onChangeText={(text)=>{setNama(text)}} />
                        <Gap height={30} />
                        <Button onPress={onUploadClick} title={image !== null ? 'Image Selected' : 'Upload Bukti'} color={colors.primary}/>
                    </View>
                :

                props.route.params.notes ?

                <View style={styles.container}>
                    <Text style={styles.title}>Notes</Text>
                    <Text style={styles.author}> {props.route.params.notes}  </Text>
                </View>

                : 

                <View></View>
            }

            </ScrollView>
            {
                props.route.params.status === 'Waiting for Payment' ?
                <View style={styles.footer}>
                    <Button title='Submit' color={colors.primary} onPress={onPressConfirmPayment} />
                </View>
                : 
                <View/>
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return{
        user : state.user.data
    }
}

export default connect(mapStateToProps)(TransactionDetail)

const styles = StyleSheet.create({
    container: {
        borderRadius:10,
        flex : 1, 
        backgroundColor: colors.white,
        margin : 20,
        width: 'auto',
        height: 'auto',
        padding : 5
    },
    title: {
        textAlign:'center',
        fontSize: 20,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary
    },
    author: {
        fontSize: 17,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.secondary,
        textAlign:'center'
    },
    footer:{
        backgroundColor: colors.border,
        width: 'auto',
        padding : 20
    },
    payment: {
        borderRadius:10,
        flex : 1, 
        backgroundColor: colors.white,
        margin : 20,
        width: 'auto',
        height: 'auto',
        padding : 20
    }
})
