package com.pedro.developer.crud.api.dto;



import java.io.Serializable;
import java.util.Calendar;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pedro.developer.crud.domain.entity.Filme;
import com.pedro.developer.crud.domain.entity.Usuario;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UsuarioFilmeDTO implements Serializable{
	


	private static final long serialVersionUID = 8968274712832420599L;

	private Long id;

	private Usuario usuario;

	private Filme filme;
	
	private Calendar dataInicial;
	
	private Calendar dataFinal;
	
	private Calendar dataEntrega;
	
	private int renovado;

	
}
