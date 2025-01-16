// class ApiError extends Error{
//     constructor(
//         statusCode,
//         message="Something went wrong",
//         errors=[],
//         stack=""
//     ){
//         super(message)
//         this.statusCode=statusCode
//         this.data=null
//         this.message=message
//         this.success=false;
//         this.errors=errors

//         if(stack){
//             this.stack=stack
//         }else{
//             Error.captureStackTrace(this,this.constructor)
//         }

//     }
    
// }
class ApiError{
    constructor(statusCode,message="Error"){
        this.statusCode=statusCode
        // this.data=data
        this.message=message
        this.success=statusCode<400
    }
}

export {ApiError}