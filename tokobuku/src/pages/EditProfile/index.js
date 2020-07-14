import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native'
import { HeaderMain, Input, Gap, Button, Loading, Profile } from '../../components'
import { colors, fonts } from '../../utils'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select'
import { ILNullPhoto, IconAddPhoto } from '../../assets'

const EditProfile = (props) => {

    useEffect(()=>{
        getDataUser()
    },[])

    const [image, setImage] = useState(null)
    const [profile, setProfile] = useState(null)
    const [fullname, setFullname] = useState(null)
    const [phone_number, setPhone_number] = useState(null)
    const [address, setAddress] = useState(null)
    const [kelurahan, setKelurahan] = useState(null)
    const [kecamatan, setKecamatan] = useState(null)
    const [kota, setKota] = useState(null)
    const [provinsi, setProvinsi] = useState(null)
    const [select, setSelect] = useState(['bandung', 'jakarta', 'surabaya', 'medan', 'papua'])

   
    const getDataUser = () => {
        const id = props.route.params.id_user
        Axios.get(API_URL + 'user/' + id)
        .then((res)=>{
            // console.log(res)
            setProfile(res.data.data)
            setFullname(res.data.data[0].fullname)
            setPhone_number(res.data.data[0].phone_number)
            setAddress(res.data.data[0].address)
            setKelurahan(res.data.data[0].kelurahan)
            setKecamatan(res.data.data[0].kecamatan)
            setKota(res.data.data[0].kota)
            setProvinsi(res.data.data[0].provinsi)
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

    const saveUserDetail = () => {
        let data = {
            fullname : fullname,
            phone_number : phone_number,
            address : address,
            kelurahan : kelurahan,
            kecamatan : kecamatan,
            kota : kota,
            provinsi : provinsi,
            users_id : props.route.params.id_user
        }
        if(fullname && phone_number && address && kelurahan && kecamatan && kota && provinsi){
            Axios.post(API_URL+'user', data)
            .then((res)=>{
                if(!res.data.error){
                    Alert.alert(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            Alert.alert('All Form Must Filled')
        }
    }

    if(profile === null){
        return (
            <Loading/>
        )
    }
    return (
        <View style={styles.container}>
                <HeaderMain type='icon-only' title='Edit Profile' button={true} onPress={()=> props.navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.profile}>
                        <View style={styles.avatarWrapper}>
                            <Image source={image === null ? ILNullPhoto : {uri : image.uri}} style={styles.avatar} />
                            <TouchableOpacity style={styles.addPhoto} onPress={onUploadClick}>
                                <IconAddPhoto/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.contentText}>
                        <Text style={styles.text}>Profile {props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}</Text>
                    </View>
                    <Gap height={20} />
                    <Input label='FullName' value={fullname} onChangeText={(text)=>setFullname(text)} />
                    <Gap height={10} />
                    <Input label='Email' value={profile[0].email} disable/>
                    <Gap height={10} />
                    <Input label='Phone Number' value={phone_number} onChangeText={(text)=>setPhone_number(text)} />
                    <Gap height={10} />
                    <Input label='Address' value={address} onChangeText={(text)=>setAddress(text)} />
                    <Gap height={10} />
                    <Input label='Kelurahan' value={kelurahan} onChangeText={(text)=>setKelurahan(text)} />
                    <Gap height={10} />
                    <Input label='Kecamatan' value={kecamatan} onChangeText={(text)=>setKecamatan(text)} />
                    <Gap height={10} />
                    <Input label='Kota' value={kota} onChangeText={(text)=>setKota(text)}/>
                    <Gap height={10} />
                    <Input label='Provinsi' value={provinsi} onChangeText={(text)=>setProvinsi(text)} />  
                    <Gap height={30} />
                    {/* <View style={styles.border}> */}
                        {/* <RNPickerSelect
                            style={styles.border}
                            onValueChange={(value) => console.log(value)}
                            placeholder = {{label : 'pilih kota', value : ''}}
                            items={
                                select.map((val)=>{
                                    return {label : val, value: val}
                                })
                            //     [
                            //     {label : 'a', value : 'a'},
                            //     {label : 'b', value : 'b'},
                            //     {label : 'c', value : 'c'},
                            //     {label : 'd', value : 'd'},
                            //     {label : 'e', value : 'e'},
                            //     {label : 'f', value : 'f'},
                            //     {label : 'g', value : 'g'},
                            //     {label : 'h', value : 'h'}
                            // ]
                        }
                        /> */}
                    {/* </View> */}
                    <Gap height={30} />
                    <Button title='Save' onPress={saveUserDetail} />        
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    return{
        user : state.user.data
    }
}

export default connect(mapStateToProps)(EditProfile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        padding: 40
    },
    text: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
    },
    contentText: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    border : {
        borderWidth: 1,
        borderRadius: 10,
        borderColor:'#E9E9E9',
        paddingLeft: 5
    },
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
    profile: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
})
