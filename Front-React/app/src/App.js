import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import UsuarioList from './UsuarioList';
import UsuarioEdit from './UsuarioEdit';
import FilmeEdit from './FilmeEdit';
import FilmeList from './FilmeList';
import AlocacaoList from './AlocacaoList';
import FilmeAlocacaoList from './FilmeAlocacaoList';
import AlocacaoEdit from './AlocacaoEdit';

class App extends Component {
  render() {
    return (
      <Router>  
        <Switch>
          
        <Route path='/' exact={true} component={Home}/>        
        <Route path='/usuarios' exact={true} component={UsuarioList}/>          
        <Route path='/usuarios/:id' component={UsuarioEdit}/>          
        <Route path='/usuario/:id/locacoes' exact={true} component={AlocacaoList}/>          
        <Route path='/usuario/:id/locacao' component={AlocacaoEdit}/>  
        <Route path='/filmes' exact={true} component={FilmeList}/>          
        <Route path='/filmes/:id' component={FilmeEdit}/>     
        <Route path='/filme/:id/locacoes' component={FilmeAlocacaoList}/>  

        </Switch>
      </Router>
    )
  }
}

export default App;