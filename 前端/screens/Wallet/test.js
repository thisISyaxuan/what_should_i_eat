import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const data = [
    { color: '#415CA4', value: 341,which_meal:'早餐' },//藍 早餐
    { color: '#E2E2E2', value: 100,which_meal:'午餐' },//淺白
  { color: '#6e9277', value: 172,which_meal:'晚餐' },//綠
  { color: '#FFB755', value: 188,which_meal:'其他' },//黃
];

const Test = () => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentAngle = 10;

  return (
    <View style={styles.container}>
      <View style={styles.graph}>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
              const angle = (item.value / total) * 360;

              const circleStyle = {
                cx: '50%',
                cy: '50%',
                r: radius,
                stroke: item.color,
                fill: 'transparent',
                strokeWidth: '40',
                strokeDasharray: circleCircumference,
                strokeDashoffset: strokeDashoffset,
                rotation: currentAngle,
                originX: '90',
                originY: '90',
                //strokeLinecap: 'round',
              };

              currentAngle += angle;

              return <Circle key={index} {...circleStyle} />;
            })}
          </G>
        </Svg>
        <Text style={styles.label}>${total}</Text>
      </View>

      <View style={styles.detail}>
      {data.map((item, index) => (
        <View key={index} style={[{ flexDirection:'row',alignItems: 'center',padding:10}]}>
          <View style={[styles.square, { backgroundColor: item.color }]} />
          <Text style={[{ fontSize:16}]}> {item.which_meal} : {item.value}</Text>
        </View>
      ))}
    </View>
    </View>

    <View style={styles.text}>
      {data.map((item, index) => (
    <View key={index} style={[{ flexDirection: 'row', alignItems: 'center', padding: 10 }]}>
      <View style={[styles.square, { backgroundColor: item.color }]} />
      <Text style={[{ fontSize: 16 }]}> {item.which_meal} : {((item.value / total) * 100).toFixed(2)}%  {item.value}元</Text>
    </View>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //alignItems: 'center',
  },
  detail:{
    flex:4,
    padding:10,
    //backgroundColor:'red'
    //flexDirection:'row',
    justifyContent: 'center',
  },
  square: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  graph:{
    padding:20,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#c0c0c0',
  },
  text:{
    padding:20,
  },
  graphWrapper: {
    flex:5,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 24,
    backgroundColor:'gray',
  },
});

export default Test;
