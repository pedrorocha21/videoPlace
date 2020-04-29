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
import com.pedro.developer.crud.api.dto.UsuarioFilmeDTO;
import com.pedro.developer.crud.service.service.FilmeService;
import com.pedro.developer.crud.service.service.UsuarioFilmeService;

@RestController

@RequestMapping("/api/a")
public class FilmeController {
	
	@Autowired
    FilmeService filmeService;
	
	@Autowired
    UsuarioFilmeService usuarioFilmeService;	

    @GetMapping("/filmes")
    private List<FilmeDTO> getAllTools() {
        return filmeService.getAllFilme();
    }
    
    @GetMapping("/filme/{id}")
    private FilmeDTO getFilme(@PathVariable("id") Long id) {
        return filmeService.getById(id);
    }

    @DeleteMapping("/filme/{id}")
    private void deleteTool(@PathVariable("id") Long id) {
    	filmeService.delete(id);
    }

    @PostMapping("/filme")
    private FilmeDTO saveTool(@RequestBody FilmeDTO filme) {
    	filmeService.saveOrUpdate(filme);
        return filme;
    }
    
    @GetMapping("/filme/{id}/locacoes")
    private List<UsuarioFilmeDTO> getLocacoes(@PathVariable("id") Long id) {
    	return usuarioFilmeService.getAllUsuarioFilmeByFilme(id);

    }
    

	
	
}
