
let countryData = require('../data')

class Country{

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.city = data.city
    }

    static get all() {
        const countries = countryData.map((country) => {
            return new Country(country)
        })
        return countries
    }
    
    static findById(id) {
        try {
            const countryInfo = countryData.filter((country) => country.id === id)[0];
            const country = new Country(countryInfo);
            return country;
        } catch (err) {
            throw new Error('That country does not exist!');
        }
    }

    static create(country) {
        const newCountryId = countryData.length + 1;
        const newCountry = new Country({ id: newCountryId, ...country });
        countryData.push(newCountry);
        return newCountry;
    }

    static editCountry(id,countryEd) {
        try {
            let countryInfo = countryData.filter((country) => country.id === id)[0];
            countryInfo['name'] = countryEd.name
            countryInfo['city'] = countryEd.city
            const country = new Country(countryInfo);
            return country;
        } catch (err) {
            throw new Error('That country does not exist!');
        }
        
    }

    deleteCountry() {
        const country = countryData.filter((country) => country.id === this.id)[0];
        countryData.splice(countryData.indexOf(country),1)
        return "country has been deleted"
    }
}


module.exports = Country
