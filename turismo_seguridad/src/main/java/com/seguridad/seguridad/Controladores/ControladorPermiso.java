package com.seguridad.seguridad.Controladores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.seguridad.seguridad.Modelos.Permiso;
import com.seguridad.seguridad.Repositorios.RepositorioPermiso;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/permisos")
public class ControladorPermiso {
    @Autowired
    private RepositorioPermiso miRepositorioPermiso;

    @GetMapping("")
    public List<Permiso> index(){
        return this.miRepositorioPermiso.findAll();
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Permiso create(@RequestBody  Permiso infoPermiso){
        return this.miRepositorioPermiso.save(infoPermiso);
    }

    // Anotación que indica que el método maneja solicitudes HTTP GET para obtener detalles de un permiso específico.
    @GetMapping("{id}")
    public Permiso show(@PathVariable String id){
        // Busca un objeto Permiso en el repositorio utilizando el ID proporcionado en la variable de ruta.
        Permiso permisoActual=this.miRepositorioPermiso
                .findById(id)
                .orElse(null);

        // Devuelve el objeto Permiso encontrado o null si no se encontró.
        return permisoActual;
    }

    // Anotación que indica que el método maneja solicitudes HTTP PUT para actualizar un permiso existente.
    @PutMapping("{id}")
    public Permiso update(@PathVariable String id,@RequestBody  Permiso infoPermiso){
        // Busca un objeto Permiso en el repositorio utilizando el ID proporcionado en la variable de ruta.
        Permiso permisoActual=this.miRepositorioPermiso
                .findById(id)
                .orElse(null);
        // Verifica si el objeto Permiso fue encontrado en la base de datos.
        if(permisoActual!=null){
            // Actualiza los datos del objeto Permiso con la información proporcionada en el cuerpo de la solicitud.
            permisoActual.setMetodo(infoPermiso.getMetodo());
            permisoActual.setUrl(infoPermiso.getUrl());
            // Guarda el objeto Permiso actualizado en el repositorio.
            return this.miRepositorioPermiso.save(permisoActual);
        }else{
            // Si el objeto no fue encontrado, devuelve null.
            return null;
        }

    }

    // Anotación que indica que el método maneja solicitudes HTTP DELETE y devuelve un código de estado 204 (NO_CONTENT).
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        // Busca un objeto Permiso en el repositorio utilizando el ID proporcionado en la variable de ruta.
        Permiso permisoActual=this.miRepositorioPermiso
                .findById(id)
                .orElse(null);
        // Verifica si el objeto Permiso fue encontrado en la base de datos.
        if (permisoActual!=null){
            // Elimina el objeto Permiso del repositorio.
            this.miRepositorioPermiso.delete(permisoActual);
        }
    }
}
