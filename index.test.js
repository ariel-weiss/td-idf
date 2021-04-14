const request = require('supertest');
const {app} = require('./index');

test('test1: bad input', async () => {
    const body = {
        "data": {
            "word_count": 4,
            "n_words": 0,
            "n_documents": 1000000000,
            "relevant_documents": 1000
        },
        "options": {
            "tf_option": 1,
            "idf_option": 1
        }
    }
    const response = { "error": "total words number can't be 0." };
    const res = await request(app).post('/').send(body)
    
    expect(res.body).toEqual(response);
});

test('test2: low frequency, idf: normal, tf: normal', async () => {
    const body = {
        "data": {
            "word_count": 4,
            "n_words": 200,
            "n_documents": 1000000000,
            "relevant_documents": 1000
        },
        "options": {
            "tf_option": 1,
            "idf_option": 1
        }
    }
    const response = { "result": 0.12 };
    const res = await request(app).post('/').send(body)
    
    expect(res.body).toEqual(response);
});

test('test3: mid frequency, idf: normal, tf: normal', async () => {
    const body = {
        "data": {
            "word_count": 4,
            "n_words": 200,
            "n_documents": 1000000000,
            "relevant_documents": 10000000
        },
        "options": {
            "tf_option": 1,
            "idf_option": 1
        }
    }
    const response = { "result": 0.04 };
    const res = await request(app).post('/').send(body)
    
    expect(res.body).toEqual(response);
});

test('test4: mid frequency , idf: probabilistic, tf: normal', async () => {
    const body = {
        "data": {
            "word_count": 4,
            "n_words": 200,
            "n_documents": 1000000000,
            "relevant_documents": 10000000
        },
        "options": {
            "tf_option": 1,
            "idf_option": 2
        }
    }
    const response = { "result": 0.039912703891951 };
    const res = await request(app).post('/').send(body)
    
    expect(res.body).toEqual(response);
});

test('test5: mid frequency , idf: probabilistic, tf: log', async () => {
    const body = {
        "data": {
            "word_count": 4,
            "n_words": 200,
            "n_documents": 1000000000,
            "relevant_documents": 10000000
        },
        "options": {
            "tf_option": 2,
            "idf_option": 2
        }
    }
    const response = { "result": 1.3948891406209614 };
    const res = await request(app).post('/').send(body)
    
    expect(res.body).toEqual(response);
});