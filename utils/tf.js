const TF_OPTIONS = {
    NORMAL: 1,
    LOG_NORMALIZATION: 2,
}

class TF {

    constructor(n_words, word_count) {
        if (n_words === 0)
            throw new Error("total words number can't be 0.");
        this.word_count = word_count;
        this.n_words = n_words;
    }

    calcTermFrequency() {
        throw new Error('This method must be implemented');
    }
}

class NormalTF extends TF{

    constructor(n_words, word_count) {
        super(n_words,word_count);
    }
    
    calcTermFrequency() {
        return this.word_count / this.n_words;
    }
}

class LogNormalizationTF extends TF{

    constructor(n_words, word_count) {
        super(n_words, word_count);
    }
    
    calcTermFrequency() {
        let frequency = this.word_count / this.n_words;
        return Math.log10(1 + frequency);
    }
}

function initiateTF(tf_option, n_words, word_count) {
    switch (tf_option) {
        case TF_OPTIONS.LOG_NORMALIZATION:
            return new LogNormalizationTF(n_words, word_count);
        case TF_OPTIONS.NORMAL:
        default:
            return new NormalTF(n_words, word_count);
    }
}

module.exports = { initiateTF };