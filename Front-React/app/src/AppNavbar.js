import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarBrand tag={Link} to="/usuarios">Usuarios</NavbarBrand>      
      <NavbarBrand tag={Link} to="/filmes">Filmes</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
    </Navbar>;
  }
}