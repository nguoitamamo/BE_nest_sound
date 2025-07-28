

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string[];
    avatar?: string;
    typeLogin: string;
    following: string[];
    followers: string[];
    shared: string[];

}

export interface IUserOptional {
    name: string;

    avatar: string;

}