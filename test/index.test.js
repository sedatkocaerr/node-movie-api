const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaihttp);
// describe : test açıklaması
// it : her describe içinde birden fazla it olabilir o unit test ismi
// done test bitirme
describe('node server ',()=>{
    it('(Get/) anasayfayı döndürür',(done)=>{
        chai.request(server)
        .get('/')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        });
    });
});