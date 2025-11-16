/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : useStore.ts
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Custom Svelte 5 hook to sync a vanilla Zustand store with a Svelte component.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */

import { onDestroy } from 'svelte';
import type { StoreApi } from 'zustand/vanilla';

type ZustandStore<T> = StoreApi<T>;

/**
 * A Svelte 5 hook that subscribes to a vanilla Zustand store and triggers a callback on state changes.
 * This is the bridge between Zustand's external state and Svelte's reactive context.
 * @param {ZustandStore<T>} store The vanilla Zustand store instance.
 * @param {(state: T) => void} callback The function to call with the new state whenever it changes.
 */
export function useSyncStore<T>(store: ZustandStore<T>, callback: (state: T) => void) {
    // Call the callback immediately with the initial state
    callback(store.getState());

    // Subscribe to future changes
    const unsubscribe = store.subscribe(callback);

    // Ensure we unsubscribe when the component is destroyed to prevent memory leaks
    onDestroy(unsubscribe);
}