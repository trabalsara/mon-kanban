# Projet Kanban R2.09

## Description

Ce projet est une application web de type Kanban développée dans le cadre du module R2.09.

Elle permet de gérer des tâches avec un système de tableaux, catégories, priorités et statuts, ainsi qu’un système d’authentification utilisateur.

---

## Fonctionnalités

### 🔐 Authentification
- Inscription / connexion des utilisateurs
- Protection des routes (dashboard sécurisé)
- Gestion de session avec Supabase Auth

### 👥 Utilisateurs
- Affichage des utilisateurs inscrits
- Création et suppression d’utilisateurs (CRUD)
- Gestion des profils

### 🗂 Gestion des tâches (Kanban)
- Création de tâches
- Suppression de tâches
- Statuts : à faire / en cours / validation / terminé
- Priorités : basse / moyenne / haute
- Catégorisation des tâches
- Date d’échéance

### 👤 Profil utilisateur
- Modification du nom complet
- Changement du mot de passe
- Upload d’image de profil (avatar)

---

## 🛠 Technologies utilisées

- React (Vite)
- Supabase (Backend as a Service)
  - PostgreSQL (base de données)
  - Authentification
  - Storage (images)
- React Router DOM
- Vercel (déploiement)

---

## 🗄 Base de données (Supabase)

Le projet utilise plusieurs tables :

- `profiles` → utilisateurs
- `tasks` → tâches Kanban
- `boards` → tableaux
- `categories` → catégories de tâches

---

## 👥 Travail en binôme

Ce projet a été réalisé en binôme :

- **Alya :**
  Développement frontend (React)
  Création des composants, pages, interface utilisateur

- **Sara :**
  Configuration backend (Supabase)
  Base de données, authentification, storage, SQL

---

## 🌐 Lien du projet

- GitHub : https://github.com/trabalsara/mon-kanban
- Vercel : mon-kanban-git-main-saras-projects-ce0ef55a.vercel.app

---

## Installation locale

```bash
npm install
npm run dev