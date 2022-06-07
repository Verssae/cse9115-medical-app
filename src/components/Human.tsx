import React, { useEffect, useState } from "react";
import {
    Image, StyleSheet, View, LayoutChangeEvent, Pressable, useWindowDimensions, LayoutRectangle
} from "react-native";
import { useRecoilState } from "recoil";
import { Part, ToKorean } from "../data/humans";
import { symptomsState } from "../recoil/symptom";
import { colors } from "../styles/globalStyles";
import * as Speech from 'expo-speech';

const HumanPartImage = ({ uri, name, direction, width, height, left, top, disabled }: Part) => {
    const [selected, setSelected] = useState(false);
    const [symptoms, setSymptoms] = useRecoilState(symptomsState);

    const cmp = (x: Pick<Part, "direction" | "name">) => x.name === name && x.direction === direction

    const onPress = () => {
        setSelected(!selected);
        let verse = ['arm', 'leg', 'chest', 'back', 'waist', 'chest'].includes(name) ? ToKorean[(direction ?? '') + name] : direction ? ToKorean[direction] + name : name;
        if (symptoms.some(cmp)) {
            
            Speech.speak(verse + " 취소", {
                rate: 0.8
            });
            setSymptoms(symptoms.filter(symptom => !cmp(symptom)))
        } else {
            
            Speech.speak(verse, {
                rate: 0.8
            });
            setSymptoms([
                ...symptoms,
                { name: name, direction: direction }
            ]);
        }
    };

    useEffect(() => {
        if (symptoms.some(cmp)) {
            setSelected(true);
            
        } else {
            setSelected(false);
        }
    }, [symptoms]);

    return (
        <Pressable onPress={onPress}
            style={{
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
            }}
            disabled={disabled ? true : false}>
            <Image source={uri} style={[{
                width: width,
                height: height,
            }, selected && !disabled ? {
                tintColor: colors.selected
            } : {}]} />
        </Pressable>
    )
};

const Human = ({ parts, baseWidth, baseHeight, parentDimensions }: {
    parts: Part[],
    baseWidth: number,
    baseHeight: number,
    parentDimensions: LayoutRectangle
}) => {
    let { width, height } = parentDimensions;
    
    width = width * baseHeight / baseWidth > height ? height  * baseWidth / baseHeight : width;
    height = height * baseWidth / baseHeight > width ? width * baseHeight / baseWidth : height;

    const resize = (old: number) => baseWidth > baseHeight ? old * width / baseWidth : old * height / baseHeight;

    return (
        <View style={{
            width: baseWidth > baseHeight ? width : height * baseWidth / baseHeight,
            height: baseWidth > baseHeight ? width * baseHeight / baseWidth : height,
        }}>
            
            {parts.map((data, i) => (
                <HumanPartImage key={i} {...{ ...data, width: resize(data.width), height: resize(data.height) }} />
            ))}
        </View>
    )
};



export default Human;