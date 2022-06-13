import React, { ReactNode, useEffect, useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { colors, fonts } from "../styles/globalStyles";
import { diagnosisState, durationState, elbowFunctionState, medicineState } from "../recoil/states";
import { useRecoilState } from "recoil";

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

export const LargeButton = ({ children, unit, callback }: {
    children?: ReactNode,
    unit: number,
    callback?: () => void,
}) => {

    const [selectables, setSelectables] = useRecoilState(elbowFunctionState);

    const toggle = () => {
        if (!selectables.includes(`${children}`)) {
            if (callback) {
                callback();
            }
            setSelectables([
                ...selectables,
                `${children}`
            ]);
        } else if (selectables.includes(`${children}`)) {
            let idx = selectables.findIndex(el => el === `${children}`);
            setSelectables([
                ...selectables.slice(0, idx),
                ...selectables.slice(idx + 1),
            ]);
        }
    }

    return (
        <Pressable onPressIn={() => toggle()} style={[styles.largeButton, {
            backgroundColor: selectables.includes(`${children}`) ? colors.primary : colors.white,
            borderRadius: unit * 10,
            margin: 10
        }]}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.buttonText, {
                fontSize: unit * 5 + 30,
                margin: unit * 5 + 5,
                color: selectables.includes(`${children}`) ? colors.white : colors.black
            }]}>
                {children}
            </Text>
        </Pressable>
    )
};

export const LargeSingleButton = ({ name, children, unit, callback }: {
    children?: ReactNode,
    unit: number,
    callback?: () => void,
    name: string
}) => {

    const [selectable, setSelectable] = name === '질환 종류' ? useRecoilState(diagnosisState) : name === '병력 유무' ? useRecoilState(durationState) : useRecoilState(medicineState);

    const toggle = () => {
        if (selectable !== `${children}`) {
            if (callback) {
                callback();
            }
            setSelectable(`${children}`);
        } else {
            setSelectable('');
        }
    }

    return (
        <Pressable onPressIn={() => toggle()} style={[styles.largeButton, {
            backgroundColor: selectable === `${children}` ? colors.primary : colors.white,
            borderRadius: unit * 10,
            margin: 10
        }]}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.buttonText, {
                fontSize: unit * 5 + 30,
                margin: unit * 5 + 5,
                color: selectable === `${children}` ? colors.white : colors.black
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
