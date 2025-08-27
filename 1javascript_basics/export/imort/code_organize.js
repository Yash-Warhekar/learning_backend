
//understanding how to organize code into modules and how to import/export them in node.js

// // import and exports
// in CJS--> commpon js  mostly used in nodejs
// we use require keyword for import 
// and use module.export or exports keyword for export

// in ESM--> ecmascript modules
// we use import statement for import
// and export statement for export

// for import and export in cjs or Node

// file1.js
let a=10
let b=12

module.exports=a    //for exporting single 
module.exports={a:a,b:b} or {a,b}   //for multiple export

module.exports.a=a //alternative
module.exports.b=b


//file2.js
const a=require('./file1.js')  //if in same dir and single value
console.log(a)

const data=require('./file1.js')   //if in same dir and multiple value

console.log(data.a , data.b)