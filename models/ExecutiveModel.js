`use strict`;

const db = require('./conn');

class ExecutiveModel {
    constructor(id, name, slug, year) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.year = year;
    }

    static async getAll() {
        try {
            const response = await db.any(`SELECT * FROM ceos;`)
            return response;
        } catch (error) {
            console.log('Error: ', error);
            return error;
        }
    }

    static async getBySlug(slug) {
        try {
            const response = await db.one(
                `SELECT * FROM ceos WHERE slug = '${slug}';`
            );
            console.log("RESPONSE FROM GET BY SLUG: ", response);
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }


    async addEntry() {
        console.log("NAME AND SLUG??", this.name, this.slug)
        try {
            const response = await db.result(
                `INSERT INTO ceos 
                    (name, slug, first_year_active)
                VALUES
                    ('${this.name}', '${this.slug}', ${this.year})`
            );
            console.log("DB RESULT RESPONSE: ", response);
            return response;
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }

    async deleteEntry() {
        try {
            const response = await db.result(
                `DELETE FROM ceos WHERE id = $1;`, [this.id]
            );
            console.log("DELETE ENTRY RESPONSE: ", response);
            return response;
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }
};

module.exports = ExecutiveModel;