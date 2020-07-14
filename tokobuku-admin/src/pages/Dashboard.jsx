import React, { Component } from 'react'
import Loading from './../components/Loading'
import Axios from 'axios'
import { urlApi } from './../supports/constants/urlApi'

export default class DashBoard extends Component {

    state = {
        newOrder : null,
        onProccess : null,
        productsSell : null,
        outOfStock : null,
        topTen : null
    }

    componentDidMount(){
        this.getDataTransaction()
        this.getAllProducts()
        this.topTenProducts()
    }

    getDataTransaction = () => {
        Axios.get(urlApi+'transaction')
        .then((res)=>{
            if(!res.data.error){
                let newOrder = res.data.data.filter((val)=>{
                    return val.status_id <= 2
                })

                let onProccess = res.data.data.filter((val)=>{
                    return val.status_id > 2 && val.status_id < 7
                })
                this.setState({newOrder : newOrder.length, onProccess : onProccess.length})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getAllProducts = () => {
        let token = localStorage.getItem('token')
        if(token){
            let config = {
                headers : {
                    Authorization : "Bearer " + token
                }
            }
        Axios.get(urlApi+'products', config)
        .then((res)=>{
            if(!res.data.error){
                let productsSell = res.data.data.filter((val)=>{
                    return val.stock > 0
                })
                let outOfStock = res.data.data.filter((val)=>{
                    return val.stock === 0
                })

                this.setState({outOfStock : outOfStock.length, productsSell : productsSell.length})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    }

    topTenProducts = () => {
        Axios.post(urlApi+'transaction/top-ten')
        .then((res)=>{
            if(!res.data.error){
                console.log(res.data.data)
                this.setState({topTen : res.data.data})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    render() {
        if(this.state.newOrder === null || this.state.onProccess === null || this.state.productsSell === null || this.state.outOfStock === null || this.state.topTen === null){
            return (
                <Loading/>
            )
        }

        return (
            <div className='container-fluid'>
                <h2 style={{textAlign:'center', margin : 30}}>Dashboard</h2>
                <div className="container-fluid">
                    <div className="row" style={{margin:30}}>
                        {/* ============================ */}
                        <div className="col-sm">

                            <div className='card' style={{width: 'auto', height:'30vh', backgroundColor:'#f8f9fa'}}>

                                <div className="column">
                                    <h2 style={{textAlign:'center', margin : 20}}>Ringkasan Transaksi</h2>
                                    <div className="container-fluid">
                                        <div className="row justify-content-around" style={{textAlign:'center'}} >
                                            <div className="column">
                                                <h4>Pesanan Baru</h4>

                                                <div style={{fontSize:30}}>{this.state.newOrder}</div>
                                            </div>
                                            <div className="column">
                                                <h4>Diproses</h4>
                                                <div style={{fontSize:30}}>{this.state.onProccess}</div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center" style={{textAlign:'center', marginTop: 20}} >
                                            <div className="column">
                                                <a href='/transaction'>see detail</a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ================================ */}
                        <div className="col-sm">
                            <div className='card' style={{width: 'auto', height:'30vh', backgroundColor:'#f8f9fa'}}>
                                <div className="column">
                                    <h2 style={{textAlign:'center', margin : 20}}>Daftar Barang</h2>
                                    <div className="container-fluid">
                                        <div className="row justify-content-around" style={{textAlign:'center'}}>
                                            <div className="column">
                                                <h4>Dijual</h4>
                                                <div style={{fontSize:30}}>{this.state.productsSell}</div>
                                            </div>
                                            <div className="column">
                                                <h4>Stok Habis</h4>
                                                <div style={{fontSize:30}}>{this.state.outOfStock}</div>                                                
                                            </div>
                                        </div>
                                        <div className="row justify-content-center" style={{textAlign:'center', marginTop: 20}} >
                                            <div className="column">
                                                <a href='/product'>see detail</a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ================================== */}
                    </div>

                    <div style={{margin:60}}>
                        <h2 style={{textAlign:'center', margin:20}}>Top 10 Produk</h2>
                        <div className="container">
                            <ul className="list-group" style={{textAlign:'center'}}>

                                {

                                    this.state.topTen.map((val)=>{
                                        return <li key={val.id} className='list-group-item'>{val.product_name}</li>
                                    })

                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
