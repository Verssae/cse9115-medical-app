import React, { useState } from "react";
import { Image, LayoutChangeEvent, LayoutRectangle, useWindowDimensions, View } from "react-native";
import { ElbowPart } from "../data/elbowTest"
import { styles } from "../styles/screenStyles";

const ElbowPartImage = ({ uri, name, width, height, left, top, rotate, deg }: ElbowPart) => {
    let degree = deg ?? 0
    let behinds = ["AngleRed", "AngleOrange"];
    if (degree < 60) {
        behinds = ["AngleOrange", "AngleBlue"];
    }
    else if (degree < 120) {
        behinds = ["AngleRed", "AngleBlue"];
    }
    else {
        behinds = ["AngleRed", "AngleOrange"];
    }

    return (
        <Image source={uri} style={[{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: width,
            height: height,
            opacity: behinds.includes(name) ? 0 : 1
        }, rotate ? {
            transform: [
                { rotate: `-${degree}deg` }
            ]
        } : {}]}
        />

    )
};

const Elbow = ({ parts, baseWidth, baseHeight, parentDimensions, deg }: {
    parts: ElbowPart[],
    baseWidth: number,
    baseHeight: number,
    parentDimensions: LayoutRectangle,
    deg: number
}) => {
    let { width, height } = parentDimensions;

    width = width * baseHeight / baseWidth > height ? height * baseWidth / baseHeight : width;
    height = height * baseWidth / baseHeight > width ? width * baseHeight / baseWidth : height;

    const resize = (old: number) => baseWidth > baseHeight ? old * width / baseWidth : old * height / baseHeight;

    return (
        <View style={{
            width: baseWidth > baseHeight ? width : height * baseWidth / baseHeight,
            height: baseWidth > baseHeight ? width * baseHeight / baseWidth : height
        }}>

            {parts.map((data, i) => (
                <ElbowPartImage key={i} {...{ ...data, width: resize(data.width), height: resize(data.height) }} deg={deg}/>
            ))}
        </View>
    )
};

export default Elbow;