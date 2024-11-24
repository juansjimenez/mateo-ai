import {Svg, Polygon } from 'react-native-svg'
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

function Hexagon(){
    return(
        
        <Svg height="300" width="300" >
                <Polygon
                  points="00,150 225,280 75,280 0,150 75,20 225,20 300,150 225,280"
                  stroke="black"
                  fill="white"
                  strokeWidth="1"
                >
                </Polygon>
        </Svg>
    )
}
type strength = {
    name: string
    points: number
}
const dummyStrength : strength = {
    name: 'Dummy Name',
    points: 2
}

function strengthView(){
    return(
        <View>
            hi
        </View>

    )
}
function listOfStregths() {
    const [strengths, listOfStregth] = useState([dummyStrength]);
    let stregthsView = []
    for(let strengthIdx in strengths){
        const strength = strengths[strengthIdx]
        stregthsView.push(strengthView())
    }
    return stregthsView
}
export default function userStats(){
    return(
        <View>
            {listOfStregths()}
        </View>
    )
}