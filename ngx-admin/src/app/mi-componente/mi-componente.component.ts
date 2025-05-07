// Importaciones necesarias desde Angular
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  // Selector del componente para su uso en plantillas HTML
  selector: "app-mi-componente",
  // Plantilla del componente que define su estructura
  template: `
    <div>
      <!-- IFrame para mostrar el sitio web con la URL segura -->
      <iframe
        [src]="sitioWebUrl"
        width="100%"
        height="100%"
        style="border: 0;"
      ></iframe>
    </div>
  `,
  // Estilos CSS aplicados al componente
  styles: [
    `
      div {
        overflow: auto; /* Permite desplazamiento vertical si el contenido excede la altura */
        height: 100vh; /* 100% de la altura de la ventana visible */
      }

      iframe {
        display: block; /* Configuración para mostrar el iframe como bloque */
        width: 100%; /* 100% del ancho del contenedor */
        height: 100%; /* 100% de la altura del contenedor */
      }
    `,
  ],
})
export class MiComponenteComponent {
  // Variable para almacenar la URL segura del sitio web
  sitioWebUrl: SafeResourceUrl;
  // Constructor del componente, recibe el servicio DomSanitizer para manipular URLs seguras
  constructor(private sanitizer: DomSanitizer) {
    // Sanitizar la URL para marcarla como segura y prevenir ataques
    this.sitioWebUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://turismo13.mydurable.com/?pt=NjU3MzhjMTRhOWFkZmQyODU0MjBkZTdlOjE3MDIwNzIwODkuMjE3OnByZXZpZXc=#"
    );
  }
}
