const request = require('supertest');

// import server
const {app} = require('../server');

describe('Api server', () => {

    let api

    let testCountry = {
        name: 'France',
        city: 'Paris',
    };

    beforeAll(() => {
        // start the server and store it in the api variable
        api = app.listen(5500, () =>
            console.log('Test server running on port 5500')
        );
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('I hope you enjoyed your time, but it is time to close');
        api.close(done);
    });


    it('responds to get /country with status 200', (done) => {
        request(api).get('/country').expect(200, done);
    });

    it('responds to post /country with status 201', (done) => {
        request(api)
            .post('/country')
            .send(testCountry)
            .set('Accept', /application\/json/)
            .expect(201)
            .expect({ id: 4, ...testCountry}, done);
    });

    it('retrieves a country by id', (done) => {
        request(api)
            .get('/country/2')
            .expect(200)
            .expect({ id: 2, name: 'Wales', city: 'Cardiff' }, done);
    });

    it('responds to a unknown country id with a 404', (done) => {
        request(api).get('/country/42').expect(404).expect({}, done);
    });

    it('responds to delete /country/:id with status 204', async () => {
        await request(api).delete('/country/4').expect(204);

        const updatedCountry = await request(api).get('/country');

        expect(updatedCountry.body.length).toBe(3);
    });

    it('responds to non existing paths with 404', (done) => {
        request(api).get('/no').expect(404, done);
    });

    it('responds to invalid method request with 405', (done) => {
        request(api).post('/').expect(405, done);
    });

})
