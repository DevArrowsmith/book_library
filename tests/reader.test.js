const { expect } = require('chai');
const request = require('supertest');
const { Reader } = require('../src/models');
const app = require('../src/app');


describe('/reader', () => {

    before(async () => Reader.sequelize.sync());

    beforeEach(async () => {
        await Reader.destroy({ where: {} });
    })

    describe('with no records in the database', () => {
        describe('POST /reader', () => {
            it('creates a new reader in the database', async () => {
                const response = await request(app).post('/reader').send({
                    name: 'Elisabeth Bennett',
                    email: 'future_ms_darcy@gmail.com',
                });
                
                expect(response.status).to.equal(201);
            });
        });
    });
});