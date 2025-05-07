package com.seguridad.seguridad.Controladores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.seguridad.seguridad.Modelos.Permiso;
import com.seguridad.seguridad.Modelos.PermisosRoles;
import com.seguridad.seguridad.Modelos.Rol;
import com.seguridad.seguridad.Repositorios.RepositorioPermiso;
import com.seguridad.seguridad.Repositorios.RepositorioPermisosRoles;
import com.seguridad.seguridad.Repositorios.RepositorioRol;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/permisos-roles")
public class ControladorPermisosRoles {
    @Autowired
    private RepositorioPermisosRoles miRepositorioPermisoRoles;

    @Autowired
    private RepositorioPermiso miRepositorioPermiso;

    @Autowired
    private RepositorioRol miRepositorioRol;


    @GetMapping("")
    public List<PermisosRoles> index(){
        return this.miRepositorioPermisoRoles.findAll();
    }

    /**
     * Asignación rol y permiso
     * @param id_rol
     * @param id_permiso
     * @return
     */

    // Anotación que indica que el método maneja solicitudes HTTP POST y devuelve un código de estado 201 (CREATED).
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("rol/{id_rol}/permiso/{id_permiso}")
    public PermisosRoles create(@PathVariable String id_rol,@PathVariable String id_permiso){
        // Crea una nueva instancia de PermisosRoles.
        PermisosRoles nuevo=new PermisosRoles();
        // Obtiene el objeto Rol correspondiente al ID proporcionado.
        Rol elRol=this.miRepositorioRol.findById(id_rol).get();
        // Obtiene el objeto Permiso correspondiente al ID proporcionado.
        Permiso elPermiso=this.miRepositorioPermiso.findById(id_permiso).get();
        // Verifica si ambos objetos (Rol y Permiso) fueron encontrados en la base de datos.
        if (elRol!=null && elPermiso!=null){
            // Establece el Permiso y el Rol en la instancia de PermisosRoles.
            nuevo.setPermiso(elPermiso);
            nuevo.setRol(elRol);
            // Guarda la nueva instancia de PermisosRoles en el repositorio.
            return this.miRepositorioPermisoRoles.save(nuevo);
        }else{
            // Si alguno de los objetos no fue encontrado, devuelve null.
            return null;
        }
    }

    // Anotación que indica que el método maneja solicitudes HTTP GET para obtener detalles de un recurso específico.
    @GetMapping("{id}")
    public PermisosRoles show(@PathVariable String id){
        // Busca un objeto PermisosRoles en el repositorio utilizando el ID proporcionado en la variable de ruta.
        PermisosRoles permisosRolesActual=this.miRepositorioPermisoRoles
                .findById(id)
                .orElse(null);
        // Devuelve el objeto PermisosRoles encontrado o null si no se encontró.
        return permisosRolesActual;
    }

    /**
     * Modificación Rol y Permiso
     * @param id
     * @param id_rol
     * @param id_permiso
     * @return
     */

// Anotación que indica que el método maneja solicitudes HTTP PUT para actualizar un recurso específico.
    @PutMapping("{id}/rol/{id_rol}/permiso/{id_permiso}")
    public PermisosRoles update(@PathVariable String id,@PathVariable String id_rol,@PathVariable String id_permiso){
        // Busca un objeto PermisosRoles en el repositorio utilizando el ID proporcionado en la variable de ruta.
        PermisosRoles permisosRolesActual=this.miRepositorioPermisoRoles
                .findById(id)
                .orElse(null);
        // Obtiene los objetos Rol y Permiso correspondientes a los IDs proporcionados en las variables de ruta.
        Rol elRol=this.miRepositorioRol.findById(id_rol).get();
        Permiso elPermiso=this.miRepositorioPermiso.findById(id_permiso).get();
        // Verifica si los objetos necesarios fueron encontrados en la base de datos.
        if(permisosRolesActual!=null && elPermiso!=null && elRol!=null){
            // Actualiza los objetos Rol y Permiso en el objeto PermisosRoles actual.
            permisosRolesActual.setPermiso(elPermiso);
            permisosRolesActual.setRol(elRol);
            // Guarda el objeto PermisosRoles actualizado en el repositorio.
            return this.miRepositorioPermisoRoles.save(permisosRolesActual);
        }else{
            // Si alguno de los objetos no fue encontrado, devuelve null.
            return null;
        }
    }

    // Anotación que indica que el método maneja solicitudes HTTP DELETE y devuelve un código de estado 204 (NO_CONTENT).
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        // Busca un objeto PermisosRoles en el repositorio utilizando el ID proporcionado en la variable de ruta.
        PermisosRoles permisosRolesActual=this.miRepositorioPermisoRoles
                .findById(id)
                .orElse(null);
        // Verifica si el objeto PermisosRoles fue encontrado en la base de datos.
        if (permisosRolesActual!=null){
            // Elimina el objeto PermisosRoles del repositorio.
            this.miRepositorioPermisoRoles.delete(permisosRolesActual);
        }
    }

    // Anotación que indica que el método maneja solicitudes HTTP GET para validar un permiso asociado a un rol.
    @GetMapping("validar-permiso/rol/{id_rol}")
    public PermisosRoles getPermiso(@PathVariable String id_rol,
                                    @RequestBody Permiso infoPermiso){
        // Busca un objeto Permiso en el repositorio utilizando la URL y el método proporcionados en el cuerpo de la solicitud.
        Permiso elPermiso=this.miRepositorioPermiso
                .getPermiso(infoPermiso.getUrl(),
                        infoPermiso.getMetodo());
        // Obtiene el objeto Rol correspondiente al ID proporcionado en la variable de ruta.
        Rol elRol=this.miRepositorioRol.findById(id_rol).get();
        // Verifica si tanto el objeto Permiso como el objeto Rol fueron encontrados en la base de datos.
        if (elPermiso!=null && elRol!=null){
            // Busca y devuelve un objeto PermisosRoles que relaciona el Rol y el Permiso.
            return this.miRepositorioPermisoRoles.getPermisoRol(elRol.get_id(),
                            elPermiso.get_id());
        }else{
            // Si alguno de los objetos no fue encontrado, devuelve null.
            return null;
        }
    }

}

