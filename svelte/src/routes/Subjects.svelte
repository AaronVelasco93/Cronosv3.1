<script>
	import { selectedPage, subjectsData } from '../store';
	import SubjectTable from './SubjectTable.svelte';
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import SubjectPdf from './SubjectPDF.svelte';
	import { scale } from 'svelte/transition';

	let showProgress = false;
	let progress = 0;
	let totalFiles = 0;
	let currentFile = 0;

	function openModal(total) {
		totalFiles = total;
		showProgress = true;
	}

	function closeModal() {
		showProgress = false;
	}

	function updateProgress() {
		currentFile++;
		progress = (currentFile / totalFiles) * 100;

		if (currentFile === totalFiles) {
			closeModal();
		}
	}

	async function generatePDF() {
		const scaleFactor = 1;
		const containers = document.querySelectorAll('.pdf-container');
		const batchSize = 50;
		const totalContainers = containers.length;

		openModal(totalContainers);

		let pageIndex = 0;

		for (let i = 0; i < containers.length; i += batchSize) {
			const doc = new jsPDF('landscape');
			for (let j = i; j < Math.min(i + batchSize, containers.length); j++) {
				const container = containers[j];
				const contentWidth = container.offsetWidth;

				if (contentWidth > doc.internal.pageSize.getWidth()) {
					container.style.transform = `scale(${scaleFactor})`;
					container.style.transformOrigin = '0 0';
				}

				const contentImage = await html2canvas(container, {
					scale: 2,
					useCORS: true,
					allowTaint: true,
					dpi: 144
				});

				const contentDataURL = contentImage.toDataURL('image/png');

				doc.addImage(
					contentDataURL,
					'PNG',
					0,
					0,
					doc.internal.pageSize.getWidth(),
					doc.internal.pageSize.getHeight()
				);

				if (j !== containers.length - 1) {
					doc.addPage();
				}

				updateProgress();
			}

			doc.save(`subjects_data_${pageIndex + 1}.pdf`);
			pageIndex++;
		}
	}
</script>

<br />
<hr />
<div class="d-flex justify-content-between">
	<h1>PROPUESTAS</h1>

	<div class="d-flex align-items-center">
		<button
			class="btn btn-danger"
			style="margin-right: 8px;"
			on:click={() => {
				selectedPage.set(0);
			}}
		>
			Regresar <i class="bi bi-x-square"></i>
		</button>

		<button
			class="btn btn-success"
			on:click={() => {
				generatePDF();
			}}
		>
			Descargar <i class="bi bi-file-earmark-arrow-down"></i>
		</button>
	</div>
</div>
<hr />
<br />

<div>
	{#each Object.keys($subjectsData) as subjectKey}
		<div class="d-flex justify-content-center pdf-container">
			<SubjectPdf {subjectKey} />
		</div>

		<br />
		<br />
	{/each}
</div>

{#if showProgress}
	<div class="modal" tabindex="-1" role="dialog" style="display: block;">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Procesando archivos PDF</h5>
					<!--<button type="button" class="close" on:click={closeModal}>
						<span>&times;</span>
					</button>-->
				</div>
				<div class="modal-body">
					<div class="progress">
						<div
							class="progress-bar"
							role="progressbar"
							style="width: {progress.toFixed()}%"
							aria-valuenow={progress.toFixed()}
							aria-valuemin="0"
							aria-valuemax="100"
						>
							{progress.toFixed()}%
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.pdf-container {
		max-width: 100%; /* Limita el ancho del contenedor al ancho de la página */
		max-height: 100%; /* Limita la altura del contenedor al alto de la página */
		overflow: hidden; /* Oculta el contenido que se desborde */
	}
</style>
