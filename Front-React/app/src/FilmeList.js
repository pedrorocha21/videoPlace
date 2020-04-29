import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class FilmeList extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state = {groups: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true, filterStr : ""};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/a/filmes', {credentials: 'include'})
      .then(response => response.json())
      .then(data => this.setState({groups: data, isLoading: false}))
      .catch(() => this.props.history.push('/'));
  }

  async remove(id) {
    await fetch(`/api/a/filme/${id}`, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': this.state.csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
      this.setState({groups: updatedGroups});
    });
  }

  render() {
    const {groups, isLoading, filterStr} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const filteredElements = groups
    .filter(e => (e.nome && e.nome.toLowerCase().includes(filterStr.toLowerCase())) 
                    || (e.genero && e.genero.toLowerCase().includes(filterStr.toLowerCase()))
                    || (e.diretor && e.diretor.toLowerCase().includes(filterStr.toLowerCase())))
    .map(filme => {
      return <tr key={filme.id}>
        <td>
         <ButtonGroup>
            <Button size="sm" color="success" tag={Link} to={"/filme/" + filme.id+"/locacoes"}>Historico</Button>
          </ButtonGroup>
        </td>
        <td style={{whiteSpace: 'nowrap'}}>{filme.nome}</td>
        <td>{filme.genero || ''}</td>
        <td>
          {filme.diretor || ''}
 
        </td>
        <td>
        {filme.quantidadeTotal || ''}
          </td>
          <td>
        {filme.quantidadeDisponivel || ''}
          </td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/filmes/" + filme.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(filme.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/filmes/new">Adicionar Filme</Button>
          </div>
          <h3>Filmes</h3>

          <Label for="busca">Procurar Filmes</Label>
          <Input
          type="text"
          name = "busca"
          value={ filterStr }
          onChange={ e => this.setState({ filterStr: e.target.value }) } />

          <Table className="mt-4">
            <thead>
            <tr>
              <th> Ir para Historico</th>
              <th width="20%">Nome</th>
              <th>Genero</th>
              <th width="20%">Diretor</th>
              <th>Quantidade Total</th>              
              <th>Quantidade Disponivel</th>
              <th width="10%">Acoes</th>
            </tr>
            </thead>
            <tbody>
            {filteredElements}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withCookies(withRouter(FilmeList));