import React, { Component } from 'react'
import Axios from 'axios'
import LogoSuccess  from './../images/checklist.png'
import LogoError from './../images/close.png'

export default class VerificationSuccess extends Component {

    state = {
        error : null
    }

    componentDidMount(){
        //get token
        const token = window.location.pathname.split('/')[2]
        console.log(token)
    
        //jalanin api update unverified=1 where id=2
        Axios.patch('http://localhost:4000/auth/verify/' + token)
        .then((res)=>{
            if(res.data.error === false){
                this.setState({error : false})
                alert(res.data.message)
            }else{
                this.setState({error : true})
            }
        })
        .catch((err)=>{
            this.setState({error : true})
            console.log(err)
            alert(err.message)
        })
    }
    render() {
        if(this.state.error === null){
            return(
                <div className='text-center'>
                    Loading ...
                </div>
            )
        }
        return (
            <div className='container' style={{height:'100vh'}}>
                <div className='row mt-5 justify-content-center align-items-center h-80'>
                    {
                        this.state.error === false ?
                        <div className='col-md-3'>
                            <h1 className='text-center'>
                                Verification Success
                            </h1>
                            <img src={LogoSuccess} width='100%' alt="icon"/>
                        </div>
                        :
                        <div className='col-md-3'>
                            <h1 className='text-center'>
                                Verification Error
                            </h1>
                            <img src={LogoError} width='100%' alt="icon"/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
