import React, { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { fonts } from "../styles/globalStyles"

interface PromptProps {
    children: ReactNode,
    numberOfLines: number,
    style?: StyleProp<TextStyle>
};

const Prompt = ({ children, numberOfLines, style }: PromptProps) => (
    <Text adjustsFontSizeToFit numberOfLines={numberOfLines} style={[{
        fontFamily: fonts.Pretendard_SemiBold,
    }, style]}>
        {children}
    </Text>
);

export default Prompt;