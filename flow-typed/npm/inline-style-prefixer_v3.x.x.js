// flow-typed signature: b0b6ad779740c1b469e0d05f8960ad15
// flow-typed version: c6154227d1/inline-style-prefixer_v3.x.x/flow_>=v0.104.x

declare module 'inline-style-prefixer' {
  declare type Config = {
    userAgent?: string,
    keepUnprefixed?: boolean,
    ...
  }
  declare class Prefixer {
    constructor(config?: Config): Prefixer;
    prefix(styles: Object): Object;
  }

  declare module.exports: typeof Prefixer
}

declare module 'inline-style-prefixer/static' {
  declare module.exports: (Object) => Object
}
