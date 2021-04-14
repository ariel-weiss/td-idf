const IDF_OPTIONS = {
    NORMAL: 1,
    PROBABILISTIC: 2,
}

class IDF {

    constructor(n_documents, relevant_documents) {
        if (relevant_documents === 0)
            throw new Error("word appearances number can't be 0.");
        this.n_documents = n_documents;
        this.relevant_documents = relevant_documents;
    }

    calcInverseDocumentFrequency() {
        throw new Error('This method must be implemented');
    }
}

class NormalIDF extends IDF{

    constructor(n_documents, relevant_documents) {
        super(n_documents, relevant_documents);
    }
    
    calcInverseDocumentFrequency() {
        let frequency = this.n_documents / this.relevant_documents;
        return Math.log10(frequency);
    }
}

class ProbabilisticIDF extends IDF{

    constructor(n_documents, relevant_documents) {
        super(n_documents, relevant_documents);
    }
    
    calcInverseDocumentFrequency() {
        let frequency = (this.n_documents - this.relevant_documents) / this.relevant_documents;
        return Math.log10(frequency);
    }
}

function initiateIDF(idf_option, n_documents, relevant_documents) {
    switch (idf_option) {
        case IDF_OPTIONS.PROBABILISTIC:
            return new ProbabilisticIDF(n_documents, relevant_documents);
        case IDF_OPTIONS.NORMAL:
        default:
            return new NormalIDF(n_documents, relevant_documents);
    }
}

module.exports = { initiateIDF};