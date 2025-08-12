import { ColorAdjustment } from "../hooks/editor/type";
import { AdjustmentState } from "../hooks/editor/useHonchoEditor";
import { AdjustmentValues } from "../lib/editor/honcho-editor";
export declare function mapAdjustmentStateToAdjustmentEditor(state: AdjustmentState): AdjustmentValues;
export declare function mapColorAdjustmentToAdjustmentState(colors: ColorAdjustment): AdjustmentState;
