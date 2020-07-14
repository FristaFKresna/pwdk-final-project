import React, { Component } from 'react'
import Axios from 'axios'
import Loading from '../components/Loading'
import { urlApi } from '../supports/constants/urlApi'
import Moment from 'moment'
import NumberFormat from 'react-number-format'
import { Table } from 'reactstrap';
import Swal from 'sweetalert2'

export default class Transaction extends Component {
    state = {
        status : null,
        data : null,
        status_id : null
    }

    componentDidMount(){
        this.getStatus()
        this.getDataTrans()
    }

    getStatus = () => {
        Axios.get(urlApi+'status')
        .then((res)=>{
            if(!res.data.error){
                this.setState({status : res.data.data})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getDataTrans = () => {
        Axios.get(urlApi+'transaction')
        .then((res)=>{
            if(!res.data.error){
                if(this.state.status_id > 0){
                    let filtered = res.data.data.filter((val)=>{
                        return Number(val.status_id) === Number(this.state.status_id)
                    })
                    this.setState({data : filtered})
                    console.log('masuk')
                }else{
                    this.setState({data : res.data.data})
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    updateStatusTransaction = (id_transaction, status_id) => {
        let data = {
            id : id_transaction,
            transaction_status_id : status_id + 1
        }


        Swal.fire({
            title: 'Are you sure?',
            text: "You Want To Update Status Transaction?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.value) {
                Axios.patch(urlApi + 'status', data)
                .then((res)=>{
                    console.log(res)
                  if(!res.data.error){
                      Swal.fire(
                        'Updated!',
                        'Status has been updated.',
                        'success'
                      )
                      this.getDataTrans()
                  }
              })
              .catch((err)=>{
                  console.log(err)
              })
            }
          })

    }


    renderData = () => {
        return this.state.data.map((val, index)=>{
            return(
                <tr key={val.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{Moment(val.date).format('MMM Do YYYY') }</td>
                    <td>
                        <NumberFormat 
                        value={val.total_transaction} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                        />
                    </td>
                    <td>{val.total_item}</td>
                    <td>{val.status}</td>

                    {
                        val.status_id === 2 || val.status_id === 7 ? 
                        <td><a href={'/payment/'+ val.id}><input type='button' className='btn btn-success' value='see payment proof'/></a></td>
                        :
                        val.status_id > 2 && val.status_id < 7
                        ?
                        <td><input type='button' onClick={()=>this.updateStatusTransaction(val.id, val.status_id)} className='btn btn-success' value='Update Status'/></td>
                        :
                        <td><input type='button' disabled className='btn btn-success' value='see payment proof'/></td>

                    }

                </tr>
            )
        })
    }

    render() {
        if(this.state.status === null || this.state.data === null) return <Loading/>
        return (
            <div className='container-fluid'>
                <h1 style={{textAlign:'center'}}>Transaction List</h1>
                    
                    <div className="container">
                        <div className="row" style={{padding:30}}>
                            <div className='col-md'>

                                <select name='kagegori' id='kategori' style={{marginRight:30}} onChange={(event)=>(this.setState({status_id : event.target.value}, this.getDataTrans()))} >
                                    <option value='0'>Semua Transaksi</option>
                                    {
                                        this.state.status.map((val)=>{
                                            return <option key={val.id} value={val.id}>{val.status}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                <div className="container">
                    <div className="row justify-content-center" style={{textAlign:'center'}}>
                        <Table>
                            <thead>
                                <tr>
                                    <th scope='col'>No</th>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Total Transaction</th>
                                    <th scope='col'>Total Item</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Payment Proof</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.renderData()}                           
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}
