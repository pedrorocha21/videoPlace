package com.pedro.developer.crud.service.service;



import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedro.developer.crud.api.dto.UsuarioFilmeDTO;
import com.pedro.developer.crud.domain.entity.Filme;
import com.pedro.developer.crud.domain.entity.Usuario;
import com.pedro.developer.crud.domain.entity.UsuarioFilme;
import com.pedro.developer.crud.domain.repository.FilmeRepository;
import com.pedro.developer.crud.domain.repository.UsuarioFilmeRepository;
import com.pedro.developer.crud.domain.repository.UsuarioRepository;
import com.pedro.developer.crud.service.converter.UsuarioFilmeConverter;



@Service
public class UsuarioFilmeService {

		@Autowired
		UsuarioFilmeRepository usuarioFilmeRepository;
		
		@Autowired
		UsuarioRepository usuarioRepository;
		
		@Autowired
		FilmeRepository filmeRepository;
				
		@Autowired
		UsuarioFilmeConverter usuarioFilmeConverter;
		
	    
	    public List<UsuarioFilmeDTO> getAllUsuarioFilme(Long id) {
	    		    	 
	        List<UsuarioFilme> usuarioFilmes = (List<UsuarioFilme>) usuarioFilmeRepository.findAllByUsuarioId(id);
	        List<UsuarioFilmeDTO> dtos = usuarioFilmes.stream().map(s -> usuarioFilmeConverter.convertFrom(s))
					.collect(Collectors.toList());
	        
	        return dtos;
	    }
	    
	    public List<UsuarioFilmeDTO> getAllUsuarioFilmeByFilme(Long id) {
	    	 
	        List<UsuarioFilme> usuarioFilmes = (List<UsuarioFilme>) usuarioFilmeRepository.findAllByFilmeId(id);
	        List<UsuarioFilmeDTO> dtos = usuarioFilmes.stream().map(s -> usuarioFilmeConverter.convertFrom(s))
					.collect(Collectors.toList());
	        
	        return dtos;
	    }

	    public UsuarioFilmeDTO getById(Long id) {
	    	UsuarioFilmeDTO dto = null;
	        try {
		       dto = usuarioFilmeConverter.convertFrom(usuarioFilmeRepository.findById(id).get());
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	        return dto;
	    }

	    public void saveOrUpdate(UsuarioFilmeDTO usuarioFilme) {
	    	try {
	    		usuarioFilmeRepository.save(usuarioFilmeConverter.convertTo(usuarioFilme));
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	    }
	    
	    public UsuarioFilmeDTO save(Long idUsuario, Long idFilme) {
	    	Usuario usuario = usuarioRepository.findById(idUsuario).get();
	    	Filme filme = filmeRepository.findById(idFilme).get();
	    	UsuarioFilme usuarioFilme = criaUsuarioFilme(usuario, filme); 
	    	if(usuarioFilme !=null ) {
		    	try {
		    		usuarioFilme = usuarioFilmeRepository.save(usuarioFilme);
		    		return usuarioFilmeConverter.convertFrom(usuarioFilme);
		    	}catch(Exception e) {
		    		//Gerar Log de Erro;
		    	}
	    	}
	    	//Gerar Log de Erro;
	    	return null;
	    	
	    }
	    
	    public List<UsuarioFilmeDTO> renova(Long idAlocacao) {
	    	UsuarioFilme usuarioFilme = usuarioFilmeRepository.findById(idAlocacao).get();
    		    	
	    	if(usuarioFilme !=null ) {
		    	try {
		    		Calendar dia = usuarioFilme.getDataFinal();		    		
		    		dia.add(Calendar.DAY_OF_MONTH, +7);
		    		usuarioFilme.setDataFinal(dia);
		    		usuarioFilme.setRenovado(usuarioFilme.getRenovado()+1);
		    		usuarioFilme = usuarioFilmeRepository.save(usuarioFilme);
		    		return getAllUsuarioFilme(usuarioFilme.getUsuario().getId());
		    	}catch(Exception e) {
		    		//Gerar Log de Erro;
		    	}
	    	}
	    	//Gerar Log de Erro;
	    	return null;
	    	
	    }
	    
	    public List<UsuarioFilmeDTO> recebe(Long idAlocacao) {
	    	UsuarioFilme usuarioFilme = usuarioFilmeRepository.findById(idAlocacao).get();
    		    	
	    	if(usuarioFilme !=null ) {
		    	try {
		    		Calendar dia = Calendar.getInstance();
		    		usuarioFilme.setDataEntrega(dia);
		    		usuarioFilme = usuarioFilmeRepository.save(usuarioFilme);
		    		return getAllUsuarioFilme(usuarioFilme.getUsuario().getId());
		    	}catch(Exception e) {
		    		//Gerar Log de Erro;
		    	}
	    	}
	    	//Gerar Log de Erro;
	    	return null;
	    	
	    }
	    
	    public UsuarioFilme criaUsuarioFilme(Usuario usuario, Filme filme) {
	    	if(usuario!=null && filme != null) {
	    		UsuarioFilme usuarioFilme = new UsuarioFilme();
	    		usuarioFilme.setUsuario(usuario);
	    		usuarioFilme.setFilme(filme);
	    		Calendar dia = Calendar.getInstance();
	    		usuarioFilme.setDataInicial(dia);
	    		Calendar dias = Calendar.getInstance();
	    		dias.add(Calendar.DAY_OF_MONTH,+7);
	    		usuarioFilme.setDataFinal(dias);
	    		return usuarioFilme;
	    	}
	    	return null;
	    }
	    
	    


	    public void delete(Long id) {
	    	try {
	    		usuarioFilmeRepository.deleteById(id);
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	    }


}
