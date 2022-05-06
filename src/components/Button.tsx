import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { colors, fonts } from "../styles/globalStyles";

interface ButtonProps {
    children?: ReactNode,
    ratio: number,
    onPress?: () => void,
}

const Button = ({ children, ratio, onPress }: ButtonProps) => {
    const [selected, setSelected] = useState(false);
    return (
        <Pressable onPressIn={() => setSelected(!selected)} onPress={onPress} onPressOut={() => setSelected(!selected)} style={[styles.button, {
            backgroundColor: selected ? colors.primary : colors.white
        }]}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.buttonText, {
                fontSize: ratio * 100,
                margin: ratio * 5,
                color: selected ? colors.white : colors.primary
            }]}>
                {children}
            </Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: colors.primary,
        borderRadius: 32,
        width: '33%',
        height: '50%',
    },
    buttonText: {
        fontFamily: fonts.Pretendard_Bold,
        color: colors.primary,
    }
});

export default Button;