const path = require("path");
const fs = require("fs");
const scholarModel = require("../models/Scholar");
const { v4 } = require("uuid");
const { putObjectScholar} = require("../util/putObjectScholar");
const { deleteObjectScholar } = require("../util/deleteObjectScholar");

// 📌 Get all scholar
const getAllScholars = async (req, res) => {
    try {
        const response = await scholarModel.find();
        res.json({ scholars: response });
    } catch (error) {
        console.error("Error fetching scholars:", error);
        res.status(500).json({ error: "Failed to fetch scholars" });
    }
};

const addScholar = async (req, res) => {
    try {
        const { firstName, middleInitial, lastName, gpa, userLevel} = req.body;

        let image_url = req.file ? req.file.filename : null; // Use let here to allow reassignment

        // Check if an image is being uploaded
        if (req.files && req.files.image) {
            const file = req.files.image;
            const fileName = `scholars/${v4()}`;
            const { url,key } = await putObjectScholar(file.data, fileName);

            if (!url || !key) {
                return res.status(400).json({ message: "Image upload failed" });
            }

            // Reassign image_url with the URL from the image upload
            image_url = url,key;
        }

        const newScholar = new scholarModel({ firstName, middleInitial, lastName, gpa, userLevel, image_url });
        await newScholar.save();

        res.status(201).json({ message: "Scholar added successfully", newScholar });
    } catch (error) {
        console.error("Error adding scholar:", error);
        res.status(500).json({ error: "Failed to add scholar" });
    }
};

const editScholar = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, middleInitial, lastName, userlevel } = req.body;

        const existingScholar = await scholarModel.findById(id);
        if (!existingScholar) {
            return res.status(404).json({ error: "Scholar not found" });
        }

        let image_url = existingScholar.image_url;

        if (req.files && req.files.image) {
            const file = req.files.image;
            const fileName = `scholars/${v4()}`;
            const { url } = await putObjectScholar(file.data, fileName);

            if (!url) {
                return res.status(400).json({ message: "Image upload failed" });
            }

            // Derive key from previous URL
            if (image_url) {
                const filename = image_url.split("https://alalay-scholar.s3.ap-southeast-1.amazonaws.com//")[1];
                if (filename) await deleteObjectScholar(filename);
            }

            image_url = url;
        }

        const updatedScholar = await scholarModel.findByIdAndUpdate(
            id,
            { firstName, middleInitial, lastName, userlevel, image_url },
            { new: true }
        );

        res.status(200).json({ message: "Scholar updated successfully", updatedScholar });
    } catch (error) {
        console.error("Error updating scholar:", error);
        res.status(500).json({ error: "Failed to update scholar" });
    }
};

const deleteScholar = async (req, res) => {
    try {
        const { id } = req.params;

        const scholar = await scholarModel.findById(id);
        if (!scholar) {
            return res.status(404).json({ error: "Scholar not found" });
        }

        // Delete image from S3 if it exists
        if (scholar.image_url) {
            const key = scholar.image_url.split("https://alalay-scholar.s3.ap-southeast-1.amazonaws.com/")[1];
            if (key) await deleteObjectScholar(key);
        }

        await scholarModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Scholar deleted successfully" });
    } catch (error) {
        console.error("Error deleting scholar:", error);
        res.status(500).json({ error: "Failed to delete scholar" });
    }
};



module.exports = {
    getAllScholars,
    addScholar,
    editScholar,
    deleteScholar
};
