package com.pedro.developer.crud.api.resource;






import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedro.developer.crud.api.dto.FilmeDTO;
import com.pedro.developer.crud.api.dto.UsuarioDTO;
import com.pedro.developer.crud.api.dto.UsuarioFilmeDTO;
import com.pedro.developer.crud.service.service.UsuarioFilmeService;
import com.pedro.developer.crud.service.service.UsuarioService;

@RestController

@RequestMapping("/api/a")
public class UsuarioController {
	
	@Autowired
    UsuarioService usuarioService;
	
	@Autowired
    UsuarioFilmeService usuarioFilmeService;	
	

    @GetMapping("/usuarios")
    private List<UsuarioDTO> getAllUsuarios() {
        return usuarioService.getAllUsuario();
    }
    
    @GetMapping("/usuario/{id}")
    private UsuarioDTO getUsuario(@PathVariable("id") Long id) {
        return usuarioService.getById(id);
    }

    @DeleteMapping("/usuario/{id}")
    private void deleteUsuario(@PathVariable("id") Long id) {
    	usuarioService.delete(id);
    }

    @PostMapping("/usuario")
    private UsuarioDTO saveUsuario(@RequestBody UsuarioDTO usuario) {
    	usuarioService.saveOrUpdate(usuario);
        return usuario;
    }
    
    @PostMapping("/usuario/{id}/locacao")
    private UsuarioFilmeDTO savelocacao(@PathVariable("id") Long id, @RequestBody FilmeDTO filme) {
    	return usuarioFilmeService.save(id, filme.getId());

    }
    
    @GetMapping("/usuario/locacao/renova/{id}")
    private List<UsuarioFilmeDTO> renovalocacao(@PathVariable("id") Long id) {
    	return usuarioFilmeService.renova(id);
    }
    
    @GetMapping("/usuario/locacao/recebe/{id}")
    private List<UsuarioFilmeDTO> recebelocacao(@PathVariable("id") Long id) {
    	return usuarioFilmeService.recebe(id);
    }
    
    @GetMapping("/usuario/{id}/locacoes")
    private List<UsuarioFilmeDTO> getLocacoes(@PathVariable("id") Long id) {
    	return usuarioFilmeService.getAllUsuarioFilme(id);

    }
    
    @DeleteMapping("/usuario/locacao/{id}")
    private void deleteUsuarioFilme(@PathVariable("id") Long id) {
    	usuarioFilmeService.delete(id);
    }
    

	
	
}
