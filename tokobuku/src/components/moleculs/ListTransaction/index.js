import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import NumberFormat from 'react-number-format'
import Moment from 'moment'

const ListTransaction= (props) => {
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'grey', height:50, width:50, borderRadius:25, justifyContent:'center', alignItems:'center', marginTop:20, marginLeft:30}}>
                <Text style={{color:'white', fontSize:30}}>
                    {props.total}
                </Text>
            </View>
            
            <View style={{flex:1, marginLeft:30}}>
                <NumberFormat 
                    value={props.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                    renderText={value=><Text style={styles.title}>{value}</Text>} />
                <Text style={styles.author}>Status : {props.status}</Text>
                <Text style={styles.author}>Tanggal : {Moment(props.date).format('MMM Do YYYY')}</Text>
            </View>
            
        </View>
    )
}

export default ListTransaction

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor: colors.border,
        alignSelf: 'flex-start',
        margin : 10,
        width: 'auto',
        height: 'auto',
        padding : 10
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        marginTop: 10,
        marginBottom: 5,
        color: colors.text.primary
    },
    author: {
        fontSize: 15,
        fontFamily: fonts.primary[600],
        marginBottom: 5,
        color: colors.text.secondary
    }
})
