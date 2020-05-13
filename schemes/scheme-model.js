const db = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove,
}

function find() {
    return db("schemes");
};

function findById(id) {
    return db("schemes")
        .where({ id })
        .first();
};

function findSteps(id) {
    return db("schemes")
        .join("steps", "schemes.id", "=", "steps.scheme_id")
        .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
        .orderBy("steps.step_number")
        .where("steps.scheme_id", id)
};

function add(scheme) {
    return db("schemes")
        .insert(scheme, "id")
        .then(ids => {
            return findById(ids[0]);
        });
};
function addStep(stepData, scheme_id) {
    return db("steps")
        .insert(stepData, "id")
        .then(res => {
            console.log(res)
        });
};

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)
        .then(res => {
            return findById(id);
        });
};

function remove(id) {
    return findById(id)
        .then(resp => {
            // console.log({ resp })
            const delObj = resp;
            return db("schemes")
                .where({ id })
                .del()
                .then(res => {
                    return delObj;
                });
        })
};