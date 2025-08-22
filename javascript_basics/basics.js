// understanding variables, datatypes , loops , operatos , consitionsla statements

// variables
// declaration--> var, let and const
let a=10
var b='yash'
const c= 66

// datatypes
// types--> premitive and referenced
// premitive--> number, strings (can be copied directly)
let num=22
let name='yash warhekar'

//referenced datatypes--> can be made using [],(),{} 
let arr=[22,5,2,56]
let info={
    age:34,
    name:"yash",
    adress: "amravati"
}

// for copying referenced datatypes  ( split function)
arr=[1,2,3,4,5]
brr=arr  //(creates just reference)this is wrong changes in brr would change arr

brr=[...arr] //(this creates shallow copy)changes in brr will not change arr
brr[0]=88
console.log(brr)
console.log(arr) //will not changed



// operators--> + - / //(floor division) % * etc
// logical operators --> && (Logical AND)  and || (logical OR) 

// when  logical AND(&&) with falsy value gives second value 
// falsy values = 0 None NaN undefined null document.all ""

// in logical if any value true returns true



//loops--> for   for in    for each   while   do-while   for of
arr=[1,2,3,4,5]

// for (i=0;i<arr.length;i++){
//     console.log(arr[i])
// }

// for each
// arr.forEach((val,idx)=>{
//     console.log(val+5,idx)
// });

let obj={
    name:'yash',
    age:34
}
// for in loop
// for(values in obj){
//     console.log(values,obj[values])
// }


//conditionals--> if else  , else if , else


// ternery operatores
11>9 ? console.log('greater'):console.log('smaller')    



//functions 

function abab(){
    //function statements
}

function (){
    //anonymous function
}

()=>{
    //fat arrow functions
}

a=>{
    //fat arrow functions with one parameter
}

()=>10;  //fat arrow functions with implicit return