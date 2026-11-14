import {
  deleteItemAsync,
  getItem,
  getItemAsync,
  setItemAsync,
} from "expo-secure-store";
import Storage from "expo-sqlite/kv-store";
import { File, Paths } from "expo-file-system";

export async function setSecure(
  key: string,
  value: string,
): Promise<void> {
  await setItemAsync(key, value);
}

export async function getSecureAsync(key: string): Promise<string> {
  const value = await getItemAsync(key);
  return value ?? "";
}

export function getSecure(key: string): string {
  const value = getItem(key)
  return value ?? ""
}

export async function deleteSecure(key: string): Promise<void> {
  await deleteItemAsync(key);
}

export function getKVStore(key: string): string {
  const value = Storage.getItemSync(key);
  return value ?? "";
}

export function setKVStore(key: string, value: string) {
  Storage.setItemSync(key, value);
}

export function removeKVStore(key: string) {
  Storage.removeItemSync(key)
}

// Downloaded files are stored by filename only. The iOS app container path
// changes on every app update, so absolute URIs must be rebuilt at read time.
// Legacy entries hold an absolute file:// URI; their basename is reused.
export function getLocalFileUri(key: string): string {
  const stored = getKVStore(key);
  if (!stored) return "";
  const filename = decodeURIComponent(stored.split("/").pop() ?? "");
  if (!filename) return "";
  return new File(Paths.document, filename).uri;
}
