import React, { FC, ForwardedRef } from "react";
import Animated from "react-native-reanimated";
import Feather from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import ZocialIcon from "react-native-vector-icons/Zocial";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import OcticonIcon from "react-native-vector-icons/Octicons";
import FAIcon5 from "react-native-vector-icons/FontAwesome5";
import FoundationIcon from "react-native-vector-icons/Foundation";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconProps } from "react-native-vector-icons/Icon";

const getIcon = (type: any) => {
    switch (type) {
        case "fontisto":
            return Fontisto;
        case "material":
            return MaterialIcon;
        case "evil":
            return EvilIcon;
        case "feather":
            return Feather;
        case "ant":
            return AntDesign;
        case "simpleLine":
            return SimpleLineIcon;
        case "zocial":
            return ZocialIcon;
        case "foundation":
            return FoundationIcon;
        case "fa5":
            return FAIcon5;
        case "fa":
            return FAIcon;
        case "ionicon":
            return Ionicon;
        case "materialCommunity":
            return MaterialCommunityIcon;
        case "entypo":
            return EntypoIcon;
        case "octicon":
            return OcticonIcon;
        default:
            return FAIcon;
    }
};

interface Types {
    type:
        | "fontisto"
        | "material"
        | "evil"
        | "feather"
        | "ant"
        | "simpleLine"
        | "zocial"
        | "foundation"
        | "fa5"
        | "fa"
        | "ionicon"
        | "materialCommunity"
        | "entypo"
        | "octicon";
    name: string;
}

export type FontIconProps = Types & IconProps;

const FontIcon: FC<FontIconProps> = React.forwardRef(
    (props: FontIconProps, ref: ForwardedRef<any>) => {
        const TypedIcon = getIcon(props.type);
        return <TypedIcon ref={ref} {...props} name={props.name} />;
    }
);

export const AnimatedFontIcon = Animated.createAnimatedComponent(FontIcon);

export default FontIcon;