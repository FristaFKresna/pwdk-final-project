import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconAkunActive, IconAkunInactive, IconCartActive, IconCartInactive, IconDashboardActive, IconDashboardInactive, IconHomeActive, IconHomeInactive } from '../../../assets'
import { colors, fonts } from '../../../utils'

const TabItem = ({title, active, onPress, onLongPress}) => {
    const Icon = () => {
        if(title === 'Home'){
            return active ? <IconHomeActive/> : <IconHomeInactive />
        }
        if(title === 'Dashboard'){
            return active ? <IconDashboardActive/> : <IconDashboardInactive />
        }
        if(title === 'Cart'){
            return active ? <IconCartActive/> : <IconCartInactive />
        }
        if(title === 'Account'){
            return active ? <IconAkunActive/> : <IconAkunInactive />
        }
        return <IconHomeInactive />
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Icon />
            <Text style={styles.text(active)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: (active) => ({
        color: active ? colors.text.menuActive : colors.text.menuInactive,
        fontSize: 12,
        marginTop: 4,
        fontFamily: fonts.primary[600]
    })
})
