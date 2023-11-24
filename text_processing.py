from nltk import regexp_tokenize
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from datasets import stop_word_list_datasets
from merge_word import merge_some_word_in_list
from merge_word import omit_merge_word
from merge_word import merge_all_word_to_one_list


# Case Folding
# input_keluhan = input("Masukkan Keluhan : ").lower()

# Saya merasa demam tinggi, lemas, mual, sakit kepala dan muncul bintik merah dikulit. saya sakit apa ya?.

def textProcessing(input_keluhan):
    # Tokenizing
    regex_word = regexp_tokenize(input_keluhan, "[A-z]+")

    # Filtering -> StopWord
    stop_word = StopWordRemoverFactory().get_stop_words() + stop_word_list_datasets

    # Stemming
    stemmer = StemmerFactory().create_stemmer()

    # cek apakah input keluhan ada kata tambahan yang tidak diperlukan
    new_word = []
    for word in regex_word:
        if word not in stop_word:
            new_word.append(word)

    # Mengubah list new_word ke string agar bisa dimasukkan ke proses stemming
    list_to_string = ' '.join(new_word)

    # proses stemming tiap kata
    stemming_word = stemmer.stem(list_to_string)
    # print(stemming_word)

    string_to_list = stemming_word.split(" ")
    # print(string_to_list)

    # gabungin dua kata
    merge_word = merge_some_word_in_list(string_to_list)
    omit_word = omit_merge_word(string_to_list)
    merged_all_word = merge_all_word_to_one_list(omit_word, merge_word)
    print("omit word", omit_word)
    print("merge word", merge_word)
    print("All word", merged_all_word)

    return merged_all_word



