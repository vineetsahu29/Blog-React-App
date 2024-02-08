import conf from '../config/config.js' 

import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account()

    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
        } catch (error) {
            throw error
        }

        if (userAccount) {
            //call login method
            this.login({email,password})
        } else {
            return userAccount
        }
    }

    async login({email,password}){
           
           try {
            return await this.account.createEmailSession(email,password)
           } catch (error) {
             throw error
           }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService
