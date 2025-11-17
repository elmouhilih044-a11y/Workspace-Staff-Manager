# Gestion des Employés - Système d'Attribution des Zones

## Présentation du Projet

Application web moderne de gestion et d'attribution des employés aux différentes zones d'un bâtiment. Ce système permet de visualiser un plan d'étage interactif, d'assigner des employés selon leur rôle et de gérer les restrictions d'accès par zone.

---

## Fonctionnalités Principales

### Plan d'Étage Interactif

L'application affiche 6 zones distinctes avec des règles d'accès spécifiques :

- **Salle de conférence** - Accès libre
- **Réception** - Réservée aux Réceptionnistes
- **Salle des serveurs** - Réservée aux Techniciens IT
- **Salle de sécurité** - Réservée aux Agents de sécurité
- **Salle du personnel** - Accès libre
- **Salle d'archives** - Accès restreint

### Gestion des Employés

- Ajout de nouveaux employés via une modale dédiée
- Informations complètes : nom, rôle, photo, email, téléphone
- Gestion des expériences professionnelles (ajout dynamique multiple)
- Prévisualisation de la photo lors de l'ajout
- Profil détaillé accessible en un clic

### Système de Règles et Restrictions

**Règles d'accès par rôle :**

- **Manager** → Accès à toutes les zones
- **Nettoyage** → Accès partout sauf Salle d'archives
- **Réceptionniste** → Uniquement Réception
- **Technicien IT** → Uniquement Salle des serveurs
- **Agent de sécurité** → Uniquement Salle de sécurité
- **Autres rôles** → Accès libre aux zones non restreintes

### Interface Utilisateur

- Design moderne avec Flexbox et Grid
- Formes arrondies et boutons colorés (vert, orange, rouge)
- Palette de couleurs cohérente
- Icônes intuitives pour une navigation fluide
- Animations CSS fluides
- Interface responsive sur tous les écrans

---

## Responsive Design

### Tailles d'Écrans Supportées

**Mode Portrait :**
- Grand écran : > 1280px
- Petit écran : 1024px - 1279px
- Tablette : 768px - 1023px
- Mobile : < 767px

**Mode Paysage :**
- Mobile : 768px - 1023px
- Tablette : 1024px - 1279px

---

## Fonctionnalités Détaillées

### Gestion des Employés Non Assignés

- Section latérale dédiée "Unassigned Staff"
- Bouton "Add New Worker" pour créer de nouveaux profils
- Liste dynamique des employés disponibles
- Bouton "X" pour retirer un employé d'une zone

### Attribution aux Zones

- Bouton "+" dans chaque zone pour assigner un employé
- Sélection filtrée selon les rôles éligibles
- Limitation du nombre d'employés par zone
- Indicateur visuel (rouge pâle) pour les zones vides obligatoires

### Profil Détaillé

Affichage complet des informations :
- Photo grand format
- Nom et rôle
- Email et téléphone
- Expériences professionnelles
- Localisation actuelle

---

## Fonctionnalités Bonus (Optionnelles)

- **Glisser-Déposer** : Déplacement intuitif des employés entre zones
- **Édition** : Modification des informations depuis "Unassigned"
- **Recherche et Filtrage** : Par nom ou rôle
- **Sauvegarde Automatique** : État persistant avec localStorage
- **Réorganisation Automatique** : Distribution aléatoire intelligente
- **Photo par Défaut** : Image générique pour les employés sans photo

---

## Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styling moderne avec Flexbox et Grid
- **JavaScript** - Logique interactive et dynamique
- **Responsive Design** - Interface adaptative
- **Animations CSS** - Transitions fluides

---

## Gestion de Projet

### Méthodologie Agile/Scrum

- Organisation avec Trello, Jira ou GitHub Projects
- User Stories structurées par rôle
- Suivi de l'avancement des tâches
- Gestion des branches Git (optionnel)

### Validation et Déploiement

- Code validé avec W3C Validator
- Déploiement sur GitHub Pages ou Vercel
- Présentation finale avec démonstration complète



