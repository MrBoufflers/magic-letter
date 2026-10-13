import { createContext, useContext } from 'react';

// Tome affiché (pour la ligne de source des citations).
export const TomeContext = createContext(null);
export const useTomeCourant = () => useContext(TomeContext);

// Filtre des pistes : 0 = verte, 1 = + rouge, 2 = + noire.
export const FiltreContext = createContext({ filtre: 0, setFiltre: () => {} });
export const useFiltre = () => useContext(FiltreContext);

export const NIVEAUX = ['verte', 'rouge', 'noire'];
