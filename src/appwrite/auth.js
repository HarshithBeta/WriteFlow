import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                await this.login({ email, password });
                window.location.reload(); // Force a refresh after login
            }
            return userAccount;
        } catch (err) {
            console.error("Error in createAccount():", err);
            throw err;
        }
    }
    
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (err) {
            console.error("Error in login():", err);
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (err) {
            console.error("Appwrite error: getCurrentUser", err);
            return null;
        }
    }

    async logout() {
        try {
          await this.account.deleteSessions(); // Delete all sessions
          return true;
        } catch (err) {
          console.error("Appwrite error: logout", err);
          return false;
        }
      }
      
}

const authService = new AuthService();
export default authService;
