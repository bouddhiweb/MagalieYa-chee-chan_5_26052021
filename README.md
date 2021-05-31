## Cinquième projet du parcours "Développeur web" chez OpenClassroom.

> [Lire les spécifications du projet](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P5/P5_Spe%CC%81cifications+fonctionnelles+Orinoco.pdf)

> [Voir la validation W3C du CSS](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fbouddhiweb.github.io%2FMagalieYa-chee-chan_5_26052021%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=fr)

> [Voir la validation W3C du HTML](https://validator.w3.org/check?uri=https%3A%2F%2Fbouddhiweb.github.io%2FMagalieYa-chee-chan_5_26052021%2F&charset=%28detect+automatically%29&doctype=Inline&group=0)

## Livrables

**- Le lien vers un dépôt Git public contenant le code de l'application web.**
Le mentor et l'évaluateur doivent être en mesure de cloner le référentiel, d'ouvrir index.html, d'utiliser l'application entièrement opérationnelle et de confirmer que n’importe quel input utilisateur est validé.

**- Un plan de tests**

## Technologies à utiliser

**HTML / CSS / Sass / JavaScript**

## URL des API

On utilise l'API pour les ours en peluche faits à la main : [Accessible ici](http://localhost:3000/api/teddies)

## Architecture générale

**L’application web sera composée de 4 pages :**

- Une page de vue sous forme de liste, montrant tous les articles disponibles à la vente ;

- Une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier ;

- Une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de texte dans les champs date ;

- Une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

## Planification de tests unitaires

Planifiez une suite de tests unitaires pour couvrir au minimum 80 % de la base de code pour le front-end. Vous devrez formaliser un plan pour atteindre ce résultat, sans obligation d’écrire ces tests Expliquez quelles lignes seront testées, et quels “test cases” seront envisagés.

## Informations complémentaires

Pour le MVP, la personnalisation du produit ne sera pas fonctionnelle : la page contenant un seul article aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, mais celle-ci ne sera ni envoyée au serveur ni reflétée dans la réponse du serveur.
Le code source devra être indenté et utiliser des commentaires. Il devra également utiliser des fonctions globales.
Concernant l’API, des promesses devront être utilisées pour éviter les rappels.
Les inputs des utilisateurs doivent être validés avant l’envoi à l’API.

## Accéder au projet

Pour accéder à la démo en ligne du projet : [Accéder au site](https://bouddhiweb.github.io/MagalieYa-chee-chan_5_26052021/)

Le repository GitHub à cloner : [Accéder au repository](https://github.com/OpenClassrooms-Student-Center/JWDP5.git)
