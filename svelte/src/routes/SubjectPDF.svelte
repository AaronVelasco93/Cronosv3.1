<script>
	import { selectedPage, subjectsData } from '../store';
	import SubjectTable from './SubjectTable.svelte';

	export let subjectKey;
	let subject = $subjectsData[subjectKey];
	console.log('SUBJJECT', subject);
	let initialData = $subjectsData[subjectKey][0];
	console.log('INITIAL DATA', initialData);
</script>

<div class="contenedorCarta">
	<div id="content" style="height: 100%;" class="d-flex flex-column justify-content-between">
		<div class="docHeader">
			<div class="row">
				<div class="col-3">
					<div><img src="unam-logo.png" style="max-width: 150px;" alt="Logo UNAM" /></div>
				</div>

				<div class="col-6">
					<div class="docHeader">UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO</div>
					<div class="docHeader">FACULTAD DE ESTUDIOS SUPERIORES ARAGÓN</div>
					<div class="docHeader">FORMA DE MOVIMIENTOS DE PERSONAL ACADÉMICO</div>
					<div class="docHeader">PERIODO ESCOLAR 2024-I</div>
				</div>

				<div class="col-3">
					<div><img src="rh-unam.png" style="max-width: 250px;" alt="RH UNAM" /></div>
				</div>
			</div>

			<br />

			<!-- First table with career area and responsible unit -->
			<div class="row tableCareer">
				<div class="col blue-border">
					CARRERA O ÁREA:<strong> INGENIERIA EN COMPUTACION</strong>
				</div>

				<div class="col blue-border">
					UNIDAD RESPONSABLE: DIVISION DE CIENCIAS FISICO MATEMATICAS Y LAS INGENIERIAS - 0
				</div>
			</div>

			<br />

			<div class="tableContainer">
				<SubjectTable {subjectKey} />
			</div>
		</div>

		<div class="footer">
			<div class="table-responsive-sm">
				<table class="table">
					<tr class="invisible">
						<th colspan="3"></th>
						<th colspan="3">INICIO</th>
						<th colspan="3">TERMINO</th>
						<th colspan="4"></th>
						<th colspan="3">HORAS</th>
						<th colspan="2"></th>
					</tr>
					<tr style="text-align:center;" class="invisible">
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

					{#each subject as rowData}
						<tr class="invisible">
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

					<tr>
						<td colspan="9"></td>
						<td style="text-align: right; border:1px solid #000" colspan="3" class="filaTotales"
							><strong>Totales:</strong>
						</td>
						<td></td>
						<td class="thCentrado filaTotales" style=" border:1px solid #000">{initialData.horasTeoricasTotal || 0}</td>
						<td class="thCentrado filaTotales" style=" border:1px solid #000">{initialData.horasPracticasTotal || 0}</td>
						<td class="thCentrado filaTotales" style=" border:1px solid #000">{initialData.horasTotalTotal || 0}</td>
						<td colspan="2"></td>
					</tr>
					<tr>
						<td colspan="18" style="text-align: left; width: 100%;">
						
						</td>
					</tr>
					<tr>
						<td colspan="18" class="filaTotales" style="text-align: left; width: 100%; border:1px solid #000"
							>Observaciones: {initialData.observaciones || ''}
						</td>
					</tr>
				</table>
			</div>

			<br />

			<div>
				<div class="d-flex justify-content-center">
					Nezahualcóyotl, Estado de México, a 23 de Noviembre del 2023
				</div>
				<div class="d-flex justify-content-center">
					<strong> "POR MI RAZA HABLARÁ EL ESPÍRITU"</strong>
				</div>
			</div>

			<br />
			<br />

			<div class="d-flex justify-content-between">
				<div class="">
					<div class="d-flex justify-content-center">CONFORMIDAD INTERESADO(A)</div>

					<br />
					<br />
					<br />

					<div class="d-flex justify-content-center">
						________________________________________________
					</div>

					<div class="d-flex justify-content-center">{initialData.profesor}</div>
				</div>

				<div class="">
					<div class="d-flex justify-content-center">JEFE DE CARRERA</div>

					<br />
					<br />
					<br />

					<div class="d-flex justify-content-center">
						________________________________________________
					</div>

					<div class="d-flex justify-content-center">ING. JORGE ARTURO LOPEZ HERNANDEZ</div>
				</div>

				<div class="">
					<div class="d-flex justify-content-center">SELLO Y FIRMA DE RECIBIDO</div>

					<br />
					<br />
					<br />

					<div class="d-flex justify-content-center">
						________________________________________________
					</div>

					<div class="d-flex justify-content-center">DEPTO. DE RECURSOS HUMANOS</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.contenedorCarta {
		height: 8.5in; /* Ancho de una hoja carta */
		width: 11in; /* Alto de una hoja carta */
		border: 1px solid #b6b6b6;
		padding: 32px;
	}

	.tableCareer {
		font-size: 10px;
	}

	.blue-border {
		border: 2px solid #aacfd3;
	}

	.docHeader {
		text-align: center;
		font-size: 16px;
		font-weight: bold;
	}

	.footer {
		font-size: 12px;
	}

	.table {
		/* Estilos de tu tabla aquí */
		border-collapse: collapse;
		font-size: 8px;
		width: 100%;
	}

	.table th,
	.table td {
		
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
		background-color: #dedede;
	}

	.invisible {
		visibility: collapse;
	}
</style>
