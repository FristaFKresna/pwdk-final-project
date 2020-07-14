import React from 'react'
import Loading from '../components/Loading'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import { Redirect } from 'react-router-dom'

export default class PostProduct extends React.Component{

    state = {
        category : null,
        publishers : null,
        category_id : null,
        publisher_id : null,
        isComplete : false
    }
    
    componentDidMount(){
        this.getCategory()
        this.getPublisher()
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


    onSubmitClick = () => {
        let data = {
            name : this.refs.title.value,
            price : this.refs.price.value,
            description : this.refs.deskripsi.value,
            stock : this.refs.stok.value,
            tahun_terbit : this.refs.tahun.value,
            halaman : this.refs.halaman.value,
            bahasa : this.refs.bahasa.value,
            author : this.refs.pengarang.value,
            publishers_id : this.state.publisher_id,
            category_id : this.state.category_id
        }

        let image = this.refs.image.files[0]
        console.log(image)     

        if(data.name && data.price && data.description && data.stock && data.tahun_terbit && data.halaman && data.bahasa && data.author && data.publishers_id && data.category_id && image){
            
            let fd = new FormData()
            fd.append('data', JSON.stringify(data))
            fd.append('product_image', image )

            Axios.post(urlApi+'products', fd)
            .then((res)=>{
                console.log(res)
                if(!res.data.error){
                    alert(res.data.message)
                    this.setState({isComplete : true})
                }
            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
            alert('ada yang kosong')
        }
    }    

    render(){
        if(this.state.isComplete) return <Redirect to = '/dashboard'/>
        if(this.state.publishers === null || this.state.category === null) return <Loading/>
        return(
            <div className = 'row justify-content-center align-item-center'>
                <div className="col-md-5 card p-5 my-5 form-group" style={{borderRadius:'30px', backgroundColor:'#f5f5f5', boxShadow:'0px 4px 15px -1px rgba(0,0,0,0.75)'}}>
                    <h2>Post Your Product</h2>

                    <div className='mt-3'>Judul :</div>
                        <input style={{borderRadius:'3px', borderWidth:'0.1px', height:'40px'}} 
                        className='input-register mt-2' ref='title' type='text' placeholder='title' />
                    
                    <div className='mt-3'>Harga : </div>
                        <input style={{borderRadius:'3px', borderWidth:'0.1px', height:'40px'}} 
                        className='input-register mt-2' ref='price' type='number' placeholder='price' />
                    
                    <div className='mt-3'>Stok :</div>
                        <input style={{borderRadius:'3px', borderWidth:'0.1px', height:'40px'}} 
                        className='input-register mt-2' ref='stok' type='number' placeholder='stok' />
                    
                    <div className='mt-3'>Tahun Terbit : </div>
                        <input style={{borderRadius:'3px', borderWidth:'0.1px', height:'40px'}} 
                        className='input-register mt-2' ref='tahun' type='text' placeholder='tahun terbit' />
                    
                    <div className='mt-3'>Halaman : </div>
                        <input style={{borderRadius:'3px', borderWidth:'0.1px', height:'40px'}} 
                        className='input-register mt-2' ref='halaman' type='number' placeholder='halaman' />
                    
                    <div className='mt-3'>Bahasa : </div>
                        <input style={{borderRadius:'3px', borderWidth:'0.1px', height:'40px'}} 
                        className='input-register mt-2' ref='bahasa' type='text' placeholder='bahasa' />
                    
                    <div className='mt-3'>Pengarang : </div>
                        <input style={{borderRadius:'3px', borderWidth:'0.1px', height:'40px'}} 
                        className='input-register mt-2' ref='pengarang' type='text' placeholder='pengarang' />

                    <div className='mt-3'>Kategori : </div>

                    <select name='kategori' id='kategori' style={{height:'40px'}} onChange={(event)=>(this.setState({category_id : event.target.value}))}>
                        <option value='0'>Kategori</option>
                        {
                         this.state.category.map((val)=>{
                             return <option key={val.id} value={val.id}>{val.category}</option>
                         })   
                        }
                    </select>

                    <div className='mt-3'>Publisher : </div>
                    <select name='publisher' id='publisher' style={{height:'40px'}} onChange={(event)=>(this.setState({publisher_id : event.target.value}))}>
                        <option value='0'>Publisher</option>
                        {
                         this.state.publishers.map((val)=>{
                             return <option key={val.id} value={val.id}>{val.name}</option>
                         })   
                        }
                    </select>
                    <div className='mt-3'>Product Image : </div>
                    <input type='file' ref='image' accept='image/*' className='form-control mt-3'/>
                    <div className='mt-3'>Deskripsi : </div>
                        <textarea className='input-register mt-2' ref='deskripsi' style={{height:'200px'}} 
                        maxLength='500' type='text' placeholder='description' />
                    <span className='mt-5'>
                        <button className="btn btn-outline-primary" onClick={this.onSubmitClick}>Submit</button>
                    </span>
                </div>
            </div>
        )
    }
}