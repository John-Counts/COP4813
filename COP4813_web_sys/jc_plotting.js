const rho = 0.9982;
const c = 0.99;
let chart = null;

function plot_chart() {
	let a1 = parseFloat(document.getElementById('a1').value);
	let a2 = parseFloat(document.getElementById('a2').value);
	let min_q = parseFloat(document.getElementById('min_q').value);
	let max_q = parseFloat(document.getElementById('max_q').value);
	
	if (isNaN(a1) || isNaN(a2) || isNaN(min_q) || isNaN(max_q)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }
    if (a2 >= a1) {
        alert("Invalid Geometry: Throat area (a2) must be smaller than inlet area (a1) for a Venturi meter.");
        return;
    }
    if (max_q <= min_q) {
        alert("Invalid Flow Range: Q maximum must be strictly greater than Q minimum.");
        return;
    }
	
	let steps = 50;
	let delta_q = (max_q - min_q) / steps;
	let labels = [];
	let data_points_primary = [];
	let data_points_alt = [];
	let a2_alt = a2 * 0.8;
	for (let i = 0; i <= steps; i++) {
		let q_val = min_q + (i * delta_q);
		if (i === steps) q_val = max_q;
		labels.push(Math.round(q_val * 100) / 100);
		let dp1 = calculate(a1, a2, q_val);
		data_points_primary.push(Math.round(dp1 * 100) / 100);
		let dp2 = calculate(a1, a2_alt, q_val);
		data_points_alt.push(Math.round(dp2 * 100) / 100);
	}
	const canvas_context = document.getElementById('plot').getContext('2d');
	if (chart) {
		chart.data.labels = labels;
		chart.data.datasets[0].data = data_points_primary;
		chart.data.datasets[1].data = data_points_alt;
		chart.update();
	} else {
		chart = new Chart(canvas_context, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: `current throat (a2 = ${a2})`,
						data: data_points_primary,
						borderColor: 'red',
						borderWidth: 2,
						tension: 0.3,
						fill: false,
						pointRadius: 0,
						pointHoverRadius: 6,
						pointBackgroundColor: 'darkred'
					},
					{
						label: `tightened throat (a2 = ${Math.round(a2_alt * 100) / 100})`,
						data: data_points_alt,
						borderColor: 'blue',
						borderWidth: 2,
						borderDash: [5, 5],
						tension: 0.3,
						fill: false,
						pointRadius: 0,
						pointHoverRadius: 6,
						pointBackgroundColor: 'darkblue'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					mode: 'nearest',
					intersect: false
				},
				plugins: {
					tooltip: {
						callbacks: {
							title: function(tooltipItems) {
								return `Flow Rate (Q): ${tooltipItems[0].label} cm³/s`;
							},
							label: function(context) {
								let value = context.parsed.y || 0;
								return ` Pressure Diff (Delta P): ${value} Pa`;
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: false,
						title: {
							display: true,
							text: 'Delta P (Pa)'
						}
					},
					x: {
						title: {
							display: true,
							text: 'Flow Rate, Q (cm³/s)'
						},
						ticks: {
							autoSkip: true,
							maxTicksLimit: 12
						}
					}
				}
			}
		});
	}
}

function calculate(a1, a2, q) {
	return (rho * q**2 * (1 - (a2 / a1)**2) / (2 * c**2 * a2**2)) / 10;
}

