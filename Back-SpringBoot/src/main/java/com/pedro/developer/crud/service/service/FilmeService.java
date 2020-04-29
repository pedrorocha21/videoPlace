package com.pedro.developer.crud.service.service;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedro.developer.crud.api.dto.FilmeDTO;
import com.pedro.developer.crud.domain.entity.Filme;
import com.pedro.developer.crud.domain.entity.UsuarioFilme;
import com.pedro.developer.crud.domain.repository.FilmeRepository;
import com.pedro.developer.crud.domain.repository.UsuarioFilmeRepository;
import com.pedro.developer.crud.service.converter.FilmeConverter;



@Service
public class FilmeService {

		@Autowired
		FilmeRepository filmeRepository;
		
		@Autowired
		UsuarioFilmeRepository usuarioFilmeRepository;
				
		@Autowired
		FilmeConverter filmeConverter;
		
	    
	    public List<FilmeDTO> getAllFilme() {
	        List<Filme> filmes = (List<Filme>) filmeRepository.findAll();
	        List<FilmeDTO> dtos = filmes.stream().map(s -> filmeConverter.convertFrom(s))
					.collect(Collectors.toList());
	        dtos.stream().forEach(filmeDTO -> {
	        	filmeDTO.setQuantidadeDisponivel(getQuantidadeDisponivel(filmeDTO.getId()));
	        });
	        return dtos;
	    }
	    
	    public int getQuantidadeDisponivel(Long id) {
	    	Filme filme = filmeRepository.findById(id).get();
	    	if(filme!=null) {
	    		List<UsuarioFilme> usuarioFilmes = usuarioFilmeRepository.findAllByFilmeIdAndDataEntregaIsNull(id);
	    		if(usuarioFilmes!=null)
	    			return (filme.getQuantidadeTotal() - usuarioFilmes.size());
	    	}
	    	return 0;
	    }


	    public FilmeDTO getById(Long id) {
	    	FilmeDTO dto = null;
	        try {
		       dto = filmeConverter.convertFrom(filmeRepository.findById(id).get());
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	        return dto;
	    }

	    public void saveOrUpdate(FilmeDTO filme) {
	    	try {
	    		filmeRepository.save(filmeConverter.convertTo(filme));
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	    }
	    


	    public void delete(Long id) {
	    	try {
	    		filmeRepository.deleteById(id);
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	    }

	

}
