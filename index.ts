const M = [1];
const D = [1];
for (let i = 0, m = 1, d = 1; i < 24; i++) {
  M.push(m <<= 1);
  D.push(d *= .5);
}
const power2 = (e: number) => e < 0 ? D[-e] : M[e];

function uncached_fromBits(n: number) {
  // n &= 0xFFFF;
  const f = calc((n >> 10) & 0x1F, n & 0x3FF);
  return (n >> 15) ? -f : f;
}

function calc(exponent: number, fraction: number) {
  function binary(bias: number, payload: number) {
    for (; fraction; fraction >>= 1) {
      if (fraction & 1) payload += power2(bias);
      ++bias;
    }
    return payload;
  }

  if (exponent === 0x1F) return fraction ? NaN : Infinity;
  if (!exponent) return binary(-24, 0);
  exponent -= 0xF;
  return binary(exponent - 10, power2(exponent));
}

const _cache: number[] = [];
export const Float16 = {
  fromBits: (n: number) => _cache[n] ?? (_cache[n] = uncached_fromBits(n)),
  uncached_fromBits,
};