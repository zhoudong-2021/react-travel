/// <reference types="redux-persist" />

declare module "*.css" {
    const css : {[key:string]:string}
    export default css;
}

declare module 'react-credit-cards';