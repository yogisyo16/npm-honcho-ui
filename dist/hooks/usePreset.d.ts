import { Controller, Preset, AdjustmentState } from './editor/useHonchoEditor';
/**
 * Configuration options for the preset hook
 */
export interface PresetOptions {
    /** Enable development warnings for debugging */
    devWarnings?: boolean;
    /** Auto-load presets on hook initialization */
    autoLoad?: boolean;
}
/**
 * Information about the current preset state
 */
export interface PresetInfo {
    /** Whether presets are currently being loaded */
    isLoading: boolean;
    /** Error message if any operation failed */
    error: string | null;
    /** Number of presets currently managed */
    count: number;
    /** Whether the hook has been initialized */
    isInitialized: boolean;
}
/**
 * Actions available for preset management
 */
export interface PresetActions {
    /** Create a new preset */
    create: (name: string, settings: AdjustmentState) => Promise<Preset | null>;
    /** Rename an existing preset */
    rename: (presetId: string, newName: string) => Promise<boolean>;
    /** Delete a preset */
    delete: (presetId: string) => Promise<boolean>;
    /** Load/refresh presets from backend */
    load: () => Promise<void>;
    /** Find preset that matches the given adjustment state */
    findByAdjustments: (adjustments: AdjustmentState) => Preset | null;
}
/**
 * Return type for the usePreset hook
 */
export interface UsePresetReturn {
    /** Current list of presets */
    presets: Preset[];
    /** Information about preset state */
    info: PresetInfo;
    /** Available preset actions */
    actions: PresetActions;
}
/**
 * Hook for managing presets with backend communication through Controller.
 *
 * **Key Features:**
 * - **Backend Communication**: All operations go through the provided Controller
 * - **Local State Management**: Maintains local preset list for UI performance
 * - **CRUD Operations**: Create, rename, delete, and list presets
 * - **Error Handling**: Provides error states for failed operations
 * - **Auto-loading**: Optional automatic preset loading on initialization
 *
 * **Typical Usage:**
 * ```typescript
 * const { presets, actions, info } = usePreset(controller, firebaseUid, { autoLoad: true });
 *
 * // Create preset
 * const newPreset = await actions.create('My Preset', adjustmentState);
 *
 * // Rename preset
 * const success = await actions.rename(presetId, 'New Name');
 *
 * // Delete preset
 * const deleted = await actions.delete(presetId);
 *
 * // Manual reload
 * await actions.load();
 * ```
 *
 * @param controller - Backend controller for API communication
 * @param firebaseUid - User identifier for backend operations
 * @param options - Configuration options
 * @returns Object with presets, info, and actions
 */
export declare function usePreset(controller: Controller | null, firebaseUid: string, options?: PresetOptions): UsePresetReturn;
