import React from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Splash } from '../pages';
import MainAppRouter from './MainAppRouter';
import LoginRegisterRouter from './LoginRegisterRouter';
import { saveUserData } from './../redux/actions/userAction';


class Router extends React.Component{
    state = {
        splash : false
    }

    componentDidMount(){
       this.userCheck()
    }


    userCheck = () => {
        this.setState({splash : true})
        AsyncStorage.getItem('data_user', (err,result) => {
            if(err) console.log(err)
            if(result){
                var data = JSON.parse(result)
                this.props.saveUserData(data)
                // console.log(this.props.user)
                this.setState({splash : false})
            }else{
                this.setState({splash : false})
            }
        })
        this.setState({splash : true})
    }


    render(){
        if(this.state.splash) return <Splash/>  
        return this.props.user ? <MainAppRouter/> : <LoginRegisterRouter/>
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}

export default connect(mapStateToProps,{saveUserData})(Router)


// const Router = (props) => {

//     const [splash, setSplash] = useState(false)

//     useEffect(()=>{userCheck()}, [] )


//     const userCheck = () => {
//         setSplash(true)
//         AsyncStorage.getItem('data_user', (err,result) => {
//             if(err) console.log(err)
//             if(result){
//                 var data = JSON.parse(result)
//                 props.saveUserData(data)
//                 setSplash(false)
//             }else{
//                 setSplash(false)
//             }
//         })
//     }


//     if(splash) return <Splash/>
//     return props.user ? <MainAppRouter/> : <LoginRegisterRouter/>
    
// }

// const mapStateToProps = (state) => {
//     return{
//         user : state.user
//     }
// }

// export default connect(mapStateToProps,{saveUserData})(Router)