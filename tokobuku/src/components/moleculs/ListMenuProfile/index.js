import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconAbout, IconAkunActive, IconHelp, IconLogout, IconNext } from '../../../assets'
import { colors, fonts } from '../../../utils'

const ListMenuProfile = ({onPress, pict, name, desc, icon, type}) => {
    const Icon = () => {
        if(icon === 'edit'){
            return <IconAkunActive />
        }
        if(icon === 'about'){
            return <IconAbout />
        }
        if(icon === 'help'){
            return <IconHelp />
        }
        if(icon === 'logout'){
            return <IconLogout />
        }
        return <IconAkunActive />
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon ? <Icon /> : <Image source={pict} style={styles.avatar}/> }
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.desc}>{desc}</Text>
            </View>
            {
                type === 'next' && <IconNext />
            }
        </TouchableOpacity>
    )
}

export default ListMenuProfile

const styles = StyleSheet.create({
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 46/2,
        marginRight: 12
    },
    content: {
        flex:1,
        marginLeft: 16
    },
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems:'center',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        fontFamily: fonts.primary.normal,
        color: colors.text.primary,
       
    },
    desc: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.secondary
    }
})
