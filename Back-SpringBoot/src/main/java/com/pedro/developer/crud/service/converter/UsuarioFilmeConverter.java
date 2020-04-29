package com.pedro.developer.crud.service.converter;



import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.pedro.developer.crud.api.dto.UsuarioFilmeDTO;
import com.pedro.developer.crud.domain.entity.UsuarioFilme;

import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;

@Component
public class UsuarioFilmeConverter {
	
	MapperFactory mapperFactory = new DefaultMapperFactory.Builder().mapNulls(false).build();
	MapperFacade mapper;
	public UsuarioFilmeConverter() {
		
		mapperFactory.classMap(UsuarioFilme.class, UsuarioFilmeDTO.class).byDefault().register();
		
		mapper = mapperFactory.getMapperFacade();
		
	}
	
	public UsuarioFilmeDTO convertFrom(UsuarioFilme usuarioFilme) {
		return mapper.map(usuarioFilme, UsuarioFilmeDTO.class);
	}
	
	public UsuarioFilme convertTo(UsuarioFilmeDTO usuarioFilmeDTO) {
		return mapper.map(usuarioFilmeDTO, UsuarioFilme.class);
	}
	
	public ArrayList<UsuarioFilme> convertAllTo(ArrayList<UsuarioFilmeDTO> usuarioFilmeDTO) {
		return (ArrayList<UsuarioFilme>) mapper.mapAsList(usuarioFilmeDTO, UsuarioFilme.class);
	}
	
	public ArrayList<UsuarioFilmeDTO> convertAllFrom(ArrayList<UsuarioFilme> usuarioFilme) {
		return (ArrayList<UsuarioFilmeDTO>)mapper.mapAsList(usuarioFilme, UsuarioFilmeDTO.class);
	}

}
