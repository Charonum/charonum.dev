document.addEventListener('DOMContentLoaded', () => {
    fetch('/coms/data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('project-name').textContent = data.PROJECT_NAME;
            document.getElementById('deadline').textContent = formatDate(new Date(data.DLINE));
            document.getElementById('estimation').textContent = formatDate(new Date(data.EST));

            const deadlineDate = new Date(data.DLINE);
            const estimationDate = new Date(data.EST);

            let scheduleStatusText;
            let scheduleDifference;

            if (estimationDate < deadlineDate) {
                scheduleDifference = Math.ceil((deadlineDate - estimationDate) / (1000 * 60 * 60 * 24));
                scheduleStatusText = `Ahead of schedule by ${scheduleDifference} days`;
            } else {
                scheduleDifference = Math.ceil((estimationDate - deadlineDate) / (1000 * 60 * 60 * 24));
                scheduleStatusText = `Behind schedule by ${scheduleDifference} days`;
            }

            document.getElementById('schedule-status').textContent = scheduleStatusText;

            const completionList = document.getElementById('completion-list');
            for (let item in data.COMPL) {
                let listItem = document.createElement('li');
                listItem.textContent = `${item}: ${data.COMPL[item]}`;
                completionList.appendChild(listItem);
            }

            drawPieChart(data.PIE);
        });
});

function formatDate(date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function drawPieChart(pieData) {
    const ctx = document.getElementById('pie-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(pieData),
            datasets: [{
                data: Object.values(pieData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                }
            }
        }
    });
}
