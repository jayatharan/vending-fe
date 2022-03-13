import { createReducer, on } from "@ngrx/store";
import { Token } from "src/app/model/token.model";
import { User } from "src/app/model/user.model";
import { loginFailure, loginRequest, loginSuccess, logout } from "./auth.actions";

export interface AuthState {
    token?:Token,
    user?:User,
    loginError?:string,
    loading:boolean,
    success:boolean,
    isAdmin:boolean
}

const authDataString = localStorage.getItem('authData')
const authData = authDataString?JSON.parse(authDataString):null

export const initialAuthState: AuthState = {
    token:authData?.token,
    user:authData?.user,
    loading:false,
    success:authData?true:false,
    isAdmin:isUserAdmin(authData)
}

function isUserAdmin (ad:any) {
    if(ad){
        if(ad.user.role === 'admin' ) return true
    }
    return false
}

const _authReducer = createReducer(
    initialAuthState,
    on(loginSuccess, (state, { authData }) => {
        localStorage.setItem('authData',JSON.stringify(authData))
        return{
            loading:false,
            success:true,
            loginError:"",
            token:authData.token,
            user:authData.user,
            isAdmin:isUserAdmin(authData)
        }
    }),
    on(loginFailure, (state, { error }) => {
        localStorage.removeItem('authData')
        return{
            loading:false,
            success:false,
            isAdmin:false,
            loginError:error
        }
    }),
    on(loginRequest, (state, { credential })=>{
        localStorage.removeItem('authData')
        return{
            loading:true,
            success:false,
            isAdmin:false
        }
    }),
    on(logout, (state, {})=>{
        localStorage.removeItem('authData')
        return{
            loading:false,
            success:false,
            isAdmin:false
        }
    })
)

export function authReducer(state:any, action:any){
    return _authReducer(state,action);
}