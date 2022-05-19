import React, { ReactNode, useEffect, useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { colors, fonts } from "../styles/globalStyles";

interface ButtonProps {
    children?: ReactNode,
    unit: number,
    callback?: () => void,
};

const Button = ({ children, unit, callback }: ButtonProps) => {
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        if (callback !== undefined && selected) {
            callback();
        }
    }, [selected]);
    return (
        <Pressable onPressIn={() => setSelected(!selected)} onPressOut={() => setSelected(!selected)} style={[styles.button, {
            backgroundColor: selected ? colors.primary : colors.white,
            borderRadius: unit * 10, 
        }]}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.buttonText, {
                fontSize: unit * 100,
                margin: unit * 10,
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
        width: '33%',
        height: '50%',
    },
    buttonText: {
        fontFamily: fonts.Pretendard_Bold,
        color: colors.primary,
    }
});

export default Button;