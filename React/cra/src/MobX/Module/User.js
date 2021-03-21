import { autorun, makeAutoObservable, reaction } from 'mobx'

export default class User {
    constructor(){
        makeAutoObservable(this)
        this.userAddLog = reaction(
            ()=> this.user,
            (userList) => {
                console.log(userList)
            }
        )
    }
    userList = [];
    userAddLog = null
    get user() {
        return this.userList
    }

    addUser(user) {
        this.userList.push(user)
    }

    deleteUser(id) {
        this.userList.splice(id, 1)
    }
}