const fs = require('fs');

// Charger le fichier JSON
const rawData = fs.readFileSync('groupeq6.json');
let data = JSON.parse(rawData);

// Parcourir les matricules
data.forEach(matricule => {
    // Vérifier si l'événement "Atelier Communication" existe pour ce matricule
    const atelierCommEvent = matricule.events.find(event => event.titre === "Atelier Communication");
    if (atelierCommEvent) {
        // Modifier le lieu de l'événement "Atelier Communication"
        atelierCommEvent.lieu = "CHU ST T2-1 (Route 782)";
        // Renommer le titre de l'événement "Atelier Communication"
        atelierCommEvent.titre = "Atelier Communication à la famille";
    }
});

// Écrire les modifications dans le fichier JSON
fs.writeFileSync('groupeq6_modifie.json', JSON.stringify(data, null, 2));

console.log('Modifications terminées.');
