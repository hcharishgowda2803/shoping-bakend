import mongoose from 'mongoose'


class MongooseOperations {
    constructor() {

    }


//     create resource
    async createMethod(entityType, schemaName, postBody) {
        try {
            const entityModel = mongoose.model(entityType, entityType[schemaName]);
            //   generating custom id
            const custom_id = `${entityType}-${Date.now() + Math.floor(Math.random() * 1000).toFixed()}`;
            const newEntity = await new entityModel({...postBody, _id: custom_id});
            await newEntity.save();
            return {error: false, data: newEntity}
        } catch (err) {
            return {error: true, message: err.message}
        }
    }


//     get all resource

    async collectionMethod(entityType, schemaName, skip, limit, populatedFields = {}, filters = {}, sort = {}, fields = {}) {
        try {
            const entityModel = mongoose.model(entityType, entityType[schemaName]);
            let query = {};
            if (Object.keys(fields).length) {
                query = entityModel.find(filters, {fields: fields});
            } else {
                query = entityModel.find(filters);
            }

            if (populatedFields) {
                for (let field in populatedFields) {
                    try {
                        query.populate(field, populatedFields[field]);
                    } catch (err) {
                        console.log('Error in populating fields', field, err);
                    }
                }
            }
            if (skip) {
                query.skip(parseInt(skip))
            }
            if (limit) {
                query.limit(parseInt(limit))
            }
            if (sort) {
                query.sort(sort)
            }

            const doc = await query.exec();
            return {error: false, data: doc}


        } catch (err) {
            return {error: true, message: err.message}
        }
    }


//     retrieve method
    async retrieveMethod(entityType, entityId, schemaName, populatedFields = {}, fields = {}) {
        try {
            const entityModel = mongoose.model(entityType, entityType[schemaName]);
            let query;
            // if (Object.keys(fields).length) {
            //     query = entityModel.find(fields)
            // } else {
                query = entityModel.find({'_id': entityId })
            // }
            if (populatedFields) {
                for (let field in populatedFields) {
                    query.populate(field, populatedFields[field]);
                }
            }
            const doc = await query.exec();
            const data = doc || {}
            return {error: false, data: data};
        } catch (err) {
            return {error: true, message: err.message}
        }
    }


//     update method
    async updateMethod(entityType, entityId, schemaName, postBody) {
        try {
            const entityModel = mongoose.model(entityType, entityType[schemaName]);
            let doc = await entityModel.findOneAndUpdate({_id: entityId}, postBody, {new: true}).exec();
            return {error: false, data: doc}

        } catch (error) {
       return {error: true, message: error.message}
        }
    }

//     delete method
    async deleteMethod(entityType, entityId, schemaName,) {
        try{
            const entityModel = mongoose.model(entityType, entityType[schemaName]);
            let doc = await entityModel.findOneAndDelete({_id: entityId}).exec();
            return {error: false, data: `deleted ${doc._id}`};
        }catch (err) {
            return {error: true, message: err.message}
        }
    }

}



export default MongooseOperations

