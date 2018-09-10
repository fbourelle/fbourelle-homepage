# fbourelle-homepage
Ce site présente mon profil et mon portfolio.

J'ai pensé ce site avec la volonté de faire une présentation simple dans la présentation comme dans la structure et le code. 
Le one-page c'est donc imposé naturellement et j'ai commencé la maquette directement en HTML / CSS avec l'idée d'ajouter du dynamisme par la suite pour générer dynamiquement les éléments de liste (compétences, clients et slider), ce qui me permettra par la suite d'intégrer plus facilement une base de donnée ou un système d'admninistration.

Pour la partie dynamique j'ai choisi le framework Vue.js qui m'a permis, avec l'utilisation des composants, de structurer de manière claire la gestion des listes.

Vue.js est installé via un CDN.

Un objet "compétences" et un objet "clients", structurés en JSON, sont inclus dans 2 objets Vue séparés.
Pour les compétences, un composant seulement affiche les items, l'animation est gérée avec CSS.
Pour les clients, voici la structure :

Objet VUE
    |
    Composant client (parcourt les clients)
            |
            Composant contenu client (description des clients)
                    |
                    Composant Slider (mets en place le slider, contient les méthodes pour parcourir le slider)
                            |
                            Composant Slide (affiche les images)
                            
Les transitions du slider sont gérées avec les transitions de Vue.js. J'ai suivi le tuto de Graphikart pour mettre en place les algos du slider.







