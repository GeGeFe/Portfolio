import { TiposFormacion } from "./persona/formacion/tiposformacion";

export interface Persona {
    idPersona: number;
    Nombre: string;
    Apellido: string;
    Fecha_Nacimiento: Date;
    Banner: string; // Enlace a la imagen del banner.
    Avatar: string; // Enlace a la imagen del avatar.
    Acerca_de: string;
}

export interface iFormacion {
    id_educacion: number;
    tipo: TiposFormacion 
    titulo: string;
    fecha_Inicio: Date;
    fecha_Final: Date;
    logo: string;   // Enlace a la imagen del logo.
    institucion: string
    disciplina: Disciplina
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
    id_experiencia: number;
    puesto: string;
    fecha_Inicio: Date;
    fecha_Final: Date;
    logo_Empresa: string;
    descripcion_Tareas: string;
    nombre_Empresa: string;
    disciplina: Disciplina
}