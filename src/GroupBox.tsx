import { Component, ReactNode, createElement } from "react";
import { DynamicValue, NativeIcon, ValueStatus } from "mendix";
import { Style, flattenStyles } from "./utils/common";
import { TextStyle, ViewStyle } from "react-native";
import { GroupBox as WrappedGroupBox, GroupBoxProps as WrappedGroupBoxProps } from "./components/GroupBox";

import { GroupBoxProps } from "../typings/GroupBoxProps";
import { Icon } from "mendix/components/native/Icon";

export interface CustomStyle extends Style {
    container: ViewStyle;
    header: ViewStyle;
    headerContent: TextStyle;
    content: ViewStyle;
}

const defaultStyle: CustomStyle = {
    container: {},
    header: {},
    headerContent: {
        color: "#FFF",
        fontSize: 16
    },
    content: {}
};

const defaultCollapseIconGlyph = "glyphicon-minus";
const defaultExpandIconGlyph = "glyphicon-plus";

export class GroupBox extends Component<GroupBoxProps<CustomStyle>> {
    private readonly styles = flattenStyles(defaultStyle, this.props.style);

    render(): ReactNode {
        const { collapsible, collapseIcon, expandIcon, content, headerCaption, style, footer} = this.props;

        const isCollapsible = collapsible !== "no";
        const hasFooter = footer != "no";
        const hasFooterTitle = footer === "yesWithTitle";
        //const caption = headerCaption?.value;
        let caption: string = ""
        if (headerCaption != null){
            if(headerCaption.value != null){
                caption = headerCaption.value;
            }
        }

        const props: WrappedGroupBoxProps = {
            collapsible: isCollapsible,
            caption,
            footer: hasFooter,
            footerTitle: hasFooterTitle,
            collapseIcon: this.renderIcon(defaultCollapseIconGlyph, collapseIcon),
            expandIcon: this.renderIcon(defaultExpandIconGlyph, expandIcon),
            style
        };

        if (collapsible) {
            props.startCollapsed = collapsible === "yesStartCollapsed";
        }

        return <WrappedGroupBox {...props}>{content}</WrappedGroupBox>;
    }

    private renderIcon = (glyph: string, toBeRenderedIcon?: DynamicValue<NativeIcon>) => {
        const nativeIcon: NativeIcon =
            toBeRenderedIcon && toBeRenderedIcon.status === ValueStatus.Available
                ? toBeRenderedIcon.value
                : { type: "glyph", iconClass: glyph };

        return (
            <Icon color={this.styles.headerContent.color} icon={nativeIcon} size={this.styles.headerContent.fontSize} />
        );
    };
}
