import { Disciplina, iFormacion } from "src/app/interfaces";
import { TiposFormacion } from "./tiposformacion";

export class Formacion implements Formacion{
    id_educacion!:number;
    tipo!:TiposFormacion;
    titulo!: string;
    fecha_Inicio!:Date;
    fecha_Final!: Date;
    logo!: string;
    institucion!: string;
    disciplina!: Disciplina;
    constructor(idEducacion: number, tipo: TiposFormacion, titulo: string, fecha_Inicio: Date, fecha_Final: Date, logo: string, institucion: string, disciplina: Disciplina) {
        this.id_educacion = idEducacion;
        this.tipo = tipo;
        this.titulo = titulo;
        this.fecha_Inicio = fecha_Inicio;
        this.fecha_Final = fecha_Final;
        this.logo = logo;
        this.institucion = institucion;
        this.disciplina = disciplina;
    }
}