
var expect = require("chai").expect;
const axios = require('axios')
const URI = 'http://localhost:5000/api/user';
const chai = require('chai')
let should = chai.should();
const candidates = require('../models/candidate.model')
describe('candidate module', () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiXCI1Y2U1MzYzYjQ4Y2ZmMzYyNDg5ODIwMjNcIiIsImlhdCI6MTU1ODk2MDA2OCwiZXhwIjoxNTU4OTYzNjY4fQ.TmmLyNF2KzhTv1HkcuxewP1tRxrJ_i0M6Kg91g_B94Q";

    it(' create a candidate', async (done) => {
        let candidate = {
            name: 'sam joshuva ertyu',
            email: 'sam@123.com',
            number: 11234567
        };
        axios.post('http://localhost:5000/api/candidate/add', candidate, {
            headers: { 'x-auth': token }
        }).then(res => {

            res.data.should.be.a('object')

        })
        done();
    })


    // it('ghj', (done) => {
    //     let candidate = {
    //         name: 'sam joshuva ertyu',
    //         email: 'sam@12asdf3.com',
    //         number: 11234567
    //     };
    //     request(app).
    //         get(URI).end(done)
    // })

    it(' return all candidates', (done) => {
        axios.get('http://localhost:5000/api/candidate/', {
            headers: { 'x-auth': token }
        }).then(res => {
            expect(res.data).to.be.an('array')


        })
        done();
    })

    it(' add review detail to candidate', (done) => {
        let review = {
            title: 'ertyuiopl,mnvcde',
            comment: 'my comment'
        }
        axios.post('http://localhost:5000/api/candidate/update/5cebb82167b1e84892db9e63', review, {
            headers: { 'x-auth': token }
        }).then(res => {
            expect(res.data.success).to.be.an('boolean')


        })
        done();

    })










})