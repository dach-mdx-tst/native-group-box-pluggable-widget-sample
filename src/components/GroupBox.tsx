import { Children, Component, ComponentClass, ReactNode, createElement } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { CustomStyle } from "../GroupBox";
import { flattenStyles } from "../utils/common";

export interface GroupBoxProps {
    startCollapsed?: boolean;
    collapsible: boolean;
    collapseIcon?: ReactNode;
    expandIcon?: ReactNode;
    caption?: string;
    style: CustomStyle[];
    footer: boolean;
    footerTitle: boolean;
}

export interface GroupBoxState {
    collapsed: boolean;
}

const defaultStyle: CustomStyle = {
    container: {
        borderColor: "#000",
        borderRadius: Platform.OS === "ios" ? 4 : 0,
        borderWidth: 1,
        overflow: "hidden"
    },
    header: {
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    headerContent: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 15
    }
};

export class GroupBox extends Component<GroupBoxProps, GroupBoxState> {
    private readonly styles = flattenStyles(defaultStyle, this.props.style);

    readonly state: GroupBoxState = {
        collapsed: !!this.props.startCollapsed
    };

    render(): ReactNode {
        const renderedHeader = this.renderHeader();
        const renderedContent = this.renderContent();
        const renderFooter = this.renderFooter();

        if (!renderedHeader && !renderedContent) {
            return null;
        }

        return (
            <View style={this.styles.container}>
                {renderedHeader}
                {renderedContent}
                {renderFooter}
            </View>
        );
    }

    private renderFooter = () => {
        if (this.state.collapsed || Children.count(this.props.children) === 0 || !this.props.footer) {
            return null;
        }

        return this.renderHeader(!this.props.footerTitle)
    }

    private renderHeader = (hideTitle?: boolean) => {
        const { collapsible, caption } = this.props;

        const view = (
            <View style={this.styles.header}>
                <Text style={this.styles.headerContent}>{hideTitle ? " " : caption}</Text>
                {this.renderIcon()}
            </View>         
        );

        if (collapsible) {
            const Touchable: ComponentClass<any> = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
            return <Touchable onPress={this.toggleCollapsed}>{view}</Touchable>;
        } else if (caption) {
            return view;
        }

        return null;
    };

    private renderIcon = (): ReactNode => {
        const { collapsible, collapseIcon, expandIcon } = this.props;

        if (!collapsible) {
            return null;
        }

        if (this.state.collapsed) {
            return expandIcon ? expandIcon : <Text style={this.styles.headerContent}>+</Text>;
        }

        return collapseIcon ? collapseIcon : <Text style={this.styles.headerContent}>-</Text>;
    };

    private renderContent = (): ReactNode => {
        if (this.state.collapsed || Children.count(this.props.children) === 0) {
            return null;
        }

        return <View style={this.styles.content}>{this.props.children}</View>;
    };

    private toggleCollapsed = (): void => {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
    };
}
