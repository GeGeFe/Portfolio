export interface Persona {
    idPersona: number;
    Nombre: string;
    Apellido: string;
    Fecha_Nacimiento: Date;
    Banner: string; // Enlace a la imagen del banner.
    Avatar: string; // Enlace a la imagen del avatar.
    Acerca_de: string
}

export interface Formacion {
    idFormacion: number;
    //  Tipo: Ver que equivalente se puede usar para el tipo set de la base de datos. 
    Titulo: string;
    Fecha_Inicio: Date;
    Fecha_Final: Date;
    Logo: string;   // Enlace a la imagen del logo.
    Institucion: string
}

export interface Disciplina {
    idDisciplina: number;
    Nombre: string
}

export interface Proyecto {
    idProyecto: number;
    Nombre: string;
    Fecha: Date;
    Descripcion: string;
    Enlace: string;
    Disciplina: Disciplina
}

export interface Experiencia {
    idExperiencia: number;
    Puesto: string;
    Fecha_Inicio: Date;
    Fecha_Final: Date;
    Logo_Empresa: string;
    Descrip_tareas: string;
    Nombre_Empresa: string;
    Disciplina: Disciplina
}