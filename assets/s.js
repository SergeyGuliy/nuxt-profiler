let z = []
for (let i = 1; i <= 999; i++) {
  z.push(i);
}
let v = [
  function(args){return args.filter(x => x%2 === 1)},
  function(args){return args.filter(x => x%3 === 1)},
  function(args){return args.filter(x => x%4 === 1)},
  function(args){return args.filter(x => x%5 === 1)},
  function(args){return args.filter(x => x%6 === 1)},
  function(args){return args.filter(x => x%7 === 1)},
  function(args){return args.filter(x => x%8 === 1)},
  function(args){return args.filter(x => x%9 === 1)},
  function(args){return args.filter(x => x%10 === 1)},
  ]

for (let i of v){
  z = i(z)
  console.log(z)
}
