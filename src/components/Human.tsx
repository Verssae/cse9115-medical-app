import React, { useEffect, useState } from "react";
import {
    Image, View, Pressable, LayoutRectangle
} from "react-native";
import { useRecoilState } from "recoil";
import { Part, ToKorean } from "../data/humans";
import { detailSymptoms, symptomsState } from "../recoil/states";
import { colors } from "../styles/globalStyles";
import { speak } from "../utils/speaker";

interface Prop extends Part {
    overview: boolean
}

const HumanPartImage = ({ uri, name, direction, width, height, left, top, disabled, overview } : Prop) => {
    const [selected, setSelected] = useState(false);
    const [symptoms, setSymptoms] = overview ? useRecoilState(symptomsState) : useRecoilState(detailSymptoms);

    const cmp = (x: Pick<Part, "direction" | "name">) => x.name === name && x.direction === direction

    const onPress = () => {
        setSelected(!selected);
        let verse = ['arm', 'leg', 'chest', 'back', 'waist', 'chest'].includes(name) ? ToKorean[(direction ?? '') + name] : direction ? ToKorean[direction] + name : name;
        if (symptoms.some(cmp)) {
            
            speak(verse + " 취소");
            setSymptoms(symptoms.filter(symptom => !cmp(symptom)))
        } else {
            
            speak(verse);
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

const Human = ({ parts, baseWidth, baseHeight, parentDimensions, overview = false }: {
    parts: Part[],
    baseWidth: number,
    baseHeight: number,
    parentDimensions: LayoutRectangle,
    overview?: boolean
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
                <HumanPartImage key={i} {...{ ...data, width: resize(data.width), height: resize(data.height), overview: overview }}/>
            ))}
        </View>
    )
};



export default Human;