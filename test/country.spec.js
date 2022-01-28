
let countryData =  require('../data')

const Country = require('../models/country')

describe('Country Model tests', () => {

    const testCountry = {
        name: 'France',
        city: 'Paris',
    }

    const editTest = {
        id: 2,
        name: 'Nigeria',
        city: 'Lagos',
    }

    it( 'should make an instance of a country', () => {
        const country = new Country({id:4, ...testCountry});

        expect(country.id).toBe(4)
        expect(country.name).toBe('France')
        expect(country.city).toBe('Paris')

    });

    test('it should return all countries', () => {

        const countries =  Country.all;
        expect(countries).toEqual(countryData)
    });

    it('should return a country', () => {
        const country = Country.findById(2);
        expect(country).toEqual(countryData[1])
    });

    test('should throw error if country is not in the data base', () => {
       const err = () => {
           Country.findById(66)
       }
        expect(err).toThrowError('That country does not exist!')
    });

    it('should create a new Country', () => {
        const newCountryId = countryData.length +1
        const newCountry = Country.create(testCountry)

        expect(newCountry).toEqual({id:newCountryId, ...testCountry})
    });

    it('should delete a country', () => {
        const countryToDeleteId = countryData.length;
        const countryToDelete = countryData[countryToDeleteId - 1];
        countryToDelete.deleteCountry();

        expect(countryToDelete).toEqual({ id: countryToDeleteId, ...testCountry });
        expect(countryData).not.toContain(countryToDelete);
    });

    it('should edit a current country', () => {
        const id = editTest.id
        Country.editCountry(id,editTest);
        const allCountries = Country.all
        expect(allCountries).not.toContain({id:2, name: 'Wales', city: 'Cardiff'})
    })

})
