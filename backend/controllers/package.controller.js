import Package from "../models/package.model.js";

const createPackage = async (req, res) => {
    try {
        const { title, description, price, dates, image } = req.body

        if (!title || !description || !price || !dates || !image) return res.status(400).json("Please enter all the fields")

        const existingPackage = await Package.findOne({ title })

        if (existingPackage) return res.status(400).json("This package is already exist.")

        const newPackage = await Package.create({
            title,
            description,
            price,
            dates,
            image
        })

        return res.status(200).json(newPackage)

    } catch (error) {
        console.error("Error while creating package", error);
        return res.status(500).json("Internal server error")
    }
}

const updatePackage = async(req, res) => {
    try {
        const { id } = req.params
        const { title, description, price, dates, image } = req.body

        const packageToUpdate = await Package.findById(id)

        if (!packageToUpdate) {
            return res.status(404).json("Package not found")
        }

        if(title) packageToUpdate.title = title
        if(description) packageToUpdate.description = description
        if(price) packageToUpdate.price = price
        if(dates) packageToUpdate.dates = dates
        if(image) packageToUpdate.image = image

        const updatedPackage = await packageToUpdate.save()

        return res.status(200).json(updatedPackage)
    } catch (error) {
        console.error("Error while updating package", error);
        return res.status(500).json("Internal server error")
    }
}

export {
    createPackage,
    updatePackage
}