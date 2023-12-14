<script>
	import { toasts } from 'svelte-toasts';
	import { selectedPage, subjectsData } from '../store';
	import Papa from 'papaparse';

	let file;

	function handleFileChange(event) {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			file = selectedFile;
		} else {
			file = undefined;
		}
	}

	async function readCSV() {
		if (!file || file === undefined) {
			toasts.error('Por favor, selecciona un archivo CSV.');
			return;
		}

		try {
			const fileData = await file.text();

			const results = Papa.parse(fileData, {
				header: true,
				skipEmptyLines: true,
				dynamicTyping: true
			});

			const data = results.data.filter((row) => {
				// Implementa lógica de filtrado si es necesario
				return true;
			});

			// Agrupar por RFC
			const groupedData = data.reduce((acc, row) => {
				const rfc = row['rfc'];
				if (!acc[rfc]) {
					acc[rfc] = [];
				}
				acc[rfc].push(row);
				return acc;
			}, {});

			subjectsData.set(groupedData);
			selectedPage.set(1); // Subjects
		} catch (error) {
			console.error('Error al leer el archivo CSV:', error);
			toasts.error('Hubo un error al leer el archivo CSV.');
		}
	}
</script>

<h1>CRONOS V3</h1>

<hr />
<br />

<div>
	<label for="formFile" class="form-label">Selecciona el archivo a analizar</label>
	<input
		class="form-control"
		type="file"
		id="formFile"
		accept=".csv"
		on:change={handleFileChange}
	/>
</div>

<br />

<div class="d-flex justify-content-center">
	<button
		class="btn btn-primary"
		style="width: 100%;"
		on:click={() => {
			readCSV();
		}}>Subir</button
	>
</div>

<br />
