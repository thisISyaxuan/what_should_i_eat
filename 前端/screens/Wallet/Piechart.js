import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const data = [
    { color: '#415CA4', value: 341 },//藍 早餐
    { color: '#E2E2E2', value: 100 },//淺白
  { color: '#6e9277', value: 172 },//綠
  { color: '#FFB755', value: 188 },//黃
];

const PieChartMoney = () => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentAngle = 10;

  return (
    <View style={styles.container}>
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
        <Text style={styles.label}>{total}€</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 24,
  },
});

export default PieChartMoney;
