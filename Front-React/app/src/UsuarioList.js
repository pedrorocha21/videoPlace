import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Moment from 'react-moment';


class UsuarioList extends Component {
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

    fetch('api/a/usuarios', {credentials: 'include'})
      .then(response => response.json())
      .then(data => this.setState({groups: data, isLoading: false}))
      .catch(() => this.props.history.push('/'));
  }

  async remove(id) {
    await fetch(`/api/a/usuario/${id}`, {
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
                    || (e.cpf && e.cpf.toLowerCase().includes(filterStr.toLowerCase())))
    .map(usuario => {
      return <tr key={usuario.id}>
        <td>
         <ButtonGroup>
            <Button size="sm" color="success" tag={Link} to={"/usuario/" + usuario.id+"/locacoes"}>Locacao</Button>
          </ButtonGroup>
        </td>
        <td style={{whiteSpace: 'nowrap'}}>{usuario.nome}</td>
        <td>
          {usuario.cpf || ''}
        </td>
        <td>
          {usuario.sexo || ''}    
        </td>
        <td>
            {usuario.dataNascimento ? 
            <Moment format="DD/MM/YYYY">
                {usuario.dataNascimento}
            </Moment> 
            : "" }  
          </td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/usuarios/" + usuario.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(usuario.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/usuarios/new">Adicionar Usuario</Button>
          </div>
          <h3>Usuarios</h3>

          <Label for="busca">Procurar Usuarios</Label>
          <Input
          type="text"
          name = "busca"
          value={ filterStr }
          onChange={ e => this.setState({ filterStr: e.target.value }) } />
          <Table className="mt-4">
            <thead>
            <tr>
              <th> Ir para Locacao/Historico</th>
              <th width="20%">Nome</th>
              <th>CPF</th>
              <th width="20%">Sexo</th>
              <th>Data de Nascimento</th>
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

export default withCookies(withRouter(UsuarioList));