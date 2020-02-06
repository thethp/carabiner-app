import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Defs, G, Path, RadialGradient, Stop, Use } from 'react-native-svg';

export const renderFormBackground = () => {

  //# TO-DO : animate this nicely

  return (
    <View style={{position: 'absolute',top: 0,bottom: 0,right: 0,left: 0,width: '100%',height: '100%',backgroundColor: '#9571DC',flex: 1}}>
      <Svg width="100%" height="100%">
        <Defs>
            <RadialGradient cx="10%" cy="0%" fx="0%" fy="0%" r="90%" gradientTransform="matrix(0 .5625 -1 0 .5 -.281)" id="a">
                <Stop stopColor="#FFF" stopOpacity="0" offset="0%"/>
                <Stop stopColor="#A52E9F" offset="100%"/>
            </RadialGradient>
        </Defs>
        <Path d="M.993 0h900v1600h-900z" transform="translate(-.233 .721)" fill="url(#a)" fillRule="evenodd"/>
      </Svg>

      <Svg style={{position: 'absolute', top: 0}} width="100%" height="100%" preserveAspectRatio="xMidYMin meet" viewBox="0 0 900 1995">
          <G fill="none" fillRule="evenodd">
              <Path fill="#FFF" d="M-210.613 614.943l-6.825 1113.225L1143 1738.778V488.176L786.76 86.049 633.12 263.446 417.97 22.78 179.562 258.32 132 202.857z"/>
              <Path fill="#FFF" d="M-43 1714.5h1092v429H-43z"/>
              <Path stroke="#362950" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" d="M-210.613 600.45L132 198.45l112.573 136.329"/>
              <Path d="M95.651 277.2l23.517-25.862c4.83-5.312 13.052-5.702 18.364-.872a13 13 0 0 1 2.038 2.358l32.812 48.74a4 4 0 0 1-6.03 5.173l-24.1-22.24a24 24 0 0 0-26.599-4.03l-12.982 6.186a6 6 0 0 1-7.02-9.453z" fill="#D1CED7"/>
              <Path stroke="#362950" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" d="M180 251.38l241.528-241L694.922 334.78"/>
              <Path d="M357.363 104.888l44.588-47.875c4.894-5.253 13.12-5.546 18.374-.653a13 13 0 0 1 1.164 1.236l94.487 114.431a4 4 0 0 1-5.684 5.587L421.61 101.8a24 24 0 0 0-26.522-3.127l-30.603 15.648a6 6 0 0 1-7.122-9.432z" fill="#D1CED7"/>
              <G>
                  <Path d="M742.715 160.8l36.72-41.656c4.748-5.386 12.963-5.904 18.349-1.156a13 13 0 0 1 1.24 1.253l83.448 96.586a4 4 0 0 1-5.599 5.679l-74.862-62.85a24 24 0 0 0-27.204-2.533l-24.648 13.873a6 6 0 0 1-7.444-9.196z" fill="#D1CED7"/>
                  <Path stroke="#362950" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" d="M638 249.5L792.613 78.45 1155 520.5"/>
              </G>
          </G>
      </Svg>
    </View>
  );
}