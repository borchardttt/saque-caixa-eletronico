document.addEventListener("DOMContentLoaded", function () {
	const botoesTeclado = document.querySelectorAll(".btn-teclado");
	const inputValorSaque = document.getElementById("valor-saque");
	const btnConfirmar = document.getElementById("btn-confirmar");
	const btnLimpar = document.getElementById("btn-limpar");

	let valorDigitado = "";

	botoesTeclado.forEach(botao => {
			botao.addEventListener("click", function () {
					valorDigitado += botao.textContent;
					inputValorSaque.value = formatarMoeda(valorDigitado);
			});
	});

	btnLimpar.addEventListener("click", function () {
			valorDigitado = "";
			inputValorSaque.value = "";
	});

	btnConfirmar.addEventListener("click", function () {
			const valor = parseFloat(valorDigitado);

			if (valor >= 10 && valor <= 600) {
					mostrarConfirmacao(valor);
			} else {
					Swal.fire("Valor Inválido", "O valor do saque deve estar entre R$10 e R$600", "error");
			}
	});

	function formatarMoeda(valor) {
			return `R$${parseFloat(valor).toFixed(2)}`;
	}

	function mostrarConfirmacao(valor) {
			Swal.fire({
					title: "Confirmar Saque",
					text: `Deseja sacar ${formatarMoeda(valor)}?`,
					icon: "question",
					showCancelButton: true,
					confirmButtonText: "Sim",
					cancelButtonText: "Cancelar"
			}).then((result) => {
					if (result.isConfirmed) {
							calcularNotas(valor);
					}
			});
	}

	function calcularNotas(valor) {
			const notasDisponiveis = [100, 50, 20, 10, 5, 2];
			let valorRestante = valor;
			let resultado = {};

			notasDisponiveis.forEach(nota => {
					if (valorRestante >= nota) {
							const quantidadeNotas = Math.floor(valorRestante / nota);
							resultado[nota] = quantidadeNotas;
							valorRestante -= quantidadeNotas * nota;
					}
			});

			let textoNotas = "";
			for (const nota in resultado) {
					if (resultado.hasOwnProperty(nota)) {
							textoNotas += `${resultado[nota]} nota(s) de R$${nota}, `;
					}
			}

			mostrarResultado(textoNotas);
	}

	function mostrarResultado(textoNotas) {
			Swal.fire(
					"Saque realizado!",
					`Você receberá: ${textoNotas}`,
					"success"
			);
	}
});
