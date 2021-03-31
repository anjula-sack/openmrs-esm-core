import { ExtensionStore, extensionStore } from "@openmrs/esm-extensions";
import { useStore } from "./useStore";

export const useExtensionStore = () => useStore<ExtensionStore>(extensionStore);
