let barChart;
let pieChart;

function createBarChart(priceRanges, itemCounts) {
    const ctx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: priceRanges,
            datasets: [{
                label: 'Items per Price Range',
                data: itemCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createPieChart(categories, itemCounts) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Items per Category',
                data: itemCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}


function generateRandomData() {
   
    const priceRanges = ['0-100', '101-200', '201-300', '301-400', '401-500'];
    const itemCounts = Array.from({ length: 5 }, () => Mat
    const categories = ['Electronics', 'Books', 'Clothing', 'Toys'];
    const categoryCounts = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));

    return { priceRanges, itemCounts, categories, categoryCounts };
}


function updateCharts() {
    const selectedMonth = document.getElementById('month').value;
    document.getElementById('selected-month').textContent = selectedMonth;

   
    const { priceRanges, itemCounts, categories, categoryCounts } = generateRandomData();

    
    document.getElementById('total-sales').textContent = Math.floor(Math.random() * 10000);
    document.getElementById('sold-items').textContent = Math.floor(Math.random() * 100);
    document.getElementById('not-sold-items').textContent = Math.floor(Math.random() * 100);


    if (barChart) {
        barChart.destroy();
    }
    createBarChart(priceRanges, itemCounts);

    
    if (pieChart) {
        pieChart.destroy();
    }
    createPieChart(categories, categoryCounts);
}


window.onload = function () {
    updateCharts();
};
