import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

class UsuarioEdit extends Component {

  emptyItem = {
    nome: '',
    sexo: '',
    cpf: '',
    dataNascimento: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const usuario = await (await fetch(`/api/a/usuario/${this.props.match.params.id}`)).json();
      usuario.dataNascimento =  usuario.dataNascimento ? moment(usuario.dataNascimento).format("YYYY-MM-DD"): "";
      this.setState({item: usuario});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }
  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/a/usuario', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/usuarios');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Editar Usuario' : 'Adicionar Usuario'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input type="text" name="nome" id="nome" required value={item.nome || ''}
                   onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="cpf">CPF</Label>
            <Input type="text" name="cpf" id="cpf" required value={item.cpf || ''}
                   onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="sexo">Sexo</Label>
            <Input type="text" name="sexo" id="sexo" value={item.sexo || ''}
                   onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="dataNascimento">Data de Nascimento</Label>
            <Input type="date" name="dataNascimento" id="dataNascimento" required value={item.dataNascimento || ''}
                   onChange={this.handleChange} />
          </FormGroup>        
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/usuarios">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(UsuarioEdit);