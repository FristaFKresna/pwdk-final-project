import React, { useEffect, useState } from 'react'
import { StyleSheet, Alert, View, ScrollView, Text } from 'react-native'
import { colors, fonts } from '../../utils';
import { Profile, HeaderMain, ListMenuProfile, Gap, Loading } from '../../components';
import { connect } from 'react-redux'
import { clearUserData } from './../../redux/actions/userAction'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios';
import { API_URL } from '../../supports/constants/urlApi';
import { ILNullPhoto } from '../../assets';

const Account = (props) => {

    const [userDetail, setUserDetail] = useState(null)
    useEffect(()=>{getUserDetail()},[])

    const getUserDetail = () => {
        Axios.get(API_URL+'user/'+props.user.id)
        .then((res)=>{
            if(!res.data.error){
                setUserDetail(res.data.data[0])
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const logOutPressBtn = () => {
        Alert.alert('Logout', 'Are You Sure Want to Logout?',
            [
                {
                    text : 'Cancel'
                },
                {
                    text : 'Yes',
                    onPress:onLogoutHandler
                }
            ]
        )
    }

    const onLogoutHandler = () => {
        AsyncStorage.removeItem('data_user', (err) => {
            if(err) console.log(err)
            props.clearUserData()
        })
    }

    if(userDetail === null) return <Loading/>
    return (
        <View style={styles.container}>
            <HeaderMain title='Account'/>
            <ScrollView>
                <Gap height={50} />
                <View>
                    <Profile 
                        name={props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}
                        image={userDetail.url_profile_image === null ? ILNullPhoto : {uri: API_URL + userDetail.url_profile_image}}
                    />
                    <Gap height={50} />
                    <ListMenuProfile name='Edit' desc='Edit Profile' type='next' icon='edit' onPress={()=> props.navigation.navigate('EditProfile', {id_user : props.user.id})} />
                    <ListMenuProfile name='About' desc='Tentang Aplikasi' type='next' icon='about'  onPress={()=> props.navigation.navigate('About')} />
                    <ListMenuProfile name='Help' desc='Bantuan Aplikasi' type='next' icon='help'  onPress={()=> props.navigation.navigate('Help')} />
                    <ListMenuProfile name='Logout' desc='Keluar dari Aplikasi' type='next' icon='logout' onPress={logOutPressBtn} />
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

export default connect(mapStateToProps,{clearUserData})(Account);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})
