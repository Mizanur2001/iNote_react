const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//router 1: add a new notes using poast /api/notes/addnotes login require
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        //checking validation for title and description
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //added notes into database 
        const notes = new Notes({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })
        const saveNotes = await notes.save();
        res.json(saveNotes);
    } catch (error) {
        res.status(500).send('Internal Server error');
    }
});


//Route 2 : fetchall notes form database useing api/notes/fetchnotes login require
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
});


//Route 3: Updateind notes using api/notes/updatenotes login require
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        let newNotes = {};
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };

        //find the notes to be updated and update it
        let notes = await Notes.findById(req.params.id);

        //checking user is valid or not 
        if (!notes) { return res.status(404).send('Not Found'); }
        if (notes.user.toString() !== req.user.id) { return res.status(401).send('Not Allowed'); }

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json(notes);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
});


// Router 4: Delete a notes using api/notes/deletenotes loging require
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    let notes = await Notes.findById(req.params.id);

    //checking note id is valid or not
    if (!notes) { return res.status(404).send('Not found') }

    //Chacking the user valid or not to delete notes
    if (notes.user.toString() !== req.user.id) { return res.status(401).send('Not Allowed') }

    //deleteing the notes
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ "Success": "Deleted Note Successfully", notes: notes })
})
module.exports = router;