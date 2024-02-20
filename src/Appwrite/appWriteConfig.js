import config from "@/conf";
import { Databases,Query,Storage, Client,ID } from "appwrite"




export class databaseService{

    client = new Client();
    databases;
    bucket;

    constructor(){
         
        this.client
        .setEndpoint(config.appwriteurl)
      .setProject(config.appwriteprojectid);
      this.databases = new Databases(this.client);
      this.bucket = new Storage(this.client);


    }
    async createPost({title,slug,content,imageId,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwritedatabaseurl,
                config.appwritecollectionid,
                slug,
                {
                    content,title,imageId,status,userId
                }
            )
        } catch (error) {
            console.log("error in post setion", error);
        }
    }

    async updatepost(slug,{title,content,imageId,status}){

        try {
            return await this.databases.updateDocument(
                config.appwritedatabaseurl,
                config.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    imageId,
                    status
                }
            )
        } catch (error) {
            console.log("error in update part",error);
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument( config.appwritedatabaseurl,
                config.appwritecollectionid,
                slug,)
                return true;
        } catch (error) {
           console.log("error in delete part",error); 
           return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwritedatabaseurl,
                config.appwritecollectionid,
                slug
            )
        } catch (error) {
            console.log("error in getting post",error);
            return false;
        }
    }


    async getPosts( queries = [Query.equal("status","active")]){
        
        try {
            return  await this.databases.listDocuments(
                config.appwritedatabaseurl,
                config.appwritecollectionid,
                queries,
            );

        } catch (error) {
            console.log("error in getting all post",error);
            return false;
        }
    }

    async getUserPosts( userId){
        
        try {
            return  await this.databases.listDocuments(
                config.appwritedatabaseurl,
                config.appwritecollectionid,
                [Query.equal("userId",[userId.toString()])],
            );

        } catch (error) {
            console.log("error in getting all post",error);
            return false;
        }
    }


    //upload config

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwritebucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error in file upload",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                
                config.appwritebucketid,
                fileId
            )
            return true;
        } catch (error) {
           console.log("error in delete file ",error); 
           return false;
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwritebucketid,
                fileId
            )
        } catch (error) {
            console.log("errro in file preview",error);
            return false;

        }
    }
}


const DatabaseService = new databaseService();

export default DatabaseService;