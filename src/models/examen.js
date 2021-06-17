export class Expediente{
    constructor(
        idSolicitudExamen,
        fechaIngreso,
        paciente,
        medico,
        detalleSolicitudExamenes
    ){
        this.idSolicitudExamen=idSolicitudExamen;
        this.fechaIngreso=fechaIngreso;
        this.paciente=paciente;
        this.medico=medico;
        this.detalleSolicitudExamenes=detalleSolicitudExamenes;
    }
}