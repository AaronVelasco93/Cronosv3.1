<script>
	import { selectedPage, subjectsData } from '../store';
	import SubjectTable from './SubjectTable.svelte';
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import SubjectPdf from './SubjectPDF.svelte';
	import { scale } from 'svelte/transition';

	async function generatePDF() {
		const scaleFactor = 0.285;

		const doc = new jsPDF('landscape'); // Establecer orientación horizontal
		const pageWidth = doc.internal.pageSize.getWidth(); // Ancho de página menos márgenes
		const containerContent = document.querySelectorAll('.pdf-container')[0].innerHTML;

		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = containerContent;
		document.body.appendChild(tempDiv);

		const contentWidth = tempDiv.offsetWidth;
		if (contentWidth > pageWidth) {
			tempDiv.style.transform = `scale(${scaleFactor})`;
			tempDiv.style.transformOrigin = '0 0'; // Ajustar el punto de transformación
		}

		const contentPerPage = []; // Almacenar contenido por página
		let yPosition = 0;
		let currentPage = 1;

		// Dividir el contenido en páginas
		while (yPosition < tempDiv.offsetHeight) {
			const clone = tempDiv.cloneNode(true);
			clone.style.height = `${doc.internal.pageSize.getHeight()}px`;
			clone.style.overflow = 'hidden';
			clone.style.display = 'block';

			clone.style.transform = `scale(${scaleFactor}) translateY(-${yPosition}px)`;
			clone.style.transformOrigin = '0 0';

			contentPerPage.push(clone.outerHTML);

			yPosition += doc.internal.pageSize.getHeight();
			currentPage++;
		}

		document.body.removeChild(tempDiv);

		// Agregar el contenido a cada página del PDF
		contentPerPage.forEach((content, index) => {
			doc.addPage();
			doc.html(content, {
				x: 0,
				y: 0,
				callback: () => {
					if (index === contentPerPage.length - 1) {
						doc.save('subject_data.pdf');
					}
				}
			});
		});
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
				generatePDF($subjectsData[0]);
			}}
		>
			Descargar <i class="bi bi-file-earmark-arrow-down"></i>
		</button>
	</div>
</div>
<hr />
<br />

<div>
	{#each $subjectsData as subject}
		<div class="d-flex justify-content-center pdf-container">
			<SubjectPdf {subject} />
		</div>

		<br />
		<br />
	{/each}
</div>

<style>
	.pdf-container {
		max-width: 100%; /* Limita el ancho del contenedor al ancho de la página */
		max-height: 100%; /* Limita la altura del contenedor al alto de la página */
		overflow: hidden; /* Oculta el contenido que se desborde */
	}
</style>
