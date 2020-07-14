import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const TokoBukuNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(false)

  const toggle = () => setIsOpen(!isOpen);

  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(token){
      setUser(true)
    }
    

  },[])

  const onLogoutBtnClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want To Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if(result.value) {
         localStorage.removeItem('token')
         setUser(false)
         Swal.fire({
          icon:'success',
          title:'Logout Success',
          timer:2000,
          showConfirmButton:false,
      })
      .then((res)=>{
          window.location = '/'
      })
      }
    })
  }



  return (
    <div>
      <Navbar color="light" light expand="md" style={{padding:10}}>
        <NavbarBrand href="/" style={{marginLeft:30}}>
            <a className='navbar-brand' href="/">
                <img src={require('./../assets/Logo/BookStoreLogo.png')} width='30' height='30' className='d-inline-block align-top' alt=""/>
                TokoBuku
            </a>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {
            user ?            
            <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/transaction'>Transaction</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Product
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/post">
                  Post Product
                </DropdownItem>
                <DropdownItem href="/product">
                  Product List
                </DropdownItem>
                <DropdownItem />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          :
          <div></div>

          }
          {
            user ?
            <NavbarText style={{cursor:'pointer', marginRight:30}} onClick={onLogoutBtnClick}>Logout</NavbarText>
            :
            <NavbarText style={{cursor:'pointer', marginRight:30}} onClick={()=>window.location('/')}>Sign In</NavbarText>

          }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default TokoBukuNavbar;