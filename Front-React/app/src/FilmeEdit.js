import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import "react-datepicker/dist/react-datepicker.css";

class FilmeEdit extends Component {

  emptyItem = {
    nome: '',
    genero: '',
    diretor: '',
    quantidadeTotal: '',
    quantidadeDisponivel: '',
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
      const filme = await (await fetch(`/api/a/filme/${this.props.match.params.id}`)).json();
     this.setState({item: filme});
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
    await fetch('/api/a/filme', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/filmes');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Editar Filme' : 'Adicionar Filme'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input type="text" name="nome" id="nome" value={item.nome || ''}
                   onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="genero">Genero</Label>
            <Input type="text" name="genero" id="genero" value={item.genero || ''}
                   onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="diretor">Diretor</Label>
            <Input type="text" name="diretor" id="diretor" value={item.diretor || ''}
                   onChange={this.handleChange} />
          </FormGroup>   
          <FormGroup>
            <Label for="quantidadeTotal">Quantidade</Label>
            <Input type="number" name="quantidadeTotal" id="quantidadeTotal" min="0" value={item.quantidadeTotal || ''}
                   onChange={this.handleChange} />
          </FormGroup>     
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/filmes">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(FilmeEdit);