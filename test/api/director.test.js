const chai = require('chai');
const chihttp = require('chai-http');
const should = chai.should();
const server = require('../../app.js');

let token,directorId;

chai.use(chihttp);

describe('/api/director Tests',()=>{

    before('',(done)=>{
        chai.request(server)
        .post('/authenticate')
        .send({username:'sedat1',password:'sedat1sedat'})
        .end((err,res)=>{
            token=res.body.token;
            console.log(token);
            done();
        });
    });

    describe('/Post Tests',()=>{
        it('it should post a director',(done)=>{

            const director =
            {
                name:'sedattestdenemesi1',
                surname:'kocaer',
                bio:'deneme bio 1'
            }
            chai.request(server)
            .post('/api/directors/new')
            .send(director)
            .set('x-access-token',token)
            .end((err,res)=>{

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(director.name);
                res.body.should.have.property('surname').eql(director.surname);
                res.body.should.have.property('bio').eql(director.bio);
                directorId=res.body._id;
                done();
            });
        });
    });



    describe('/Get Tests with director_id',()=>{
        it('it should get a director with director_id',(done)=>{

            chai.request(server)
            .get('/api/directors/'+directorId)
            .set('x-access-token',token)
            .end((err,res)=>{

                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.should.have.property('_id').eql(directorId);
                done();
            });
        });
    });


    describe('/Get Tests with director_id',()=>{
        it('it should get a director and director films with director_id',(done)=>{

            chai.request(server)
            .get('/api/directors/directorandfilms/'+directorId)
            .set('x-access-token',token)
            .end((err,res)=>{

                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.should.have.property('_id').eql(directorId);
                done();
            });
        });
    });


    describe('/Put Tests with director_id',()=>{
        it('it should put director with director_id',(done)=>{

            const updatedirector =
            {
                name :'sedat deneme 1 update',
                surname:'kocaer',
                bio:'sedat deneme 1 update edildi.'

            }

            chai.request(server)
            .put('/api/directors/'+directorId)
            .send(updatedirector)
            .set('x-access-token',token)
            .end((err,res)=>{

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(updatedirector.name);
                res.body.should.have.property('surname').eql(updatedirector.surname);
                res.body.should.have.property('bio').eql(updatedirector.bio);
                res.body.should.have.property('_id').eql(directorId)
                directorId=res.body._id;
                done();
            });
        });
    });


    describe('/Delete Tests with director_id',()=>{
        it('it should delete director with director_id',(done)=>{

            chai.request(server)
            .delete('/api/directors/'+directorId)
            .set('x-access-token',token)
            .end((err,res)=>{

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                done();
            });
        });
    });

});