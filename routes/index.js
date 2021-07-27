`use strict`

const express = require('express');
const { default: slugify } = require('slugify');
const router = express.Router();
const ExecutiveModel = require('../models/ExecutiveModel');

router.get('/:slug?', async(req, res) => {
    if (!!req.params.slug) {
        const { slug } = req.params;
        const theCEO = await ExecutiveModel.getBySlug(slug);

        res.json(theCeo).status(200);
        
    } else {
        const ExecutiveData = await ExecutiveModel.getAll();

        res.json(ExecutiveData).status(200);
        
    }

});

router.post(`/`, async(req, res) => {
    const { ceo_name, ceo_year } = req.body;

    const slug = slugify(ceo_name, {
        replacement: '_',
        lower: true,
        strict: true
    });

    const newExecutive = new ExecutiveModel(null, ceo_name, slug, ceo_year);

    const response = await newExecutive.addEntry();
    res.sendStatus(200);
});

router.post('/delete', async(req, res) => {
    const { id, ceo_name, slug, ceo_year } = req.body;

    const executiveToDelete = new ExecutiveModel(id, ceo_name, slug, ceo_year);
    const response = await executiveToDelete.deleteEntry();
    console.log("DELETE ROUTE RESPONSE IS: ", response);
    res.sendStatus(200);
})

module.exports = router;