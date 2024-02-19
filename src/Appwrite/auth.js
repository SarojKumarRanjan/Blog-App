import config from "../conf";
import { Account, ID, Client } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteurl)
      .setProject(config.appwriteprojectid);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method to directly login user after successfull account creation

        return await this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("error in login part in auth.js", error);
      throw error; // Rethrow the error
    }
  }
  async getCurrentUser(){
    // eslint-disable-next-line no-useless-catch
    try {
        return await this.account.get();
    } catch (error) {
         
        console.log("appwrite service in get current user",error);
        return null;
    }
    
   
    

    
  }

async logout(){
    // eslint-disable-next-line no-useless-catch
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        throw error;
    }
}

}

const authService = new AuthService();

export default authService;
