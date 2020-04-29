import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container,Table, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

class FilmeAlocacaoList extends Component {


  constructor(props) {
    super(props);
    this.state = {groups: [], isLoading: true, filterStr : ""};
  }

  async componentDidMount() {
      const aloc = await (await fetch(`/api/a/filme/${this.props.match.params.id}/locacoes`)).json();
      this.setState({groups: aloc, isLoading: false, filterStr:""});
  }

  async remove(id) {
    await fetch(`/api/a/usuario/locacao/${id}`, {
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
    const {groups, filterStr} = this.state;

 
    const filteredElements = groups
    .map(alocacao => {
      return <tr key={alocacao.id}>
        <td style={{whiteSpace: 'nowrap'}}>{alocacao.filme.nome}</td>
        <td style={{whiteSpace: 'nowrap'}}>{alocacao.usuario.nome}</td>
        <td>
          {alocacao.dataInicial ? <Moment format="DD/MM/YYYY">
                {alocacao.dataInicial}
            </Moment> : "" }      
        </td>
        <td>
            {alocacao.dataFinal ? <Moment format="DD/MM/YYYY">
                {alocacao.dataFinal}
            </Moment> : "" }          
          </td>
          <td>
          {alocacao.dataEntrega ? <Moment format="DD/MM/YYYY">
                {alocacao.dataEntrega}
            </Moment> : "Nao" }
         
          </td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="danger" onClick={() => this.remove(alocacao.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>Historico de Locacao do Filme</h3>

          <Label for="busca">Procurar Filmes</Label>
          <Input
          type="text"
          name = "busca"
          value={ filterStr }
          onChange={ e => this.setState({ filterStr: e.target.value }) } />
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Filme</th>
              <th width="20%">Usuario</th>
              <th width="20%">Data Inicial</th>
              <th>Data Final</th>
              <th>Data de Entrega</th>
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

export default withRouter(FilmeAlocacaoList);