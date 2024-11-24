import {Svg, Polygon } from 'react-native-svg'
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { stringify } from 'querystring';


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
const dummyStrength : strength[] = [{
    name: 'Dummy Name',
    points: 2
},
{
    name: 'Dummy Name',
    points: 3
},
{
    name: 'Dummy Name',
    points: 4
}]

function strengthView(points: number, name: string){
    return(
        <View style={[style.statContainer]}>
            <View style={[style.statRow, { width: 100* points } ]}>
                {name}
            </View>
        </View>

    )
}
function listOfStregths() {
    const [strengths, listOfStregth] = useState(dummyStrength);
    let stregthsView = []
    for(let strengthIdx in strengths){
        const strength = strengths[strengthIdx]
        stregthsView.push(strengthView(strength.points, strength.name))
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

const style = StyleSheet.create({
      statRow: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
        flexDirection: 'row'
      },
      statContainer: {
        width: '100%'
      }
      
    })