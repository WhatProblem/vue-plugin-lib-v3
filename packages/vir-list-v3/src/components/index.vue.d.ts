declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        required: true;
    };
    labelName: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    options: {
        type: ArrayConstructor;
        required: false;
        default: () => any[];
    };
    labelWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    labelPositon: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    headerHeight: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    showNum: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    lineHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        required: true;
    };
    labelName: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    options: {
        type: ArrayConstructor;
        required: false;
        default: () => any[];
    };
    labelWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    labelPositon: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    headerHeight: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    showNum: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    lineHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
}>> & {
    onChange?: (...args: any[]) => any;
}, {
    labelName: string;
    placeholder: string;
    options: unknown[];
    labelWidth: string;
    labelPositon: string;
    headerHeight: string;
    showNum: number;
    lineHeight: number;
}>;
export default _default;
