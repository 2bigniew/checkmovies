const importTest = (name, path) => {
    describe(name, () => {
        require(path);
    });
}

describe('Start', (req, res, next) => {

    const allTests = [
        { name: 'Movies Router', path: './movies.js' },
        { name: 'Comment Router', path: './comments.js' }, 
        { name: 'Delete Dummy Data', path: './deleteDummyData.js' }
    ];

    before((done) => {
        console.log('Start testing app...')
        done();
    });

    allTests.forEach( (test) => { 
        importTest(test.name, test.path);
    });

    after((done) => {
        console.log('End of app test');
        done();
    });

});
