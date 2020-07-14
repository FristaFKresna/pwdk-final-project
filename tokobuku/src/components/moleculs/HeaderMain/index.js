import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

const HeaderMain = ({title, onPress, type, button}) => {
    return ( 
        button ?
        <View style={styles.container}>
            <Button type={type} icon='back-dark' onPress={onPress}/>
            <Text style={styles.text}>{title.length > 30 ? title.slice(0,30) + ' . . .' : title}</Text>
        </View>
        
        : 

        <View style={styles.container}>
            <Text style={styles.text}>{title.length > 30 ? title.slice(0,30) + ' . . .' : title}</Text>
        </View>
    

    )
}

export default HeaderMain

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: colors.white,
        fontFamily: fonts.primary[600]
    }
})
