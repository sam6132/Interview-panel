var assert = require('assert');
const expect = require("chai").expect;
const axios = require('axios')
const URI = 'http://localhost:5000/api/user';
const chai = require('chai')
let should = chai.should();
const { users } = require('../models/user.model');

describe('Auth module', () => {
    it(' login with emailId and password', (done) => {
        let user = {
            email: 'sam613263@gmail.com',
            password: "Josh@12345"
        }
        axios
            .post(`${URI}/login`, user).then(res => {
                let data = res.data;
                assert.equal(data.user.email, 'sam613263@gmail.com')
            })
        done()
    });

    it(' get all admins', (done) => {
        axios
            .get(`${URI}/`).then(res => {
                let data = res.data;
                data.should.be.a('array')

            })
        done()
    })


    it(' Create a account with mail_id password and role', (done) => {
        let user = {
            email: 'sylendra@blockchainappfactory.com',
            password: '12345678',
            role: 'Team lead'
        }

        axios.post(`${URI}/register`, user).then(res => {

            let data = res.data;
            expect(res.status).equal(200)
            expect(data.success).to.be.an('boolean')
            // should(data.user).have.property('_id')
        })
        done();
    })

});