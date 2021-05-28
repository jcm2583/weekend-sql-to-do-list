// const { builtinModules } = require('module');
const pg = require('pg');

const config = {
    database: 'to_do_list_tasks',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});









module.exports = pool;

