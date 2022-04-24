export interface Persona {
    idPersona: number;
    Nombre: string;
    Apellido: string;
    Fecha_Nacimiento: Date;
    Banner: string; // Enlace a la imagen del banner.
    Avatar: string; // Enlace a la imagen del avatar.
    Acerca_de: string;
}

export interface Formacion {
    idFormacion: number;
    //  Tipo: Ver que equivalente se puede usar para el tipo set de la base de datos. 
    titulo: string;
    fecha_Inicio: Date;
    fecha_Final: Date;
    logo: string;   // Enlace a la imagen del logo.
    institucion: string
    disciplina: Disciplina // Si pongo Disciplina no funciona
}

export interface Disciplina {
    id_disciplina: number;
    nombre: string
}

export interface Proyecto {
    idProyecto: number;
    nombre: string;
    fecha: Date;
    descripcion: string;
    enlace: string;
    disciplina: Disciplina
}

export interface Experiencia {
    idExperiencia: number;
    puesto: string;
    fecha_Inicio: Date;
    fecha_Final: Date;
    logo_Empresa: string;
    descrip_tareas: string;
    nombre_Empresa: string;
    disciplina: Disciplina
}