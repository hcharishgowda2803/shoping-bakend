import mongoose from "mongoose";
import MongooseOperations from "../mongodb/mongooseOperations.js";


const mongooseOperation = new MongooseOperations()


class BaseController {

    entityType;
    entitySchema;
    skip = 0;
    limit = 0;
    req_body;
    schemaDetails = {};
    queryParams = {};
    filteredParams = {};
    sortParams = {};
    showDeleted;
    searchParams = {}

    constructor() {
    }


// initialize the schema

    async initSchema(entityType, entitySchema, model=null) {
        try {
            let schemaDetails = mongoose.model(entityType, entityType[entitySchema]);
            if (schemaDetails) {
                this.schemaDetails = schemaDetails
            }else {
                    try {
                        if (!model || !mongoose.modelNames().includes(model.modelName)) {
                            return {error: true, message: `Model '${model.modelName}' not found.`}
                        }
                        const collection = await mongoose.connection.createCollection(model.collection.name);
                    } catch (error) {
                        return {error: true, message: error, status: 500}
                    }
            }
        } catch (error) {
            return {error: true, message: 'Schema initialization failed'}
        }

    }


// create entity

    async createEntity() {
        try {
            let result = await mongooseOperation.createMethod(this.entityType, this.entitySchema, this.req_body);
            if (result.error) {
                return {error: true, message: result.message}
            }
            return result
        } catch (error) {
            if (error.status) {
                return error
            } else {
                return {error: true, message: error.message, status: 500}
            }
        }
    }

    async getAllResource(populatedFields={},fields={}){
        try{
            let result = await mongooseOperation.collectionMethod(this.entityType,this.entitySchema,this.skip,this.limit,populatedFields,this.filteredParams,this.sortParams,fields);
            if(result.error){
                return {error:true, message: result.message ? result.message : "Internal Server Error"}
            }
            return result
        }catch (error) {
            if (error.status) {
                return error
            } else {
                return {error: true, message: error.message, status: 500}
            }
        }
    }

    async getResource(entityId, populatedFields = {}, fields = {}, conditions = {}) {
        try {
            let result = await mongooseOperation.retrieveMethod(this.entityType, entityId, this.entitySchema, populatedFields, fields);
            if (result.error) {
                return {error: true, message: result.message}
            }
            return result
        } catch (error) {
            if (error.status) {
                return error
            } else {
                return {error: true, message: error.message, status: 500}
            }
        }
    }


    async updateResource(entityId) {
        try {
            let updatedResult = await mongooseOperation.updateMethod(this.entityType, entityId, this.entitySchema, this.req_body);
            if (updatedResult.error) {
                return {error: true, message: updatedResult.message}
            }
            return updatedResult
        } catch (error) {
            if (error.status) {
                return error
            } else {
                return {error: true, message: error.message, status: 500}
            }
        }
    }


    async deleteResource(entityId){
        try {
            let deletedResult = await mongooseOperation.deleteMethod(this.entityType, entityId, this.entitySchema);
            if (deletedResult.error) {
                return {error: true, message: deletedResult.message}
            }
            return deletedResult

        } catch (error) {
            if (error.status) {
                return error
            } else {
                return {error: true, message: error.message, status: 500}
            }
        }
    }

}


export default BaseController