/**
 * This file was generated from GroupBox.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue, NativeIcon } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type CollapsibleEnum = "no" | "yesStartExpanded" | "yesStartCollapsed";

export type FooterEnum = "no" | "yesWithoutTitle" | "yesWithTitle";

export interface GroupBoxProps<Style> extends CommonProps<Style> {
    content?: any;
    collapsible: CollapsibleEnum;
    headerCaption?: DynamicValue<string>;
    expandIcon?: DynamicValue<NativeIcon>;
    collapseIcon?: DynamicValue<NativeIcon>;
    footer: FooterEnum;
}
