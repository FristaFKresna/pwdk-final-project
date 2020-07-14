import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

export default class Register extends Component {

    state = {
        loading : false
    }

    onRegisterBtn = () => {
        this.setState({loading:true})
        const email = this.refs.email.value
        const password = this.refs.password.value
        const confirm = this.refs.confirm.value

        if(email && password && confirm){
            if(password === confirm){
                Axios.post('http://localhost:4000/auth/register', {email:email, password:password})
                .then((res)=>{
                   console.log(res)
                   if(res.data.error === false){
                        alert(res.data.message)
                   }else if (res.data.error === true){
                        alert(res.data.message)
                   }
            
                })
                .catch((err)=>{
                    console.log(err)
                    
                })
        }else{
            alert(`password dan confirm harus sama`)
        }
    }else{
        alert(`data harus diisi semua`)
    }
    this.refs.email.value='' 
    this.refs.password.value=''
    this.refs.confirm.value=''
    this.setState({loading:false})
}

    render() {
        return (
            <div className='container'>
                <div className='row mt-5 mb-5'>
                    <h2 className='mx-auto'>Register</h2>
                </div>
                <div className='row'>
                    <div className='card p-3 mx-auto' style={{width:'400px'}}>
                        <h5 className='mx-auto mb-4'>Filled the form</h5>
                        <input ref='email' type="text" className='form-control' placeholder='Email'/>
                        {/* <input type="text" className='form-control mt-3' placeholder='Phone'/> */}
                        <input ref='password' type="password" className='form-control mt-3' placeholder='Password'/>
                        <input ref='confirm' type="password" className='form-control mt-3' placeholder='Confirm Password'/>
                        {
                            this.state.loading === false ?
                            <input onClick={this.onRegisterBtn} type="button" className='btn btn-primary mt-5 mb-3' value='Register'/>
                            :
                            <input disabled type="button" className='btn btn-primary mt-5 mb-3' value='Register'/>
                        }
                        <Link to='/' className='mx-auto'>
                            <div>
                                Login
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
