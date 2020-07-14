import React, { Component } from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import {Table, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import Swal from 'sweetalert2'
import NumberFormat from 'react-number-format'
import Loading from '../components/Loading'

export default class AllProduct extends Component {

    state = {
        category : null,
        publishers : null,
        author : null,
        data : null,
        searchCategory : null,
        dropdownOpen : false
    }

    componentDidMount(){
        this.getCategory()
        this.getPublisher()
        this.getProducts()
    }


    getCategory = () => {
        Axios.get(urlApi+'category')
        .then((res)=>{
            if(!res.data.error){
                this.setState({category : res.data.data})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getPublisher = () => {
        Axios.get(urlApi+'publishers')
        .then((res)=>{
            if(!res.data.error){
                this.setState({publishers : res.data.data})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getProducts = (category) => {
        var publishers = window.location.pathname.split('/')[2]
        if(publishers){
            if(publishers.includes('%20')){
                publishers = publishers.replace(/%20/g, ' ')
            }
        }
            let token = localStorage.getItem('token')
                    if(token){
                        let config = {
                            headers : {
                                Authorization : "Bearer " + token
                            }
                        }

                        Axios.get(urlApi+'products', config)
                        .then((res)=>{
                            console.log(res)
                            if(!res.data.error){
                                if(publishers){
                                    let filtered = res.data.data.filter((val)=>{
                                        return val.publisher === publishers
                                    })
                                    if(category){
                                        let filterCategory = filtered.filter((val)=>{
                                            return val.category.toString() === category.toString()
                                        })
                                        this.setState({data:filterCategory})
                                    }else{
                                        this.setState({data : filtered}) 
                                    }
                                }else{
                                    if(category){
                                        let filterCategory = res.data.data.filter((val)=>{
                                            return val.category.toString() === category.toString()
                                        })
                                        this.setState({data:filterCategory})
                                    }else{
                                        this.setState({data : res.data.data}) 

                                    }
                                }
                            }
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    }

        
    }


    onDeleteClickBtn = (product_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You Want To Delete This Product?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
          }).then((result) => {
            if (result.value) {
                Axios.delete(urlApi + 'products/'+ product_id)
                .then((res)=>{
                    console.log(res)
                  if(!res.data.error){
                      Swal.fire(
                        'Deleted!',
                        'Product has been deleted.',
                        
                      )
                      this.getProducts()
                  }
              })
              .catch((err)=>{
                  console.log(err)
              })
            }
          })
    }

    renderProducts = () => {
        return this.state.data.map((val, index)=>{
            return(
                <tr key={val.id}>
                    <th scope='row'>{index + 1}</th>
                    <td><img src={urlApi+val.url_image} width='120px' alt=''/></td>
                    <td>{val.title}s</td>
                    <td>{val.author}</td>
                    <td>{val.publisher}</td>
                    <td>{val.category}</td>
                    <td>{val.stock}</td>
                    <td>
                    <NumberFormat 
                        value={val.price} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} prefix={'Rp'} 
                        />
                    </td>
                    <td><input type='button' onClick={()=>this.onDeleteClickBtn(val.id)} className='btn btn-outline-danger' value='delete'/></td>
                </tr>
            )
        })
    }
    render() {
        if(this.state.publishers === null || this.state.category === null || this.state.data === null) return <Loading/>

        return (
            <div className='container-fluid'>
                <h1 style={{textAlign:'center'}}>Product List</h1>
                    <div style={{textAlign:'center', paddingRight : 50, paddingLeft : 50, marginBottom :30, marginTop : 30}}>
                        <Nav>
                            <NavItem>
                                <NavLink href="/product">All Publisher</NavLink>
                            </NavItem>
                            {
                                this.state.publishers.map((val)=>{
                                    return(
                                        <NavItem key={val.id}>
                                            <NavLink href={"/product/"+ val.name}>{val.name}</NavLink>
                                        </NavItem>
                                    )
                                })
                            }
                        </Nav>
                    </div>

                    {/* <div className="row justify-content-left" style={{margin:30}}>
                        <div className='col-md-6'>
                            <select name='kategori' id='kategori' style={{marginRight:30}} onChange={(e)=>(this.setState({searchCategory : e.target.value}, this.getProducts()))}>
                                <option value='0'>Kategori</option>
                                {
                                    this.state.category.map((val)=>{
                                        return <option key={val.id} value={val.category}>{val.category}</option>
                                    })
                                }
                            </select>
                            <select name='penerbit' id='penerbit' style={{marginRight:30}} onChange={(e)=>this.setState({searchPublisher : e.target.value}, this.getProducts())}>
                                <option value='0'>Penerbit</option>
                                {
                                    this.state.publishers.map((val)=>{
                                        return <option key={val.id} value={val.name} >{val.name}</option>
                                    })
                                }
                            </select>
                            <select name='pengarang' id='pengarang' onChange={(e)=>this.setState({searchPublisher : e.target.value}, this.getProducts())}>
                                <option value='0'>Pengarang</option>
                                {
                                    this.state.publishers.map((val)=>{
                                        return <option key={val.id} value={val.name} >{val.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        
                    </div> */}
                     <div className="row justify-content-start" style={{textAlign:'center', paddingRight : 50, paddingLeft : 50, marginLeft:10, marginBottom:20}}>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={()=>{this.setState({dropdownOpen : !this.state.dropdownOpen})}}>
                        <DropdownToggle caret>
                            Kategori
                        </DropdownToggle>
                        <DropdownMenu>
                            {   
                                this.state.category.map((val)=>{
                                    return <DropdownItem onClick={(e)=>{this.getProducts(e.currentTarget.textContent)}} key={val.id}>{val.category}</DropdownItem>
                                })
                                 
                            }
                        </DropdownMenu>
                        </Dropdown>
                     </div>
                    <div className="row justify-content-center" style={{textAlign:'center', paddingRight : 50, paddingLeft : 50}}>
                        <Table>
                            <thead>
                                <tr>
                                    <th scope='col'>No</th>
                                    <th scope='col'>Image</th>
                                    <th scope='col'>Judul</th>
                                    <th scope='col'>Pengarang</th>
                                    <th scope='col'>Penerbit</th>
                                    <th scope='col'>Kategori</th>
                                    <th scope='col'>Stock</th>
                                    <th scope='col'>Harga</th>
                                    <th scope='col'>Delete</th>
                                </tr>
                            </thead>
                           <tbody>
                                {this.renderProducts()}
                            </tbody>
                        </Table>

                    </div>
            </div>
        )
    }
}
