import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import Axios from 'axios'
import { API_URL } from './../../supports/constants/urlApi'
import { connect } from 'react-redux'
import { StatusTransaction, ListTransaction, Loading, HeaderMain } from '../../components/moleculs'
import { colors, fonts } from './../../utils';

const Transaction = (props) => {

    const [transactionStatus, setTransactionStatus] = useState(null)
    const [data, setData] = useState(null)
    const [status, setStatus] = useState('All')
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=>{getStatusTransaction()},[])
    useEffect(()=>{filteredTransaction(status)}, [status])

    const getStatusTransaction = () => {
        Axios.get(API_URL+'status')
        .then((res)=>{
            setTransactionStatus(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    const filteredTransaction = (status) => {
        Axios.get(API_URL+'transaction/'+props.user.id)
        .then((res)=>{
            let filtered = res.data.data.filter((val)=>{
                if(status === 'All'){
                    return val.users_id === props.user.id
                }else{
                    return val.status === status
                }
            })
            setData(filtered)
            setRefreshing(false)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }



    if(transactionStatus === null || data === null){
        return <Loading/>
    }

    return (
        <View style={styles.container}>
            <HeaderMain title='Transaction'/>
            <View style={styles.status}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>setStatus('All')}>
                                <StatusTransaction
                                    label='All'
                                />
                            </TouchableOpacity>
                        {
                            transactionStatus.map((val)=>{
                                return(
                                <TouchableOpacity key={val.id} onPress={()=>setStatus(val.status)}>
                                    <StatusTransaction
                                        label={val.status}
                                    />
                                </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>

            <View style={styles.list}>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={()=>{
                        setRefreshing(true)
                        filteredTransaction(status)
                    }}/>}
                >
                        
                    {
                    data.map((val)=>{
                        return(
                        <TouchableOpacity key={val.id} onPress={()=>props.navigation.navigate('TransactionDetail', {id : val.id, total : val.total_transaction, status : val.status, notes : val.notes})}>
                            <ListTransaction
                                total={val.total_item}
                                price={val.total_transaction}
                                status={val.status}
                                date={val.date}
                            />
                        </TouchableOpacity>
                        )
                    })
                    
                    }
                    
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

export default connect(mapStateToProps)(Transaction)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    status : {
        marginVertical:20,
        paddingVertical:10
    },
    list : {
        flex:1
    }
})
