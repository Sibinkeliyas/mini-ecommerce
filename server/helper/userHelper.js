const useShema = require('../model/user')
const bcrypt = require('bcrypt')

module.exports = {
    doAddUser : (userData) => {
        return new Promise((resolve, reject) => {
           useShema.findOne({name : userData.name}).then((data) => {
                if(!data) {
                    bcrypt.hash(userData.password , 10 , (err , res) => {
                    userData.password = res
                        useShema.create(userData).then((data) => {
                            resolve(data)
                        }).catch((err) => {
                                reject(err)
                        })
                    })
                } else {
                    reject('Already registerd')
                }
           })
        })
    } ,
    doLogin : ({name , password}) => {
        return new Promise((resolve, reject) => {
            useShema.findOne({name : name}).then((data) => {
                if(data) {
                    bcrypt.compare(password , data.password , (err , res) => {
                        if(res) {
                            resolve(data)
                        } else {
                            reject('Password is not matching')
                        }
                    })
                } else {
                    reject('Couldnt find the user')
                }
            })
        })
    }
}