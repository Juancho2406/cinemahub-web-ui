import React from 'react';
import './App.css';
import { TamaguiProvider, View } from '@tamagui/core'
import { config} from './tamagui.config' // your configuration

export default function App() {
  return (
  <TamaguiProvider config={config}>
    <View width={200} height={200} background={"rgba(0,0,0,0.2)"}/>
  </TamaguiProvider>
  )
}