package com.pedro.developer.crud.domain.repository;



import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pedro.developer.crud.domain.entity.UsuarioFilme;

@Repository
public interface UsuarioFilmeRepository  extends CrudRepository<UsuarioFilme, Long> {
	
	List<UsuarioFilme> findAllByUsuarioId(Long id);
	
	List<UsuarioFilme> findAllByFilmeId(Long id);
	
	List<UsuarioFilme> findAllByFilmeIdAndDataEntregaIsNull(Long id);	

	List<UsuarioFilme> findAllByUsuarioIdAndDataEntregaIsNull(Long id);

}
