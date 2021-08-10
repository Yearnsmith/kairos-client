// import jwtDecode from "jwt-decode"
// 
// export function getUserFromJWT(jwt){
//     if (jwt){
//         let decoded = jwtDecode(jwt)
//         let user = {
//             email: decoded.email,
//             id: decoded.id
//         }
//         return user
//     }
// }
// 
// export function getEmailFromJWT(jwt){
//     if (jwt){
//         let user = jwtDecode(jwt)
//         return user.email
//     }
// }
// 
// // getUserFromJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")