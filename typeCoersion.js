// Allowed chars: ({[]})\/>+-=!

function num(n) {
  if (n === 0) return "+[]";

  const one = "+!![]";

  let total = one;

  for (let i = 1; i < n; i++) {
    total = `${total} + ${one}`;
  }

  return total;
}

const map = {};

const TRUE_STR = "!![] + []";
const FALSE_STR = "![] + []";

map.t = `(${TRUE_STR})[${num(0)}]`;
map.r = `(${TRUE_STR})[${num(1)}]`;
map.u = `(${TRUE_STR})[${num(2)}]`;
map.e = `(${TRUE_STR})[${num(3)}]`;

map.f = `(${FALSE_STR})[${num(0)}]`;
map.a = `(${FALSE_STR})[${num(1)}]`;
map.l = `(${FALSE_STR})[${num(2)}]`;
map.s = `(${FALSE_STR})[${num(3)}]`;
