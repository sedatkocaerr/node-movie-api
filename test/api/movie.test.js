const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaihttp);
// describe : test açıklaması
// it : her describe içinde birden fazla it olabilir o unit test ismi
// done : test bitirme
// before : testler başlamadan önce çalışacak method
// post : istek yapılan method ve urli
// send : gönderilen data
// end : yapılan isteğe dönülen değerler

let token,movieId;

describe('/api/movies Tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'sedat1', password: 'sedat1sedat' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET Movies', () => {
        it('it should GET all the movies.', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    });

    describe('/Post Movies', () => {
        it('it should post a movie.', (done) => {
            const movie = {
                title: "denemetest1",
                director_id: "5ec44bd940842d2ab01d19c5",
                category: "Komedi",
                year:1995,
                country: "türkiye",
                imbd_score: 8
            }
            chai.request(server)
                .post('/api/movies/new')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imbd_score');
                    movieId=res.body._id;
                    done();
                });

        });
    });


    describe('/Get Movies With :movie_id',()=>{

        it('it should get a movie.',(done)=>{
                chai.request(server)
                .get('/api/movies/'+movieId)
                .set('x-access-token', token)
                .end((err,res)=>{

                    res.should.have.status(200);
                    res.should.have.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imbd_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });



    describe('/Put Movies with movie_id', () => {
        it('it should put a movie given with by movie_id.', (done) => {

            const updatemovie = {
                title: "denemetest1",
                director_id: "5ec44bd940842d2ab01d19c5",
                category: "Cem yılmaz2",
                year:1995,
                country: "türkiye",
                imbd_score: 8
            }

            chai.request(server)
                .put('/api/movies/'+movieId)
                .send(updatemovie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(updatemovie.title);
                    res.body.should.have.property('director_id').eql(updatemovie.director_id);
                    res.body.should.have.property('category').eql(updatemovie.category);
                    res.body.should.have.property('country').eql(updatemovie.country);
                    res.body.should.have.property('year').eql(updatemovie.year);
                    res.body.should.have.property('imbd_score').eql(updatemovie.imbd_score);
                    movieId=res.body._id;
                    done();
                });

        });
    });

    describe('/Delete movie with movie_id',()=>{

        it('it should delete a movie with movie_id.',(done)=>{

                chai.request(server)
                .delete('/api/movies/'+movieId)
                .set('x-access-token', token)
                .end((err,res)=>{

                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });

        });

    });

});

