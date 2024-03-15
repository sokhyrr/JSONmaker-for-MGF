const fs = require('fs');

// Charger les données depuis les fichiers JSON
const groupeq6Data = JSON.parse(fs.readFileSync('before-missing.json', 'utf8'));
const resultatData = JSON.parse(fs.readFileSync('replacement.json', 'utf8'));

// Fonction de mise à jour des événements
function mettreAJourEvenements(groupeq6, resultat) {
    groupeq6.forEach(personne => {
        const personneCorrection = resultat.find(corr => parseInt(corr.matricule) === personne.matricule);
        if (personneCorrection) {
            personne.events.forEach(event => {
                const eventCorrection = personneCorrection.events.find(corrEvent =>
                    corrEvent.date === event.date &&
                    corrEvent.debut === event.debut &&
                    corrEvent.fin === event.fin
                );
                if (eventCorrection) {
                    event.titre = eventCorrection.titre;
                    event.lieu = eventCorrection.lieu;
                }
            });
        }
    });
}

// Appel de la fonction de mise à jour
mettreAJourEvenements(groupeq6Data, resultatData);

// Écrire les données mises à jour dans un nouveau fichier JSON
const newData = JSON.stringify(groupeq6Data, null, 2);
fs.writeFileSync('groupeq6_mis_a_jour.json', newData, 'utf8');
