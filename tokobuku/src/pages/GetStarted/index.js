import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ILBackground } from '../../assets';
import { Button, Gap } from '../../components';
import { colors } from '../../utils';


const GetStarted = ({navigation}) => {
    return (
        <View style={styles.page}>
            <View>
                <Image source={ILBackground} style={styles.img} />
                <Text style={styles.title}>Find your favorite book in the Books Store</Text>
            </View>
            <View>
                <Button title='Get started' onPress={() => navigation.navigate('Register')}/>
                <Gap height={16} />
                <Button title='Sign In' type='secondary' onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    page: {
        padding: 40,
        justifyContent: 'space-between',
        backgroundColor: colors.white ,
        flex: 1
    },
    title: {
        fontSize: 28,
        color: colors.black,
        marginTop: 50,
        maxWidth: 300,
        fontFamily: 'Nunito-SemiBold'
    },
    logo: {
        height: 100,
        width: 100
    },
    img: {
        height: 250,
        width: '100%'
    }
})
