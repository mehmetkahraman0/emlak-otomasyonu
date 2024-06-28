import Estate from "../models/estate.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createEstate = asyncHandler(async (req, res) => {
    try {
        const newEstate = new Estate(req.body);
        const savedEstate = await newEstate.save();
        res.json(savedEstate)
    } catch (error) {
        console.error(error)
        res.status(500).send("estate olusturulamadı")
    }

})

const getAllEstate = asyncHandler(async (req, res) => {
    try {
        const allEstate = await Estate.find({});
        res.json(allEstate);
    } catch (error) {
        console.log(error.message);
        res.send("Estate alınamadı.")
    }
})

const updateEstate = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const updateEstate = await Estate.findByIdAndUpdate(id, req.body, { new: true })
        //new: true olarak ayarlandığında, güncelleme işleminden sonraki yeni belge döndürülür.
        if (!updateEstate) {
            return res.status(404).send("estate bulunamadı.")
        }
        res.json(updateEstate);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("estate update işleminde hata.");
    }
})

const deleteEstate = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const estate = await Estate.findByIdAndDelete(id);
        if (!estate) {
            return res.status(404).send("estate bulunamadı.");
        }
        res.send("estate başarılı bir şekilde silindi.")
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }

})

export { createEstate, getAllEstate, updateEstate, deleteEstate };

