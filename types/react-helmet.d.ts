/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-helmet' {
  import { Component, ReactNode } from 'react';

  interface HelmetProps {
    base?: any;
    bodyAttributes?: any;
    defaultTitle?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    htmlAttributes?: any;
    onChangeClientState?: (newState: any) => void;
    link?: any[];
    meta?: any[];
    noscript?: any[];
    script?: any[];
    style?: any[];
    title?: string;
    titleAttributes?: any;
    titleTemplate?: string;
    priority?: string;
    children?: ReactNode;
  }

  export class Helmet extends Component<HelmetProps> {}
  export default Helmet;
}
