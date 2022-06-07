import React, { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { fonts } from "../styles/globalStyles";
import * as Speech from 'expo-speech'

interface PromptProps {
    children: ReactNode,
    numberOfLines: number,
    unit: number,
    underline?: boolean,
    style?: StyleProp<TextStyle>
};

const Prompt = ({ children, numberOfLines, unit, underline, style }: PromptProps) => {

    return <Text adjustsFontSizeToFit numberOfLines={numberOfLines} style={[underline ? {
        fontFamily: fonts.Pretendard_Medium,
        textDecorationLine: 'underline',
        fontSize: unit * 100,
        margin: unit * 5,
        marginLeft: unit * 10,
        marginRight: unit * 10,  
    } : {
        fontFamily: fonts.Pretendard_SemiBold,
        fontSize: unit * 100,
        margin: unit * 10
    }, style]}>
        {children}
    </Text>
};

export default Prompt;