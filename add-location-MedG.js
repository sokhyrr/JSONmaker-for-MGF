const fs = require('fs');

// Charger les deux tableaux JSON
const premierTableau = require('./fichier_principal.json');
const deuxiemeTableau = require('./fichier_accessoire.json');

// Fonction pour mettre à jour les lieux et les titres
function mettreAJourLieuxEtTitres() {
    premierTableau.forEach((premierObjet) => {
        premierObjet.matricule = parseInt(premierObjet.matricule); // Conversion en nombre
        deuxiemeTableau.forEach((deuxiemeObjet) => {
            deuxiemeObjet.matricule = parseInt(deuxiemeObjet.matricule); // Conversion en nombre
            if (premierObjet.matricule === deuxiemeObjet.matricule &&
                premierObjet.date === deuxiemeObjet.date &&
                premierObjet.debut === deuxiemeObjet.debut &&
                premierObjet.fin === deuxiemeObjet.fin) {
                // Mettre à jour le lieu et le titre
                premierObjet.lieu = deuxiemeObjet.lieu;
                premierObjet.titre = deuxiemeObjet.titre;
            }
        });
    });
}

// Appeler la fonction pour mettre à jour les lieux et les titres
mettreAJourLieuxEtTitres();

// Enregistrer les modifications dans un nouveau fichier JSON
fs.writeFile('withlocations.json', JSON.stringify(premierTableau, null, 2), (err) => {
    if (err) {
        console.error('Erreur lors de l\'enregistrement des modifications :', err);
        return;
    }
    console.log('Modifications enregistrées avec succès dans le nouveau tableau.');
});
