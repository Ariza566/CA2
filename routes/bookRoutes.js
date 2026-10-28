
const express = require("express");
const router = express.Router();
const Book = require("../models/book.js");

router.post("/",async (req, res)=>{
    try {
        const {title,author,category} = req.body;
        if (!title){
            return res.status(400).send("Title is required");
        }

        const book = new Book({
            title: title,
            author: author,
            category: category
        });

        await book.save();
        res.status(201).send(book);
    }catch (err){
        res.status(500).send("Error adding book");
    }
});

router.get("/",async(req, res)=>{
    try {
        const page = parseInt(req.query.page,10) || 1;
        const limit = parseInt(req.query.limit,10) || 5;
        const skip = (page-1)*limit;
        const books = await Book.find()
            .skip(skip)
            .limit(limit);
        const total = await Book.countDocuments();

        res.send({
            page: page,
            total: total,
            books: books
        });
    } catch(err) {
        res.status(500).send("Error fetching books");
    }
});


router.patch("/:id",async(req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { available: req.body.available },
            { new: true }
        );
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.send(book);
    } catch (err) {
        res.status(500).send("Error updating book");
    }
});

module.exports = router;
