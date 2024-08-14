export interface LoginVerification {
    isLoggedIn: boolean,
    _token: string,
    errorMessage: string
}

export interface AppContextInitialState {
    token: string
}

/* export interface PersonalInfoContext {
    email: string,
    departmentId:number,
    registration:string,
    address:string,
    phone:string,
    linkedin:string,
    weblink:string,
    summary:string,
    file:string
} */
export interface AccountCreationVerification{
 isCreate?: boolean;
 errorMessage?: string;
}


export interface NewAccountData
{
    firstName: string,
    lastName: string,
    gender: BigInteger,
    email: string,
    password: string,
}
export interface SignUpFormData {
    firstName: string;
    lastName: string;
    gender: number;
    email: string;
    password: string;
  }
