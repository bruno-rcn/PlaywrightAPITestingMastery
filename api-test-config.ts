
const processENV = process.env.TEST_ENV
const env = processENV || 'dev'
console.log('Test env: ' + env)

// if not provide the env will be run with the values below as dev env
const config = {
    apiUrl: 'https://conduit-api.bondaracademy.com/api',
    userEmail: 'brunor@teste.com',
    userPassword: '12345678'
}

// if pass to QA env will run with this values below
if(env === 'qa'){
    config.userEmail = 'brunor@teste.com',
    config.userPassword = '12345678'
}

// if pass to Prod env will run with this values below
if(env === 'prod'){
    config.userEmail = 'brunor@teste.com',
    config.userPassword = '12345678'
}

// To run a different env
//  you can just change the name on the line 3. like [const env = processENV || 'qa'] or [const env = processENV || 'prod'] and pressthe play icon o from the tests

//  you can use terminal: TEST_ENV=[env you wanna] npx playwright test [file name]
// ex: [TEST_ENV=qa npx playwright test smokeTest.spec.ts] [TEST_ENV=prod npx playwright test example.spec.ts]

export {config}