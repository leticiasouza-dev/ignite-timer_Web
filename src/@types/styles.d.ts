import { defaultTheme } from './../styles/themes/default';
//arquivo de definição de tipagem de estilos

import "styled-components";

type ThemeType = typeof defaultTheme

declare module 'styles-components'{ // definindo a tipagem do meu styles componets
     export interface DefaultTheme extends ThemeType {}
}