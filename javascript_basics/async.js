//callback , promises and async /await


//callback
// function connectServer(cbfn){
//     console.log('connecting to server')
//     setTimeout(() => {
//         console.log('connected....')
//         cbfn()
//     }, 2000);
// }

// function fetchCources(cbfn){
//     console.log('fetching cources...')
//     setTimeout(() => {
//         cbfn(['course1','course2','course3'])
//     }, 2000);
// }

// function showCources(data){
//     console.log(data)
// }

// connectServer(function(){
//     fetchCources(function(data){
//         console.log('fetchec successfully')
//         showCources(data)
//     })
// });


//promises
function connectServer(){
    console.log('connectin server...')
    return new Promise(function(resolve,reject){
        setTimeout(() => {
            resolve('connected successfully')
        }, 2000);
    })
}

function getCourses(){
    console.log('getting cources')
    return new Promise(function(resolve,reject){
        setTimeout(() => {
            resolve(['course1','course2','course3'])
        }, 2000);
    })
}

connectServer()
.then(function(response){
    console.log(response)
    return getCourses()
})
.then(function (response){
    console.log(response)
})


// // import and exports
// in CJS--> commpon js  mostly used in nodejs
// we use require keyword for import 
// and use module.export or exports keyword for export

// in ESM--> ecmascript modules
// we use import statement for import
// and export statement for export

