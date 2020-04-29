package com.pedro.developer.crud.domain.repository;



import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pedro.developer.crud.domain.entity.Usuario;

@Repository
public interface UsuarioRepository  extends CrudRepository<Usuario, Long> {

	Usuario findByNome(String nome);
}
