import React, { ReactNode, useEffect, useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { colors, fonts } from "../styles/globalStyles";

interface ButtonProps {
    children?: ReactNode,
    unit: number,
    callback?: () => void,
};

export const Button = ({ children, unit, callback }: ButtonProps) => {
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
                fontSize: unit * 40,
                margin: unit * 5,
                color: selected ? colors.white : colors.primary
            }]}>
                {children}
            </Text>
        </Pressable>
    )
};

export const LargeButton = ({ children, unit, callback }: ButtonProps) => {
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        if (callback !== undefined && selected) {
            callback();
        }
    }, [selected]);
    return (
        <Pressable onPressIn={() => setSelected(!selected)} style={[styles.largeButton, {
            backgroundColor: selected ? colors.primary : colors.white,
            borderRadius: unit * 10, 
            margin: 10
        }]}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.buttonText, {
                fontSize: unit * 5 + 30,
                margin: unit * 5 + 5,
                color: selected ? colors.white : colors.black
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
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: colors.primary,
        width: '33%',
        height: '50%',
    },
    buttonText: {
        fontFamily: fonts.Pretendard_Bold,
        color: colors.primary,
    },
    largeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: colors.primary,
    },
});
