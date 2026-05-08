"use client";

import { useSyncExternalStore } from "react";

let selectedId: string | null = null;
const listeners = new Set<() => void>();

export function setSelectedId(id: string | null) {
  if (selectedId === id) return;
  selectedId = id;
  listeners.forEach((l) => l());
}

export function getSelectedId() {
  return selectedId;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return selectedId;
}

function getServerSnapshot(): string | null {
  return null;
}

export function useSelectedId() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
