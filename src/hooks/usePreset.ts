import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
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
export function usePreset(
    controller: Controller | null,
    firebaseUid: string,
    options: PresetOptions = {}
): UsePresetReturn {
    // Memoize options to prevent re-renders when object is recreated with same values
    const memoizedOptions = useMemo(() => ({
        devWarnings: options.devWarnings ?? false,
        autoLoad: options.autoLoad ?? false
    }), [options.devWarnings, options.autoLoad]);

    // Core state
    const [presets, setPresets] = useState<Preset[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Helper function to log debug messages - memoized to prevent re-renders
    const debugLog = useCallback((message: string, data?: unknown) => {
        if (memoizedOptions.devWarnings) {
            console.log(`[usePreset] ${message}`, data || '');
        }
    }, [memoizedOptions.devWarnings]);

    // Stable references for controller and firebaseUid to detect actual changes
    const stableControllerRef = useRef(controller);
    const stableFirebaseUidRef = useRef(firebaseUid);
    const prevStableControllerRef = useRef(controller);
    const prevStableFirebaseUidRef = useRef(firebaseUid);

    // Update refs only when values actually change (by reference)
    if (stableControllerRef.current !== controller) {
        stableControllerRef.current = controller;
    }
    if (stableFirebaseUidRef.current !== firebaseUid) {
        stableFirebaseUidRef.current = firebaseUid;
    }

    // Helper function to handle errors
    const handleError = useCallback((operation: string, error: unknown) => {
        const errorMessage = `Failed to ${operation}: ${error instanceof Error ? error.message : String(error)}`;
        setError(errorMessage);
        debugLog(`Error in ${operation}`, error);
        return false;
    }, [debugLog]);

    // Load presets from backend
    const load = useCallback(async () => {
        console.log("Load Presets Get Function Called");
        if (!stableControllerRef.current || !stableFirebaseUidRef.current) {
            debugLog('Load skipped: missing controller or firebaseUid');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            debugLog('Loading presets from backend...');
            const loadedPresets = await stableControllerRef.current.getPresets(stableFirebaseUidRef.current);

            setPresets(loadedPresets);
            setIsInitialized(true);

            debugLog('Presets loaded successfully', { count: loadedPresets.length });
        } catch (err) {
            handleError('load presets', err);
            setPresets([]); // Clear presets on error
        } finally {
            setIsLoading(false);
        }
    }, [debugLog, handleError]);

    // Fire-and-forget version of load for internal use
    const loadInBackground = useCallback(() => {
        if (!stableControllerRef.current || !stableFirebaseUidRef.current) {
            debugLog('Background load skipped: missing controller or firebaseUid');
            return;
        }

        debugLog('Background loading presets...');
        
        // Don't set loading state for background operations
        stableControllerRef.current.getPresets(stableFirebaseUidRef.current)
            .then((loadedPresets: Preset[]) => {
                setPresets(loadedPresets);
                if (!isInitialized) {
                    setIsInitialized(true);
                }
                debugLog('Background presets loaded successfully', { count: loadedPresets.length });
            })
            .catch((err: unknown) => {
                debugLog('Background load failed:', err);
                // Don't set error state for background operations
            });
    }, [debugLog, isInitialized]);

    // Create a new preset
    const create = useCallback(async (name: string, settings: AdjustmentState): Promise<Preset | null> => {
        console.log("Create Preset Get Function Called");
        if (!stableControllerRef.current || !stableFirebaseUidRef.current) {
            debugLog('Create skipped: missing controller or firebaseUid');
            return null;
        }

        if (!name.trim()) {
            setError('Preset name cannot be empty');
            return null;
        }

        // Check for duplicate names
        if (presets.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            setError('A preset with this name already exists');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            debugLog('Creating preset...', { name, settings });
            
            // Fire the create request but don't wait for preset data in response
            await stableControllerRef.current.createPreset(
                stableFirebaseUidRef.current,
                name,
                settings
            );

            debugLog('Preset creation request completed');

            const newPreset: Preset = {
                id: `temp-${Date.now()}`, // Use a temporary ID
                name: name,
                is_default: false,
                temperature: settings.tempScore,
                tint: settings.tintScore,
                saturation: settings.saturationScore,
                vibrance: settings.vibranceScore,
                exposure: settings.exposureScore,
                contrast: settings.contrastScore,
                highlights: settings.highlightsScore,
                shadows: settings.shadowsScore,
                whites: settings.whitesScore,
                blacks: settings.blacksScore,
                clarity: settings.clarityScore,
                sharpness: settings.sharpnessScore,
            };
            // Add the new preset to the local state immediately
            setPresets(prev => [...prev, newPreset]);

            // Fire and forget: Schedule a delayed refresh to get updated preset list
            setTimeout(() => {
                debugLog('Refreshing presets after create (fire and forget)');
                loadInBackground();
            }, 500); // 500ms delay to allow backend processing

            // Return a minimal success indicator since we don't have the actual preset data
            // return { id: 'pending', name, is_default: false } as Preset;
            return newPreset;
        } catch (err) {
            handleError('create preset', err);
            return null;
        } finally {
            setIsLoading(false);
        }
        // loadInBackground
    }, [presets, debugLog, handleError, loadInBackground]);

    // Rename an existing preset
    const rename = useCallback(async (presetId: string, newName: string): Promise<boolean> => {
        if (!stableControllerRef.current || !stableFirebaseUidRef.current) {
            debugLog('Rename skipped: missing controller or firebaseUid');
            return false;
        }

        if (!newName.trim()) {
            setError('Preset name cannot be empty');
            return false;
        }

        const existingPreset = presets.find(p => p.id === presetId);
        if (!existingPreset) {
            setError('Preset not found');
            return false;
        }

        // Check for duplicate names (excluding the current preset)
        if (presets.some(p => p.id !== presetId && p.name.toLowerCase() === newName.toLowerCase())) {
            setError('A preset with this name already exists');
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            debugLog('Renaming preset...', { presetId, oldName: existingPreset.name, newName });

            const updatedPreset = { ...existingPreset, name: newName };
            await stableControllerRef.current.updatePreset(stableFirebaseUidRef.current, updatedPreset);

            // Update local state
            setPresets(prev => prev.map(p => p.id === presetId ? updatedPreset : p));

            debugLog('Preset renamed successfully');
            return true;
        } catch (err) {
            handleError('rename preset', err);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [presets, debugLog, handleError]);

    // Delete a preset
    const deletePreset = useCallback(async (presetId: string): Promise<boolean> => {
        console.log("Delete Presets Get Function Called");
        if (!stableControllerRef.current || !stableFirebaseUidRef.current) {
            debugLog('Delete skipped: missing controller or firebaseUid');
            return false;
        }

        const existingPreset = presets.find(p => p.id === presetId);
        if (!existingPreset) {
            setError('Preset not found');
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            debugLog('Deleting preset...', { presetId, name: existingPreset.name });

            await stableControllerRef.current.deletePreset(stableFirebaseUidRef.current, presetId);

            // Remove from local state
            setPresets(prev => prev.filter(p => p.id !== presetId));

            debugLog('Preset deleted successfully');
            return true;
        } catch (err) {
            handleError('delete preset', err);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [presets, debugLog, handleError]);

    // Find preset that matches the given adjustment state
    const findByAdjustments = useCallback((adjustments: AdjustmentState): Preset | null => {
        // Helper function to normalize adjustment values (treat null/undefined as 0)
        const normalizeValue = (value: number | null | undefined): number => {
            return value ?? 0;
        };

        // Helper function to convert Preset to AdjustmentState for comparison
        const presetToAdjustmentState = (preset: Preset): AdjustmentState => {
            return {
                tempScore: normalizeValue(preset.temperature),
                tintScore: normalizeValue(preset.tint),
                vibranceScore: normalizeValue(preset.vibrance),
                saturationScore: normalizeValue(preset.saturation),
                exposureScore: normalizeValue(preset.exposure),
                highlightsScore: normalizeValue(preset.highlights),
                shadowsScore: normalizeValue(preset.shadows),
                whitesScore: normalizeValue(preset.whites),
                blacksScore: normalizeValue(preset.blacks),
                contrastScore: normalizeValue(preset.contrast),
                clarityScore: normalizeValue(preset.clarity),
                sharpnessScore: normalizeValue(preset.sharpness)
            };
        };

        // Helper function to compare two adjustment states
        const adjustmentsMatch = (presetSettings: AdjustmentState, current: AdjustmentState): boolean => {
            const keys: (keyof AdjustmentState)[] = [
                'tempScore', 'tintScore', 'vibranceScore', 'saturationScore',
                'exposureScore', 'highlightsScore', 'shadowsScore', 'whitesScore',
                'blacksScore', 'contrastScore', 'clarityScore', 'sharpnessScore'
            ];

            return keys.every(key =>
                normalizeValue(presetSettings[key]) === normalizeValue(current[key])
            );
        };

        debugLog('Finding preset by adjustments...', adjustments);

        // Find preset that matches the current adjustments
        const matchingPreset = presets.find(preset => {
            const presetAdjustments = presetToAdjustmentState(preset);
            return adjustmentsMatch(presetAdjustments, adjustments);
        });

        if (matchingPreset) {
            debugLog('Found matching preset:', matchingPreset);
            return matchingPreset;
        } else {
            debugLog('No matching preset found');
            return null;
        }
    }, [presets, debugLog]);
    
    // Auto-load presets on initialization - stable dependencies
    useEffect(() => {
        if (memoizedOptions.autoLoad && stableControllerRef.current && stableFirebaseUidRef.current && !isInitialized) {
            debugLog('Auto-loading presets...');
            load();
        }
    }, [memoizedOptions.autoLoad, isInitialized, load]);

    // Clear state when controller or firebaseUid changes - but only when they actually change
    useEffect(() => {
        const controllerChanged = prevStableControllerRef.current !== stableControllerRef.current;
        const firebaseUidChanged = prevStableFirebaseUidRef.current !== stableFirebaseUidRef.current;
        
        if ((controllerChanged || firebaseUidChanged) && isInitialized) {
            debugLog('Controller or firebaseUid changed, clearing state');
            setError(null);
            setIsInitialized(false);
            // Don't clear presets to avoid flicker - they'll be reloaded
        }
        
        prevStableControllerRef.current = stableControllerRef.current;
        prevStableFirebaseUidRef.current = stableFirebaseUidRef.current;
    }, [stableControllerRef.current, stableFirebaseUidRef.current, isInitialized]);

    // Preset info object - memoized to prevent re-renders
    const info: PresetInfo = useMemo(() => ({
        isLoading,
        error,
        count: presets.length,
        isInitialized
    }), [isLoading, error, presets.length, isInitialized]);

    // Actions object - memoized to prevent re-renders when functions don't change
    const actions: PresetActions = useMemo(() => ({
        create,
        rename,
        delete: deletePreset,
        load,
        findByAdjustments
    }), [create, rename, deletePreset, load, findByAdjustments]);

    // Return object - memoized to prevent re-renders when values don't change
    return useMemo(() => ({
        presets,
        info,
        actions
    }), [presets, info, actions]);
}
