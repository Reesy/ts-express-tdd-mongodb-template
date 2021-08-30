/**
 * Tests for the API v1 user endpoints.
 */

//read test env

import { agent as request } from "supertest"; 
import { expect } from 'chai';
import { describe, it, after } from 'mocha';
import { config } from "../config";

config.dbname = 'TEST_DB';
config.dbcollection = 'notUsers';

import { app, mongoClient } from "../app";


 const api = "/api/v1/users"; 
 
 const insertApi = "/api/v1/user";

 describe(`When I call ${api}`, () => 
 { 
    
   describe("And I send a valid request", () =>
   {

    describe("And the database has no users", () => 
    {
        
        it("Should return a 200", async () =>
        {
            const response = await request(app)
                .get(api)
                .set('Accept', 'application/json');
            expect(response.status).to.eql(200);
          
        });

        it("Should return an empty array", async () =>
        {   
            const response = await request(app)
                .get(api)
                .set('Accept', 'application/json');
            expect(response.body).to.eql([]);
        });
    });
     
    describe("And the database has 1 user", () =>
    {

        let requestBody = 
        {
            "name": "Test",
            "email": "test@aol.com"   
        };
 
        it("Should return an array with 1 user", async () =>
        {
            
            const insertionResponse = await request(app)
                .post(insertApi)
                .send(requestBody)
                .set('Accept', 'application/json');
          
            expect(insertionResponse.status).to.eql(200);
            
            const response = await request(app)
                .get(api)
                .set('Accept', 'application/json');

            let expectedData = [{
                "name": "Test",
                "email": "test@aol.com"
            }]

            expect(response.status).to.eql(200);
            expect(response.body).to.eql(expectedData);
        });

    });
 
 });
});

 //write an afterall hook to close the database connection
after(async () => 
{
    //I want to drop the database after all the tests are done
    await mongoClient.db(config.dbname).dropDatabase();
    await mongoClient.close();
});