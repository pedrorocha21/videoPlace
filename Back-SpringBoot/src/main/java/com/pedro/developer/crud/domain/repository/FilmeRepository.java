package com.pedro.developer.crud.domain.repository;



import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pedro.developer.crud.domain.entity.Filme;


@Repository
public interface FilmeRepository  extends CrudRepository<Filme, Long> {
	
	

}
