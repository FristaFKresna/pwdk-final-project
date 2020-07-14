import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import { ILNullPhoto, IconAddPhoto } from '../../assets'
import { Button, Header, Link, Gap, HeaderMain } from '../../components'
import { colors, fonts } from '../../utils'
import ImagePicker from 'react-native-image-picker'

const UploadPhoto = (props) => { 
    
    const [image, setImage] = useState(null)
    
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

    const onUploadBtn = () => {
        Alert.alert('photo uploaded')
    }

    return (
        <View style={styles.page}>
            <HeaderMain button={true} type='icon-only' title='Upload Photo' onPress={() => props.navigation.goBack()} style={styles.header} />
            <View style={styles.content}>
                <View style={styles.profile}>
                    <View style={styles.avatarWrapper}>
                        <Image source={image === null ? ILNullPhoto : {uri : image.uri}} style={styles.avatar} />
                        <TouchableOpacity style={styles.addPhoto} onPress={onUploadClick}>
                            <IconAddPhoto/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{props.route.params.name}</Text>
                </View>
                <View>
                    <Button title='Upload and Continue' onPress={onUploadBtn} />
                    <Gap height={30} />
                </View>
            </View>
        </View>
    )
}

export default UploadPhoto

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        paddingHorizontal: 40,
        flex: 1,
        justifyContent:'space-between',
        paddingBottom: 65
    }, 
    profile: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    } ,
    avatar: {
        width: 110,
        height: 110,
        borderColor: colors.border,
        borderRadius: 130/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarWrapper: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 130/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addPhoto: {
        position: 'absolute',
        bottom: 9,
        right: 6
    },
    name: {
        fontSize: 24,
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    profession: {
        fontSize: 18,
        fontFamily: fonts.primary.normal,
        textAlign: 'center',
        color: colors.text.secondary
    }
})
