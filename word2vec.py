import nltk

from nltk.corpus import brown
from gensim.models import Word2Vec

data = brown.sents()

w2v_model = Word2Vec(
    min_count=5,
    window=5,
    sg=0,
    vector_size=300,
    sample=6e-5,
    negative=20
)


w2v_model.build_vocab(data)
w2v_model.train(data, total_examples=w2v_model.corpus_count, epochs=15)



print(w2v_model.wv.most_similar('university', topn=5))
w2v_model.wv.most_similar('universitas', topn=5)