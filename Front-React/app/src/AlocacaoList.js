import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container,Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

class AlocacaoList extends Component {


  constructor(props) {
    super(props);
    this.state = {groups: [], isLoading: true, filterStr : ""};
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const aloc = await (await fetch(`/api/a/usuario/${this.props.match.params.id}/locacoes`)).json();
      this.setState({groups: aloc, isLoading: false, filterStr:""});
    }
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

  async renova(alocacao) {
    const aloc = await (await fetch(`/api/a/usuario/locacao/renova/${alocacao.id}`)).json();
    this.setState({groups: aloc, isLoading: false, filterStr:""});   
  }

  async recebe(alocacao) {
    const aloc = await (await fetch(`/api/a/usuario/locacao/recebe/${alocacao.id}`)).json();
    this.setState({groups: aloc, isLoading: false, filterStr:""});   
  }


  render() {
    const {groups} = this.state;
 
    const filteredElements = groups
    .map(alocacao => {
      return <tr key={alocacao.id}>
        <td style={{whiteSpace: 'nowrap'}}>{alocacao.usuario.nome}</td>
        <td style={{whiteSpace: 'nowrap'}}>{alocacao.filme.nome}</td>
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
            {alocacao.renovado < 2 && !alocacao.dataEntrega ? <Button size="sm" color="primary"  onClick={() => this.renova(alocacao)}>Renovar</Button> : ""}            
            <Button size="sm" color="danger" onClick={() => this.remove(alocacao.id)}>Deletar</Button>
            {!alocacao.dataEntrega ? <Button size="sm" color="success" onClick={() => this.recebe(alocacao)}>Receber</Button>:""}
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
         <div className="float-right">
              <Button color="success" tag={Link} to={"/usuario/"+this.props.match.params.id+"/locacao" }>Realizar Locacao</Button>
          </div>
          <h3>Historico de Locacao </h3>

          <Table className="mt-4">
            <thead>
            <tr>
             <th width="20%">Cliente</th>
              <th width="20%">Filme</th>
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

export default withRouter(AlocacaoList);