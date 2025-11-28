// src/services/storageService.ts
// Servicio para almacenar y gestionar cotizaciones de seguros en el almacenamiento local

import { InsuranceQuoteData } from '../types';

export interface StoredQuote {
  id: string;
  type: string;
  data: InsuranceQuoteData;
  result: any;
  timestamp: string;
  totalPrice: number;
}

const STORAGE_KEYS = {
  QUOTES: 'seguro_no_cobras_quotes'
};

export const storageService = {
  // Guardar una nueva cotización
  saveQuote: (quote: Omit<StoredQuote, 'id'>): StoredQuote => {
    const quotes = storageService.getAllQuotes();
    const newQuote: StoredQuote = {
      ...quote,
      id: Date.now().toString()
    };
    
    quotes.push(newQuote);
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
    return newQuote;
  },

  // Obtener todas las cotizaciones
  getAllQuotes: (): StoredQuote[] => {
    try {
      const quotes = localStorage.getItem(STORAGE_KEYS.QUOTES);
      return quotes ? JSON.parse(quotes) : [];
    } catch (error) {
      console.error('Error al leer cotizaciones:', error);
      return [];
    }
  },

  // Obtener cotizaciones por tipo
  getQuotesByType: (type: string): StoredQuote[] => {
    const quotes = storageService.getAllQuotes();
    return quotes.filter(quote => quote.type === type);
  },

  // Obtener una cotización específica
  getQuoteById: (id: string): StoredQuote | null => {
    const quotes = storageService.getAllQuotes();
    return quotes.find(quote => quote.id === id) || null;
  },

  // Eliminar una cotización
  deleteQuote: (id: string): boolean => {
    const quotes = storageService.getAllQuotes();
    const filteredQuotes = quotes.filter(quote => quote.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(filteredQuotes));
    return filteredQuotes.length < quotes.length;
  },

  // Eliminar todas las cotizaciones de un tipo
  deleteQuotesByType: (type: string): number => {
    const quotes = storageService.getAllQuotes();
    const filteredQuotes = quotes.filter(quote => quote.type !== type);
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(filteredQuotes));
    return quotes.length - filteredQuotes.length;
  },

  // Eliminar todas las cotizaciones
  deleteAllQuotes: (): void => {
    localStorage.removeItem(STORAGE_KEYS.QUOTES);
  },

  // Actualizar una cotización
  updateQuote: (id: string, updatedData: Partial<StoredQuote>): StoredQuote | null => {
    const quotes = storageService.getAllQuotes();
    const quoteIndex = quotes.findIndex(quote => quote.id === id);
    
    if (quoteIndex === -1) return null;
    
    quotes[quoteIndex] = { ...quotes[quoteIndex], ...updatedData };
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
    return quotes[quoteIndex];
  }
};