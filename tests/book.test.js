const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /books', () => {
        it('creates a new book in the database', async () => {
            const response = await request(app).post('/books').send({
                title: 'The Shepherds Crown',
                author: 'Terry Pratchett',
                genre: 'Fantasy, Comedy',
                isbn: '9780857534828'
            });
                const newBookRecord = await Book.findByPk(response.body.id, {
                raw: true,
            });
            console.log(newBookRecord);

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('The Shepherds Crown');
                expect(newBookRecord.title).to.equal('The Shepherds Crown');
                expect(newBookRecord.author).to.equal('Terry Pratchett');
                expect(newBookRecord.genre).to.equal('Fantasy, Comedy');
                expect(newBookRecord.isbn).to.equal('9780857534828');
            });
        });
    });

    describe('with records in the database', async () => {

        let books;

        beforeEach(async () => {
            books = await Promise.all([
                Book.create({ title: 'The Diamond Age', author: 'Neal Stephenson', genre: 'Science Fiction', isbn: '9780553096095' }),
                Book.create({ title: 'Quarantine', author: 'Greg Egan', genre: 'science Fiction', isbn: '9781597805384' }),
                Book.create({ title: 'Sisyphean', author: 'Dempow Torishima', genre: 'Science Fiction', isbn: '9781421580821' }),
            ]);
        })

        describe('GET /books', () => {
            it('gets all book records', async () => {
                const response = await request(app).get('/books');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((book) => {
                    const expected = books.find((a) => a.id === book.id);

                    expect(book.title).to.equal(expected.title);
                    expect(book.author).to.equal(expected.author);
                    expect(book.genre).to.equal(expected.genre);
                    expect(book.isbn).to.equal(expected.isbn);
                });
            });
        });

        describe('GET /books/:id', () => {
            it('gets book record by id', async () => {
                const book = books[0];
                const response = await request(app).get(`/books/${book.id}`);

                expect(response.body.title).to.equal(book.title);
                expect(response.body.author).to.equal(book.author);
                expect(response.body.genre).to.equal(book.genre);
                expect(response.body.isbn).to.equal(book.isbn);
            });

            it('returns a 404 if the book does not exist', async () => {
                const response = await request(app).get('/books/12345');

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });


        describe('PATCH /books/:id', () => {
            it('updates book isbn by id', async () => {
                const book = books[0];
                const response = await request(app)
                .patch(`/books/${book.id}`)
                .send({ isbn: '9780553573312' });
                const updatedBookRecord = await Book.findByPk(book.id, {
                    raw: true,
                });

                expect(response.status).to.equal(200);
                expect(updatedBookRecord.isbn).to.equal('9780553573312');
            });

            it('returns a 404 if the book does not exist', async () => {
                const response = await request(app)
                .patch('/books/12345')
                .send({ isbn: '9780517704905' });

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });


        describe('DELETE /books/:id', () => {
            it('deletes book record by id', async () => {
                const book = books[0];
                const response = await request(app).delete(`/books/${book.id}`);
                const deletedBook = await Book.findByPk(book.id, { raw: true });

                expect(response.status).to.equal(204);
                expect(deletedBook).to.equal(null);
            });

            it('returns a 404 if the book does not exist', async () => {
                const response = await request(app).delete('/books/12345');
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });
    });
});