import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this.isAuth = false // вернуть на false
        this.user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    get isAuthorized() {
        return this.isAuth
    }
    get userInfo() {
        return this.user
    }
}