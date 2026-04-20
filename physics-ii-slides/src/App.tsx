/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Presentation } from './components/Presentation';
import {
  Slide1_Title,
  Slide2_TOC,
  Slide_Duality,
  Slide3_PEIntro,
  Slide4_Threshold,
  Slide_SolarPanel,
  Slide5_EinsteinEquation,
  Slide6_Cell,
  Slide7_ComptonIntro,
  Slide8_Assumptions,
  Slide9_Derivation,
  Slide10_Comparison,
  Slide13_ThankYou
} from './components/Slides';

export default function App() {
  return (
    <Presentation>
      <Slide1_Title />
      <Slide2_TOC />
      <Slide_Duality />
      <Slide3_PEIntro />
      <Slide4_Threshold />
      <Slide_SolarPanel />
      <Slide5_EinsteinEquation />
      <Slide6_Cell />
      <Slide7_ComptonIntro />
      <Slide8_Assumptions />
      <Slide9_Derivation />
      <Slide10_Comparison />
      <Slide13_ThankYou />
    </Presentation>
  );
}

