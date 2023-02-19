# half-float

Utility for converting 16-bit floats. Might be useful for dealing with some special image formats (e.g. `.exr` format).

## Install

```sh
npm i @goldfinger87/half-float
```

## Usage

```js
import { Float16 } from '@goldfinger87/half-float';

console.log(Float16.fromBits(0x3C00));  // ==> 1.0
console.log(Float16.fromBits(0x3C01));  // ==> 1.0009765625
```

## Roadmap
- `toBits` function for converting back from half-float to binary bits (i.e., unsigned 16-bit integer)
- unit tests
- wasm implementation
- gpu (batched) implementation
- benchmark