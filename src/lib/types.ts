/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : types.ts
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Contains shared TypeScript type definitions for the application.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */

/**
 * Represents the structure of a Product object received from the API.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string; // Dates are serialized as strings in JSON
  updatedAt: string;
}