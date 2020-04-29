package com.pedro.developer.crud.service.service;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedro.developer.crud.api.dto.UsuarioDTO;
import com.pedro.developer.crud.domain.entity.Usuario;
import com.pedro.developer.crud.domain.repository.UsuarioRepository;
import com.pedro.developer.crud.service.converter.UsuarioConverter;



@Service
public class UsuarioService {

		@Autowired
		UsuarioRepository usuarioRepository;
				
		@Autowired
		UsuarioConverter usuarioConverter;
		
	    
	    public List<UsuarioDTO> getAllUsuario() {
	        List<Usuario> usuarios = (List<Usuario>) usuarioRepository.findAll();
	        List<UsuarioDTO> dtos = usuarios.stream().map(s -> usuarioConverter.convertFrom(s))
					.collect(Collectors.toList());
	        
	        return dtos;
	    }

	    public UsuarioDTO getById(Long id) {
	    	UsuarioDTO dto = null;
	        try {
		       dto = usuarioConverter.convertFrom(usuarioRepository.findById(id).get());
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	        return dto;
	    }

	    public void saveOrUpdate(UsuarioDTO usuario) {
	    	try {
	    		usuarioRepository.save(usuarioConverter.convertTo(usuario));
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	    }    


	    public void delete(Long id) {
	    	try {
	    		usuarioRepository.deleteById(id);
	    	}catch(Exception e) {
	    		//Gerar Log de Erro;
	    	}
	    }	  
	

}
