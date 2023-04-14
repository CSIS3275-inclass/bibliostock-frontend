import http from "@/http-common";

class UserSessionService{
    login(isManager, loginRequest){
        return http.post(`/login/${isManager}`,loginRequest);
    }

    customerSignup(signupRequest){
        return http.post(`/signup/customer`,signupRequest);
    }

    managerSignup(userId,password,signupRequest,isAdmin){
        return new Promise((resolve,reject)=>{
            // first build login request
            this.getUser(userId)
                .then(response=>{
                    const user = response.data;
                    const loginRequest = {
                        "userName": user.username,
                        "password": password
                    }

                    const body = {
                        "loginRequest": loginRequest,
                        "signUpRequest": signupRequest,
                        "isAdmin": isAdmin
                    }
                    // sign up new manager
                    http.post(`/signup/manager`,body)
                        .then(response=>{
                            console.log(response);
                            resolve(response);
                        })
                        .catch(error=>{
                            reject(error);
                        })

                })
                .catch(error=>{
                    reject(error);
                })
        })

    }

    getUser(userId){
        const params = {};
        params.userId=userId;
        
        return http.get("/user",{params});
    }

    // display popup and take to login page when user doesn't have write permission to access specific page
    validateSession(userId,component){
        return new Promise((resolve,reject)=>{
            this.getUser(userId)
                .then(response=>{
                    const user = response.data;
                    if(!user.isActive)
                    {
                        window.confirm("You are not logged in");
                        component.$router.push('/login');
                        resolve(user);
                    } 
                    else{
                        resolve(user.isActive);
                    }
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    logout(userId){
        //no need to clear userId since we already manage isActive
        window.location.reload(); //reload page
        return http.post(`/user/${userId}/logout`);
    }

}

export default new UserSessionService();