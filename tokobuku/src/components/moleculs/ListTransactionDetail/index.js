import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import NumberFormat from 'react-number-format'

const ListTransactionDetail= (props) => {
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'grey', height:50, width:50, borderRadius:25, justifyContent:'center', alignItems:'center', marginTop:10, marginLeft:10}}>
                <Text style={{color:'white', fontSize:30}}>
                    {props.qty}
                </Text>
            </View>
            
            <View style={{flex:1, marginLeft:15}}>
                <Text style={styles.title}>{props.product_name}</Text>
                <NumberFormat 
                    value={props.product_price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                    renderText={value=><Text style={styles.author}>{value}</Text>} />
            </View>
            <View style={{marginTop:15}}>
            <NumberFormat 
                    value={props.total} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                    renderText={value=><Text style={styles.author}>{value}</Text>} />
                
            </View>
          
            
        </View>
    )
}

export default ListTransactionDetail

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor: colors.border,
        alignSelf: 'flex-start',
        margin : 5,
        width: 'auto',
        height: 'auto',
        padding : 10
    },
    title: {
        fontSize: 17,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary
    },
    author: {
        fontSize: 14,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.secondary
    }
})
