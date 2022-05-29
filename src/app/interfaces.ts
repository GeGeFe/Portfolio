import { TiposFormacion } from "./persona/formacion/tiposformacion";
import { TiposHabilidad } from "./persona/habilidades/tiposhabilidad";

export interface Persona {
    id_persona: number;
    nombre: string;
    apellido: string;
    fecha_Nacimiento: Date;
    banner: string; // Enlace a la imagen del banner.
    avatar: string; // Enlace a la imagen del avatar.
    acerca_de: string;
}

export interface Formacion {
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
    id_proyecto: number;
    nombre: string;
    fecha_Publicacion: Date;
    descripcion: string;
    enlace: string;
    disciplina: Disciplina;
    imagenes: Imagen[];
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

export interface Habilidad {
    id_habilidad: number;
    nombre: string;
    porcentaje: number;
    tipo: TiposHabilidad
}

export interface Imagen {
    id_imagen: number;
    enlace: string;
    posicion: number;
    titulo: string;
}