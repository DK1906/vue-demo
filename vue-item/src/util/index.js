export function getUsername (){
    let username ="";
    if(sessionStorage.userInfo){
        username = JSON.parse(sessionStorage.userInfo).username
    }
    return username;
}