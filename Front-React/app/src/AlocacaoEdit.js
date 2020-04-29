import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button,ButtonGroup, Table, Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import "react-datepicker/dist/react-datepicker.css";

class AlocacaoEdit extends Component {


  constructor(props) {
    super(props);
 
    this.state = {groups: [], isLoading: true, filterStr : ""};

  }

  async componentDidMount() {
      
      const filmes = await (await fetch(`/api/a/filmes`)).json();
      this.setState({groups: filmes, isLoading: false, filterStr : ""});

  }

  async aloca(filme) {

    await fetch(`/api/a/usuario/${this.props.match.params.id}/locacao`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filme),
    })
    this.props.history.push("/usuario/" + this.props.match.params.id+"/locacoes");
    
  }

  render() {
    const {groups, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const filteredElements = groups
    .map(filme => {
      return <tr key={filme.id}>
        <td style={{whiteSpace: 'nowrap'}}>{filme.nome}</td>
        <td>{filme.genero || ''}</td>
        <td>
          {filme.diretor || ''}
  
        </td>
        <td>
        {filme.quantidadeTotal || 0}
          </td>
          <td>
        {filme.quantidadeDisponivel || 0}
          </td>
        <td>
          {filme.quantidadeDisponivel > 0 ?
            <ButtonGroup>
              <Button size="sm" color="primary" onClick={() => this.aloca(filme)}>Locar</Button>
            </ButtonGroup>
          : ""}
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
        <div className="float-right">
            <Button color="success" tag={Link} to={"/usuario/"+this.props.match.params.id+"/locacoes"}>Voltar</Button>
          </div>
          <h3>Realizar Alocacao</h3>

          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Filme</th>
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

export default withRouter(AlocacaoEdit);