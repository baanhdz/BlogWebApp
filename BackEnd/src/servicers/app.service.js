exports.generateCrudMethods = Model =>{
    return{
        findAll: () => Model.find(),
        findById: id  => Model.findById(id),
        findByUsername: username => Model.findOne( username ),
        create: record  => Model.create(record),
        update:(id,record) => Model.findByIdAndUpdate(id,record,{new:true}),
        delete: id => Model.findByIdAndDelete(id)
    }
}