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

    async initSchema(entityType, entitySchema, model = null) {
        try {
            let schemaDetails = mongoose.model(entityType, entityType[entitySchema]).schema['tree'];
            if (schemaDetails) {
                this.schemaDetails = schemaDetails
            } else {
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
            let validateResult = await this.validateSchemaFields();
            if (validateResult.error) {
                return {error: true, message: validateResult.message}
            }
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

    async getAllResource(populatedFields = {}, fields = {}) {
        try {
            let validate;
            validate =  await this.validateQueryParams();
            if (validate.error) {
                return validate;
            }
            let result = await mongooseOperation.collectionMethod(this.entityType, this.entitySchema, this.skip, this.limit, populatedFields, this.filteredParams, this.sortParams, fields);
            if (result.error) {
                return {error: true, message: result.message ? result.message : "Internal Server Error"}
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
            // let validateResult = await this.validateSchemaFields();
            // if (validateResult.error) {
            //     return {error: true, message: validateResult.message}
            // }
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


    async deleteResource(entityId) {
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


    // validating the fields and require or not
    async validateSchemaFields() {
        let errorMessage = '';
        let schemaDetails = this.schemaDetails;
        let schemaFields = Object.keys(schemaDetails);
        let req_body_field;
        if (this.req_body && this.req_body._doc) {
            req_body_field = Object.keys(this.req_body._doc);
        } else {
            req_body_field = Object.keys(this.req_body);
        }
        if (errorMessage) {
            return false
        }

        const missingFields = schemaFields.filter(field => {
            if (field !== '_id') {
                return schemaDetails[field].require && !req_body_field.includes(field)
            }
        })
        if (missingFields.length > 0) {
            errorMessage = `${missingFields.join(', ')} ${missingFields.length === 1 ? 'is' : 'are'} missing in the request body`;
        }
        if (errorMessage) {
            return {error: true, message: errorMessage};
        }
        return {error: false, message: 'All required fields are present in the request body'};
    }


    async validateQueryParams() {
        let errorMessage = '';
        let schemaDetails = this.schemaDetails;
        let keys = Object.keys(this.queryParams);
        keys.forEach(key => {
            if (errorMessage) {
                return false;
            }
            let data = {
                type: 'filter',
                 field_name:key,
                 operator:'eq',
                field_value:this.queryParams[key]
            }
            if (!this.filteredParams[data.field_name]) {
                this.filteredParams[data.field_name] = {};
            }
            if (!this.filteredParams[data.field_name][`$${data.operator}`]) {
                this.filteredParams[data.field_name][`$${data.operator}`] = '';
            }
            if (schemaDetails[data.field_name] && schemaDetails[data.field_name].type.name === 'Number') {
                data.field_value = parseInt(data.field_value);
            }
            this.filteredParams[data.field_name][`$${data.operator}`] = data.field_value;

        })
        if (errorMessage) {
            return {error: true, message: errorMessage, status: 400};
        }
        return {error: false, message: ''};
    }


}


export default BaseController