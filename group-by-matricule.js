const fs = require('fs');

// Charger le fichier JSON
const data = JSON.parse(fs.readFileSync('unorganized.json', 'utf8'));

// Créer un objet pour stocker les activités par matricule
const activitesParMatricule = {};

// Parcourir chaque objet dans le tableau JSON
data.forEach(objet => {
    const matricule = objet.matricule;
    // Vérifier si le matricule existe déjà dans l'objet
    if (activitesParMatricule[matricule]) {
        // Ajouter l'objet à la liste d'activités existante pour ce matricule
        activitesParMatricule[matricule].events.push({
            titre: objet.titre,
            date: objet.date,
            debut: objet.debut,
            fin: objet.fin,
            lieu: objet.lieu
        });
    } else {
        // Créer une nouvelle entrée pour ce matricule dans l'objet
        activitesParMatricule[matricule] = {
            matricule: matricule,
            events: [{
                titre: objet.titre,
                date: objet.date,
                debut: objet.debut,
                fin: objet.fin,
                lieu: objet.lieu
            }]
        };
    }
});

// Convertir l'objet en une liste pour obtenir le format final
const resultat = Object.values(activitesParMatricule);

// Écrire le résultat dans un nouveau fichier JSON
fs.writeFileSync('organized.json', JSON.stringify(resultat, null, 2));

console.log('Conversion terminée.');
