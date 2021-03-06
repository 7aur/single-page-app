const subsSchema = require('../../model/subscribe')
module.exports = {
    subscribe: async () => {
        try {
            const subs = await subsSchema.find()
            return subs.map(subscribe => {
                return {
                    ...subscribe._doc
                }
            })
        } catch (err) {
            throw err;
        }
    },
    deleteSubs: async (args, res) => {
        if(res.isAuth) {
            throw new Error("failed")
        }

        try {
            const ID = await args._id;
            const deleteSubs = await subsSchema.findByIdAndDelete(ID);
            return deleteSubs;
        } catch (err) {
            console.log(err)
        }
    },
    addSubs: async (args, res) => {
        try {
            const subs = await new subsSchema({
                name: args.inputSubs.name,
                email: args.inputSubs.email,
                subject: args.inputSubs.subject,
                text: args.inputSubs.text
            })
            const subsSave = await subs.save()
            return {
                ...subsSave._doc
            }
        } catch (err) {
            throw err;
        }
    }
}