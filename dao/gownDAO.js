import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let gown

export default class gownDAO {
    static async injectDB(conn) {
        if (gown) return
        try { gown = await conn.db('Main').collection("Gowns"); }
        catch (e) { console.error(`Unable to establish a collection: ${e}`); }
    }

    static async getGown({
        filters = null,
        page = 0,
        GownPerPage = 20,
        sort = null,
        kategori = null
    } = {}) {

        let filterArray = [];
        let sortBy = sort == "A2Z" ? { kode: 1 }
            : sort == "Z2A" ? { kode: -1 }
                : sort == "H2L" ? { harga: -1 }
                    : sort == "L2H" ? { harga: 1 }
                        : sort == "WRN" ? { warna: 1 }
                            : { favorit: -1 } //"FVR"

        if (kategori !== null) filterArray.push({ "kategori": { $eq: kategori } })

        if (filters) {
            if ("kode" in filters) filterArray.push({ kode: { $regex: `^${filters["kode"]}`, $options: 'i' } })

            if ("hargamin" in filters) filterArray.push({ harga: { $gte: parseInt(filters.hargamin) } })

            if ("hargamax" in filters) filterArray.push({ harga: { $lte: parseInt(filters.hargamax) } })

            if ("warna" in filters) {
                const arr = filters.warna.split(" ");
                for (var i = 0; i < arr.length; i++) { arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); }
                const str2 = arr.join(" ");
                const myArray = str2.split(",");
                filterArray.push({ "warna": { $in: myArray } });
            }
        }

        let query = (filterArray === undefined || filterArray.length == 0) ? undefined : { $and: filterArray }
        let cursor;

        try {
            cursor = await gown.find(query).sort(sortBy);
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { gownList: [], totalNumgown: 0 }
        }

        const displayCursor = cursor.limit(GownPerPage).skip(GownPerPage * page)

        try {
            const gownList = await displayCursor.toArray()
            const totalNumgown = await gown.countDocuments(query)
            const totalPages = totalNumgown / GownPerPage;

            return { gownList, totalNumgown, totalPages }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { gownList: [], totalNumgown: 0 }
        }
    }

    static async getGownByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                }
            ]
            const hasil = await gown.aggregate(pipeline).next()

            let cursor = await gown.find(
                {
                    $and:
                        [
                            { "warna": { $eq: hasil.warna } },
                            { "kode": { $ne: hasil.kode } }
                        ]
                }
            ).sort()
            const gownList = await cursor.toArray()

            return {
                hasil: hasil,
                recommend: gownList
            }
        } catch (e) {
            console.error(`Something went wrong in getgownByID: ${e}`)
            throw e;
        }
    }

    static async getKode(kodeInput) {
        try {
            let cursor = await gown.find(
                { "kode": { $eq: kodeInput } }
            ).sort()
            const gownFound = await cursor.toArray()

            let cursor2 = await gown.find(
                {
                    $and:
                        [
                            { "warna": { $eq: gownFound[0].warna } },
                            { "kode": { $ne: kodeInput } }
                        ]
                }
            ).sort()

            let recommended = await cursor2.toArray()
            recommended = recommended.splice(0, 4)

            return { gownFound, recommended }
        } catch (e) {
            console.error(`Something went wrong in getgownByID: ${e}`)
            throw e
        }
    }

    static async addGaun(kode, warna, harga, favorit, kategori, drive) {
        try {
            const reviewDoc = {
                kode: kode,
                warna: warna,
                harga: harga,
                favorit: favorit,
                kategori: kategori,
                drive: drive,
                _id: new ObjectId(),
            }

            return await gown.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to add: ${e}`)
            return { error: e }
        }
    }

    static async editGaun(kode, warna, harga, favorit, drive, inDatabase) {
        try {
            const filter = { kode: kode };
            const options = { upsert: true };
            const obj = { drive: drive };

            if (inDatabase[0].warna !== warna && warna !== "") obj.warna = warna;

            if (inDatabase[0].harga !== harga) obj.harga = harga;

            if (inDatabase[0].favorit !== favorit) obj.favorit = favorit;

            const updateDoc = { $set: obj };

            const result = await gown.updateOne(filter, updateDoc, options);
            console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
            return result
        } catch (e) {
            console.error(`Unable to edit: ${e}`);
            return { error: e }
        }
    }

    static async checkId(kode) {
        try {
            let cursor = await gown.find({ "kode": { $eq: kode } });
            let gownSearched = await cursor.toArray();
            return { gown: gownSearched }
        } catch (e) {
            console.error(`Unable to check ID: ${e}`)
            return { error: e }
        }
    }

    static async delete(Id) {
        try {
            await gown.deleteOne({ "_id": ObjectId(Id) });
        } catch (e) {
            console.error(`Unable to delete Data: ${e}`)
            return { error: e }
        }
    }

    static async getListWarna() {
        try {
            const list = await gown.distinct('warna');
            return list;
        } catch (e) {
            console.error(`Unable to get List Warna: ${e}`)
            return { error: e }
        }
    }
}