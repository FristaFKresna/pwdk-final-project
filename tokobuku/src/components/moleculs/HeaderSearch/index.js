import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { colors } from '../../../utils'
import { IconFavoriet, IconCart } from '../../../assets'




const HeaderSearch = ({title, width, onChangeText, value, onPressFavorit}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input(width)} placeholder={title} onChangeText={onChangeText} value={value} />
            <View style={{flexDirection:"row",flex:1,justifyContent:'flex-end', alignItems:'center'}}>
                <TouchableOpacity onPress={onPressFavorit}>
                    <IconFavoriet />
                </TouchableOpacity>
            </View>
      </View>
    )
}

export default HeaderSearch

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection:"row"
    },
    input: (width) => ({
        backgroundColor: colors.white,
        width: width,
        borderRadius: 10,
        padding: 10,
        fontSize: 14
    })
})
