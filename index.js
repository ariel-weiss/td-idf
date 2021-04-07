const { initiateIDF } = require('./utils/idf');
const { initiateTF } = require('./utils/tf');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Hello'});
})

app.post('/', (req, res) => {
    const body = req.body;
    const { word_count, n_words, n_documents, relevant_documents } = body.data;
    const { tf_option, idf_option } = body.options;
    try {
        const tf_obj = initiateTF(tf_option, n_words, word_count);
        const idf_obj = initiateIDF(idf_option, n_documents, relevant_documents);
        const tf = tf_obj.calcTermFrequency();
        const idf = idf_obj.calcInverseDocumentFrequency();
        const tf_idf = tf * idf;
        res.json({result: tf_idf});
    } catch (e) {
        res.json({ error: e.message });
    }
    
})

const PORT = 3000;
app.listen(PORT)

module.exports = { app };