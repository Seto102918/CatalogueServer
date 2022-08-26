import gownDAO from "../dao/gownDAO.js"

export default class gownController {
    static async apiGetGown(req, res, next) {
        console.log(req.query)
        const gownPerPage = req.query.gownPerPage ? parseInt(req.query.gownPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        const sort = req.query.sort;
        const kategori = req.query.kategori;
        let filters = {};

        if (req.query.warna) filters.warna = req.query.warna;
        if (req.query.hargamin) filters.hargamin = req.query.hargamin;
        if (req.query.hargamax) filters.hargamax = req.query.hargamax;
        if (req.query.kode) filters.kode = req.query.kode;

        const { gownList, totalNumgown, totalPages } = await gownDAO.getGown({
            filters,
            page,
            gownPerPage,
            sort,
            kategori
        })

        const listWarna = await gownDAO.getListWarna();

        let response = {
            gownOrSuit: gownList,
            page: page,
            listWarna: listWarna,
            filters: filters,
            total_results: totalNumgown,
            totalPages: totalPages
        }

        res.status(200).json(response)
    }

    static async apiGetGownById(req, res, next) {
        try {
            if(req.params.id == "") return
            const gownData = await gownDAO.getGownByID(req.params.id)
            if (!gownData) return res.status(404).json({ error: "Not found" })
            res.json(gownData)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetGownKode(req, res, next) {
        try {
            let input = req.params.kode || {};
            let kode = await gownDAO.getKode(input);
            let id = kode._id.toString();
            res.redirect(`/v1/gown/id/${id}`);
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiAddGaun(req, res, drive) {
        try {
            const kode = req.body.kode;
            const warna = req.body.warna;
            const harga = parseInt(req.body.harga);
            const kategori = req.body.kategori;
            
            const favorit = req.body.favorit == "true" ? true : false

            const GaunResponse = await gownDAO.addGaun(
                kode,
                warna,
                harga,
                favorit,
                kategori,
                drive
            )

            res.json({ status: "success" , res : GaunResponse })
        } catch (e) { 
            res.json({ error: e.message }) 
        }
    }

    static async apiGetGownListColor(req, res) {
        const listWarna = await gownDAO.getListWarna();
        res.json(listWarna);
    }

    static async apiEditGaun(req, res, gownRef, drive) {
        try {
            const { body, files } = req;

            // Pisahin Add sm Change
            let addArray = [];
            let changeArray = [];
            files.forEach(el => {
                if(el.fieldname == 'add') {
                    addArray.push(el);
                } else changeArray.push(el);
            })
    
            // Check ID Input VS InDatabase
            let returned = await gownCtrl.apiCheckId(req, res)
            let drive = returned.gown[0].drive;
    
            // delete dari drive terus ganti sm yang baru
            for (let i = 0; i < changeArray.length; i++){
                const changeIndex = changeArray[i].fieldname[changeArray[i].fieldname.length-1];
                await deleteFromDrive(drive[changeIndex]); //delete
                const Id = await uploadFile(changeArray[i], body.kode, changeIndex); //upload
                drive[changeIndex] = Id;
            }
            for (let i = 0; i < addArray.length; i++) {
                const Id = await uploadFile(addArray[i], body.kode, i + drive.length);
                drive.push(Id);
            }

            const kode = req.body.kode;
            const warna = req.body.warna;
            const harga = parseInt(req.body.harga);
            const favorit = req.body.favorit == "true" ? true : false ;

            const GaunResponse = await gownDAO.editGaun(
                kode,
                warna,
                harga,
                favorit,
                drive,
                returned.gown
            );

            res.json({ status: "success" , res : GaunResponse });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiCheckId(req, res) {
        try {
            const Response = await gownDAO.checkId(req.body.kode);
            return Response
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDelete(req,res) {
        try {
            const Response = await gownDAO.delete(req.body.id);
            return Response
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}