`use strict`

const express = require('express');
const slugify = require('slugify');
const router = express.Router();
const { ceos } = require('../models');

router.get('/:slug?', async(req, res) => {
    if (!!req.params.slug) {
        const { slug } = req.params;
        const theCEO = await ceos.findOne({ where: { slug } });

        res.json(theCEO).status(200);
    } else {
        const ExecutiveData = await ceos.findAll();
        console.log(ExecutiveData);
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

    const response = await ceos.create({
        name: ceo_name,
        slug: slug,
        first_year_active: ceo_year
    });
    console.log("Response on new: ", response);
    res.redirect('/');
});

router.post('/delete', async(req, res) => {
    const { id, ceo_name, slug, ceo_year } = req.body;


    const response = await ceos.destroy({
        where: { id },
    });

    console.log("DELETE ROUTE RESPONSE IS: ", response);
    res.redirect('/');
});

module.exports = router;