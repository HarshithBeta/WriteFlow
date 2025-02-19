import conf from "/src/conf/conf.js";
import { Client, Databases, Storage, Query, ID, Permission, Role } from "appwrite"; // Fix import

class Service {
  constructor() {
    // Initialize Client instance
    this.client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Ensure correct endpoint
      .setProject(conf.appWriteProjectId); // Ensure project ID is set

    // Initialize Appwrite services
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ✅ Fetch a single post by slug
  async getPost(slug) {
    try {
      return await this.databases.getDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
    } catch (err) {
      console.error("Error in getPost():", err);
      return null;
    }
  }

  // ✅ Fetch all active posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId, queries);
    } catch (err) {
      console.error("Error in getPosts():", err);
      return null;
    }
  }

  // ✅ Create a post with permissions
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId },
        [
          Permission.read(Role.user(userId)), // Only the user can read their post
          Permission.update(Role.user(userId)), // Only the user can edit
          Permission.delete(Role.user(userId)), // Only the user can delete
        ]
      );
    } catch (err) {
      console.error("Error in createPost():", err);
      return null;
    }
  }

  // ✅ Update a post (ensures correct permissions)
  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (err) {
      console.error("Error in updatePost():", err);
      return null;
    }
  }

  // ✅ Delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
      return true;
    } catch (err) {
      console.error("Error in deletePost():", err);
      return false;
    }
  }

  // ✅ Upload a file to storage
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.error("Error in uploadFile():", err);
      return null;
    }
  }

  // ✅ Delete a file from storage
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
    } catch (err) {
      console.error("Error in deleteFile():", err);
      return false;
    }
  }

  // ✅ Fix getFilePreview method
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appWriteBucketId, fileId).toString();
    } catch (err) {
      console.error("Appwrite service: getFilePreview()", err);
      return "";
    }
  }
  
}

export default new Service();
