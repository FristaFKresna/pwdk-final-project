import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { colors } from '../../../utils'

const Input = ({label, onChangeText, value, disable, secureTextEntry}) => {

    const [border, setBorder] = useState(colors.border)

    const onFocusForm = () => {
        setBorder(colors.primary)
    }

    const onBlurForm = () => {
        setBorder(colors.border)
    }
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
            style={styles.input(border)} 
            onChangeText={onChangeText} 
            value={value}
            editable={!disable}
            selectTextOnFocus={!disable}
            onFocus={onFocusForm}
            onBlur={onBlurForm}
            secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    input: (border) => ({
        borderWidth: 1,
        borderColor: border,
        borderRadius: 10,
        padding: 12
    }),
    label: {
        fontSize: 16,
        color: colors.text.secondary,
        marginBottom: 6,
        fontFamily: 'Nunito-Regular'
    }
})
