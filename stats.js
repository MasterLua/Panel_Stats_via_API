const apiKey = "RedouuOnTOP";

function updateStatistics() {
    Promise.all([
        fetch(`http://51.81.42.10:2334/cpu_usage?key=${apiKey}`).then(res => res.json()),
        fetch(`http://51.81.42.10:2334/mem_usage?key=${apiKey}`).then(res => res.json()),
        fetch(`http://51.81.42.10:2334/disk_usage?key=${apiKey}`).then(res => res.json()),
        fetch(`http://51.81.42.10:2334/net_usage?key=${apiKey}`).then(res => res.json())
    ])
    .then(([cpuData, memData, diskData, netData]) => {
        if (!cpuData.error) {
            document.getElementById('cpu-usage').textContent = `Utilisation CPU: ${cpuData.cpu_usage}% (Libre: ${cpuData.cpu_free}%)`;
        } else {
            document.getElementById('cpu-usage').textContent = cpuData.error;
        }

        if (!memData.error) {
            document.getElementById('memory-usage').textContent = `Mémoire: ${memData.mem_usage}% (Utilisé: ${memData.mem_usedmb} MB, Libre: ${memData.mem_freemb} MB)`;
        } else {
            document.getElementById('memory-usage').textContent = memData.error;
        }

        if (!diskData.error) {
            document.getElementById('disk-usage').textContent = `Disque: ${diskData.disk_usage}% (Utilisé: ${diskData.disk_usedgb} GB, Libre: ${diskData.disk_freegb} GB)`;
        } else {
            document.getElementById('disk-usage').textContent = diskData.error;
        }

        if (!netData.error) {
            document.getElementById('net-out').textContent = `Réseau Sortant: ${netData.net_out} MB/s`;
            document.getElementById('net-in').textContent = `Réseau Entrant: ${netData.net_in} MB/s`;
        } else {
            document.getElementById('net-out').textContent = netData.error;
            document.getElementById('net-in').textContent = netData.error;
        }
    })
    .catch(err => {
        console.error("Erreur lors de la récupération des données:", err);
    });
}

setInterval(updateStatistics, 1000);
