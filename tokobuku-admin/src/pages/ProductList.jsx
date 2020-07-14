import React, { Component } from 'react'
import Axios from 'axios'

export default class ProductList extends Component {

    state = {
        data : null
    }

    componentDidMount(){
        this.getDataProduct()
    }

    getDataProduct = () => {
        let token = localStorage.getItem('token')
        if (token){
            console.log(token)
            let config = {
                headers : {
                    Authorization : 'Bearer ' + token
                }
            }
            Axios.get('http://localhost:4000/product', config)
            .then((res)=>{
                this.setState({data : res.data.data})
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    render() {
        if(this.state.data === null) return <h1>Loading ...</h1>
        return (
            <div>
                <h1>Product List</h1>
                {
                    this.state.data.map((val)=>{
                        return(
                        <p>{val.name}</p>
                        )
                    })
                }
            </div>
        )
    }
}
