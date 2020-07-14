import React from 'react'
import Axios from 'axios'
import Loading from '../components/Loading'
import { urlApi } from '../supports/constants/urlApi'
import {Table} from 'reactstrap'
import Swal from 'sweetalert2'
import NumberFormat from 'react-number-format'
import { Redirect } from 'react-router-dom'

class Payment extends React.Component{  

    state = {
        data : null,
        isComplete : false,
        notes : null
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        let id = Number(window.location.pathname.split('/')[2])

        Axios.get(urlApi + 'transaction/detail/'+ id)
        .then((res)=>{
            console.log(res.data.data)
            this.setState({data : res.data.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onApproveBtnClick = () => {
        let transaction_id = Number(window.location.pathname.split('/')[2])
        let data = {
            id : transaction_id,
            transaction_status_id : 3
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You Want To Approve Transaction?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
          }).then((result) => {
            if (result.value) {
                Axios.patch(urlApi + 'status', data)
                .then((res)=>{
                    console.log(res)
                  if(!res.data.error){
                      Swal.fire(
                        'Approved!',
                        'Transaction has been Approved.',
                        'success'
                      )
                      this.setState({isComplete:true})
                  }
              })
              .catch((err)=>{
                  console.log(err)
              })
            }
          })
    }

    onRejectBtnClick = () => {
        let transaction_id = Number(window.location.pathname.split('/')[2])
        let data = {
            id : transaction_id,
            transaction_status_id : 7,
            notes : this.state.notes
        }

        console.log(data)

        Swal.fire({
            title: 'Are you sure?',
            text: "You Want To Reject Transaction?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reject it!'
          }).then((result) => {
            if (result.value) {
                Axios.patch(urlApi + 'status/rejected', data)
                .then((res)=>{
                    console.log(res)
                  if(!res.data.error){
                      Swal.fire(
                        'Rejected!',
                        'Transaction has been Rejected.',
                      )
                      this.setState({isComplete:true})
                  }
              })
              .catch((err)=>{
                  console.log(err)
              })
            }
          })
    }

    render(){
        if(this.state.data === null){
            return <Loading/>
        }

        if(this.state.isComplete) return <Redirect to ='/transaction'/>
        return(
            <div className="container-fluid p-5">
                <h1 style={{textAlign:'center'}}>Payment Detail</h1>

                <div className="row my-5">
                    <div className='col-md'>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th scope='col'>No</th>
                                    <th scope='col'>Title</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((val, index)=>{
                                        return(
                                            <tr key={val.id}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{val.product_name}</td>
                                                <td>
                                                <NumberFormat 
                                                value={val.product_price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                                                /></td>
                                                <td>{val.qty}</td>
                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                        </Table>
                        <h5 className='mt-3' style={{marginTop:50}}>Note : </h5>
                        <textarea value={this.state.notes} onChange={(e)=>this.setState({notes : e.target.value})} className='input-register form-control mt-2' ref='deskripsi' style={{height:'150px', marginBottom:20}} 
                        type='text' placeholder={this.state.data[0].transaction_status_id === 7 ? this.state.data[0].notes : 'notes'} />
                        
                            {
                                this.state.data[0].transaction_status_id === 7 ?

                                    <span className='mt-5' style={{marginRight:20}}>
                                        <button disabled className="btn btn-danger" >Rejected</button>
                                    </span>
                                :
                                <div>
                                    <span className='mt-5' style={{marginRight:20}}>
                                        <button className="btn btn-outline-primary" onClick={this.onApproveBtnClick} >Approve</button>
                                    </span>
                                    <span className='mt-5'>
                                        <button className="btn btn-outline-danger" onClick={this.onRejectBtnClick} >Reject</button>
                                    </span>
                                </div>
                            }

                    </div>
                    <div className='col-md' style={{height:'50vh', textAlign:'center', marginLeft: 30}}>
                        <div className="card">
                            <div className="card-header">

                                Grand Total : {this.state.data[0].total_transaction}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Nama Rekening Bank : {this.state.data[0].name_bank_account}</li>
                                <li className="list-group-item">No Rekening Bank : {this.state.data[0].bank_account}</li>
                            </ul>
                        </div>
                        <div className="card h-100" style={{marginTop:30}}>
                            <img style={{objectFit:'contain', height:'100%'}} width='100%' src={urlApi+this.state.data[0].url_payment_proof} alt="broken"></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment