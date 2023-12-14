<script>
	import { subjectsData } from "../store";

    export let subjectKey;
	let subject = $subjectsData[subjectKey];
	console.log("SUBJJECT", subject);
	let initialData = ($subjectsData[subjectKey])[0];
	console.log("INITIAL DATA", initialData);
</script>



<div class="table-responsive-sm">

    <table class="table ">
        <tr>
            <th colspan="3"></th>
            <th colspan="3">INICIO</th>
            <th colspan="3">TERMINO</th>
            <th colspan="4"></th>
            <th colspan="3">HORAS</th>
            <th colspan="2"></th>
        </tr>
        <tr style="text-align:center;">
            <th>Mov.</th>
            <th>Causa</th>
            <th>Categoría</th>
            <th>D</th>
            <th>M</th>
            <th>A</th>
            <th>D</th>
            <th>M</th>
            <th>A</th>
            <th>Plan</th>
            <th>CVE <br />Asig.</th>
            <th>Nombre <br /> Asignatura / Actividad</th>
            <th>Grupo</th>
            <th>Teo.</th>
            <th>Prác.</th>
            <th>Tot.</th>
            <th>Horario</th>
            <th>Salón</th>
        </tr>

        {#each subject as rowData }
        <tr>
            <td>{rowData.tipo}</td>
            <td>{rowData.causa}</td>
            <td>{rowData.categoria}</td>
            <td>{rowData.diaIni}</td>
            <td>{rowData.mesIni}</td>
            <td>{rowData.anoIni}</td>
            <td>{rowData.diaFin}</td>
            <td>{rowData.mesFin}</td>
            <td>{rowData.anoFin}</td>
            <td>{rowData.planEstudios}</td>
            <td>{rowData.cveAsignatura}</td>
            <td>{rowData.nombreAsignatura}</td>
            <td class="thCentrado">{rowData.grupo}</td>
            <td class="thCentrado">{rowData.horasTeoricas || 0}</td>
            <td class="thCentrado">{rowData.horasPracticas || 0}</td>
            <td class="thCentrado">{rowData.horasTotal || 0}</td>
            <td class="thCentrado">{rowData.horario}</td>
            <!--<td class="thCentrado">{subject.horario}Lu,Mi <br />17:00-18:30 <br />17:00-18:30</td>-->
            <td class="thCentrado">{rowData.salon}</td>
        </tr>
        {/each}
        
        
        <!--<tr>
            <td colspan="9"></td>
            <td style="text-align: right;" colspan="3" class="filaTotales"><strong>Totales:</strong> </td>
            <td></td>
            <td class="thCentrado filaTotales">{initialData.horasTeoricasTotal || 0 }</td>
            <td class="thCentrado filaTotales">{initialData.horasPracticasTotal || 0 }</td>
            <td class="thCentrado filaTotales">{initialData.horasTotalTotal || 0 }</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <td colspan="18" class="filaTotales" style="text-align: left;" >Observaciones: {initialData.observaciones  } </td>
        </tr>-->
    </table>
</div>



<style>
    .table {
        /* Estilos de tu tabla aquí */
        border-collapse: collapse;
        font-size: 8px;
        width: 100%;
    }

    .table th, .table td {
        border: 2px solid #aacfd3;
        padding: 4px;
        text-align: center;
    }

    th {
        background-color: #96b5e4;
    }

    .thCentrado {
        text-align: center;
    }

    .filaTotales {
        background-color: #DEDEDE;
    }


    
</style>